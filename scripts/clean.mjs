#!/usr/bin/env node
/**
 * Keeps this clone light: `npm run clean`, and run on its own after a pull
 * request merges (the Claude Code hook in .claude/settings.json) and after
 * every `git pull` that merges (.githooks/post-merge).
 *
 * The same script is in nyuchi/toddle-enhancement-extension, nyuchi/learning
 * and nyuchi/nyuchi-licence-server; only GENERATED differs. It removes:
 *
 *  1. what the build, the tests and the tools generate (GENERATED below),
 *     and only where Git ignores it, so a tracked or new file is never
 *     touched;
 *  2. Claude Code worktrees (.claude/worktrees/) with nothing uncommitted;
 *     one with changes is left, and named;
 *  3. local branches that are done: everything on them is already in
 *     origin/main or origin/staging (merged, or squash-merged: merging the
 *     branch in would change nothing), or their remote branch was deleted
 *     after its pull request merged (GitHub deletes head branches on merge)
 *     while the local branch held nothing that had not been pushed. main, staging, the branch
 *     checked out and any branch in a worktree stay.
 *
 * --deep also removes node_modules and empties npm's cache (`npm ci` brings
 * both back). --dry-run lists what it would remove. --no-fetch skips
 * `git fetch --prune` (offline). --quiet prints the summary line only.
 * --hook is for Claude Code's PostToolUse hook: it reads the hook's JSON on
 * stdin and cleans the repository whose pull request was merged, when that
 * clone sits next to this one. It never fails: a hook or a pull must not
 * break on a cleanup.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/* this repository's generated paths, relative to its root */
const GENERATED = [
  "dist",
  ".astro",
  ".vercel/output",
  "qa-report.json",
  "node_modules/.cache",
  "node_modules/.vite",
  "node_modules/.astro",
];
const KEEP = new Set(["main", "staging"]);

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const dry = args.has("--dry-run");
const quiet = args.has("--quiet");
const say = (line) => {
  if (!quiet) console.log(`clean: ${line}`);
};

function git(...a) {
  return execFileSync("git", a, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    timeout: 60_000,
  }).trim();
}
function tryGit(...a) {
  try {
    return git(...a);
  } catch {
    return null;
  }
}
const lines = (s) => (s ? s.split("\n").filter(Boolean) : []);

/* --hook: clean the repository the merged pull request belongs to */
function fromHook() {
  let input = {};
  try {
    input = JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    /* no input: clean this clone */
  }
  const out = JSON.stringify(input.tool_response ?? "");
  if (!/merged\\?"\s*:\s*true/.test(out)) return; // not merged: nothing to do
  const repo = String(input.tool_input?.repo ?? "");
  const project = process.env.CLAUDE_PROJECT_DIR || root;
  const candidates = [
    project,
    join(project, repo),
    join(dirname(project), repo),
    join(dirname(root), repo),
  ];
  const target =
    candidates.find(
      (d) =>
        repo &&
        basename(d) === repo &&
        existsSync(join(d, "scripts", "clean.mjs")),
    ) ?? (repo ? null : root);
  if (!target) return; // that repository is not cloned here
  spawnSync(process.execPath, [join(target, "scripts", "clean.mjs")], {
    cwd: target,
    stdio: ["ignore", "inherit", "inherit"],
    timeout: 120_000,
  });
}

function sizeOf(path) {
  const r = spawnSync("du", ["-sk", path], { encoding: "utf8" });
  return r.status === 0 ? Number(r.stdout.split("\t")[0]) * 1024 : 0;
}
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(0)} MB`;

function clean() {
  if (tryGit("rev-parse", "--show-toplevel") === null)
    return say("not a Git clone; nothing to do");
  let freed = 0;
  const removed = [];
  const left = [];

  /* 1. generated paths, only where Git ignores them */
  const paths = [...GENERATED];
  if (args.has("--deep")) paths.push("node_modules");
  for (const rel of paths) {
    const abs = join(root, rel);
    if (!existsSync(abs)) continue;
    if (tryGit("check-ignore", "-q", rel) === null) {
      left.push(`${rel} (not ignored by Git)`);
      continue;
    }
    freed += sizeOf(abs);
    if (!dry) rmSync(abs, { recursive: true, force: true });
    removed.push(rel);
  }

  /* 2. Claude Code worktrees with nothing uncommitted */
  const inWorktree = new Set();
  const trees = lines(tryGit("worktree", "list", "--porcelain")).reduce(
    (all, l) => {
      if (l.startsWith("worktree ")) all.push({ path: l.slice(9) });
      else if (l.startsWith("branch ") && all.length)
        all[all.length - 1].branch = l.slice(7).replace("refs/heads/", "");
      return all;
    },
    [],
  );
  for (const t of trees) {
    const ours = t.path.includes(join(".claude", "worktrees"));
    if (!ours) {
      if (t.branch) inWorktree.add(t.branch);
      continue;
    }
    const dirty = spawnSync("git", ["status", "--porcelain"], {
      cwd: t.path,
      encoding: "utf8",
    });
    if (dirty.status !== 0 || dirty.stdout.trim()) {
      if (t.branch) inWorktree.add(t.branch);
      left.push(`${t.path} (uncommitted changes)`);
      continue;
    }
    freed += sizeOf(t.path);
    if (!dry) tryGit("worktree", "remove", t.path);
    removed.push(`worktree ${basename(t.path)}`);
  }
  if (!dry) tryGit("worktree", "prune");

  /* 3. local branches that are done */
  const before = new Map(
    lines(
      tryGit(
        "for-each-ref",
        "--format=%(refname:strip=3) %(objectname)",
        "refs/remotes/origin",
      ),
    ).map((l) => l.split(" ")),
  );
  if (!args.has("--no-fetch"))
    tryGit(
      "fetch",
      "--quiet",
      "--prune",
      "origin",
      "+refs/heads/*:refs/remotes/origin/*",
    );
  const after = new Set(
    lines(
      tryGit(
        "for-each-ref",
        "--format=%(refname:strip=3)",
        "refs/remotes/origin",
      ),
    ),
  );
  const current = tryGit("branch", "--show-current");
  const bases = ["origin/main", "origin/staging"].filter(
    (b) => tryGit("rev-parse", "--verify", "-q", b) !== null,
  );
  const isAncestor = (a, b) =>
    tryGit("merge-base", "--is-ancestor", a, b) !== null;
  /* nothing to bring in: merging the branch into the base changes nothing,
     which holds for a squash merge too */
  const alreadyIn = (a, b) => {
    const tree = tryGit("merge-tree", "--write-tree", b, a);
    return tree !== null && tree === tryGit("rev-parse", `${b}^{tree}`);
  };
  for (const l of lines(
    tryGit(
      "for-each-ref",
      "--format=%(refname:short) %(upstream:short) %(upstream:track)",
      "refs/heads",
    ),
  )) {
    const [branch, upstream = "", ...track] = l.split(" ");
    if (KEEP.has(branch) || branch === current || inWorktree.has(branch))
      continue;
    const remote = upstream.replace(/^origin\//, "");
    const pushedThenDeleted =
      upstream.startsWith("origin/") &&
      before.has(remote) &&
      !after.has(remote) &&
      isAncestor(branch, before.get(remote));
    const merged = bases.some(
      (b) => isAncestor(branch, b) || alreadyIn(branch, b),
    );
    if (pushedThenDeleted || merged) {
      if (!dry) tryGit("branch", "-D", branch);
      removed.push(`branch ${branch}`);
    } else if (track.join(" ").includes("gone")) {
      left.push(
        `branch ${branch} (its remote branch is gone; check it holds nothing unpushed)`,
      );
    }
  }

  if (args.has("--deep") && !dry) {
    spawnSync("npm", ["cache", "clean", "--force"], { stdio: "ignore" });
    removed.push("npm cache");
  }

  const verb = dry ? "would remove" : "removed";
  console.log(
    `clean (${basename(root)}): ${removed.length ? `${verb} ${removed.join(", ")}` : "nothing to remove"}${freed ? `, ${mb(freed)}` : ""}`,
  );
  for (const l of left) say(`left ${l}`);
}

try {
  if (args.has("--hook")) fromHook();
  else clean();
} catch (e) {
  console.log(`clean: stopped (${e?.message ?? e}); nothing else was changed`);
}
process.exit(0);
