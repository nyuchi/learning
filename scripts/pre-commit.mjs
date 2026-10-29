#!/usr/bin/env node
/**
 * The pre-commit hook (.githooks/pre-commit, turned on by `npm ci`):
 * the fast local copy of what CI and the org gates fail on, run before a
 * change enters Git.
 *
 *  1. both formatters, as the org gates run them, when a file they format
 *     is staged: `vp fmt --check` (the `vite-plus` gate) and Prettier with
 *     .prettierrc and .prettierignore (the lint gate);
 *  2. the lint (`vp lint --deny-warnings`, type-aware), when a script (or
 *     how scripts are linted) is staged, with any warning a failure;
 *  3. Semgrep on the staged files, when `semgrep` is installed, failing
 *     on findings on the lines the commit adds or changes; without it, or
 *     when it cannot run (offline, say), a one-line note.
 *
 * It reads the files as they are in the working tree, so a file staged in
 * part is checked as it is on disk; the hook names any such file. CI
 * checks the commit itself again. A few seconds in all; `npm run check`,
 * `npm test` (the build, the tests and the CSP check) stay in CI.
 *
 * The same hook as nyuchi/toddle-enhancement-extension's, with that repo's
 * static security tests swapped for this repo's two formatters.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const started = Date.now();

/* git's porcelain diff, without what a developer's own settings can add
   to it (colour, an external diff tool, text conversion) */
const PLAIN = ["--no-color", "--no-ext-diff", "--no-textconv"];
const gitFiles = (...args) =>
  execFileSync("git", [...args, ...PLAIN, "-z"], {
    cwd: root,
    encoding: "utf8",
  })
    .split("\0")
    .filter(Boolean);

/* What the commit changes, deletions included (they decide which checks
   run: deleting a module can break what imports it; --no-renames, so a
   file moved away counts as its old path too), and of that what is on
   disk to scan. NUL-separated, so that any file name is read whole. */
const changed = gitFiles("diff", "--cached", "--name-only", "--no-renames");
if (!changed.length) process.exit(0);
const staged = changed.filter((f) => existsSync(join(root, f)));

/* Staged files with more changes on disk: the checks read the disk copy. */
const unstaged = new Set(gitFiles("diff", "--name-only", "--no-renames"));
const partly = staged.filter((f) => unstaged.has(f));
if (partly.length)
  console.log(
    `pre-commit: checking the working-tree copy of ${partly.join(", ")}, which has changes that are not staged`,
  );

let failed = false;
/* quiet: the output only when it fails. Returns the exit status. */
function run(label, cmd, args, { quiet = false } = {}) {
  console.log(`pre-commit: ${label}`);
  const r = spawnSync(cmd, args, {
    cwd: root,
    stdio: quiet ? "pipe" : "inherit",
    encoding: "utf8",
  });
  const status = r.error ? -1 : r.status;
  if (status !== 0 && quiet)
    process.stderr.write(`${r.stdout || ""}${r.stderr || ""}`);
  return status;
}
function must(label, cmd, args, opts) {
  if (run(label, cmd, args, opts) !== 0) {
    failed = true;
    console.error(`pre-commit: ${label}: failed`);
  }
}

const vp = join(root, "node_modules", "vite-plus", "bin", "vp");
const prettier = join(root, "node_modules", "prettier", "bin", "prettier.cjs");
if (!existsSync(vp) || !existsSync(prettier)) {
  console.error(
    "pre-commit: Vite+ or Prettier is not installed. Run `npm ci` first.",
  );
  process.exit(1);
}

/* 1. both formatters, over the whole repository exactly as the gates run
   them (under a second each), when anything they format is staged, or how
   they format it. Vite+'s command and Prettier are Node scripts, run with
   this Node, so they work the same on every system. */
const FORMATTED =
  /(\.([cm]?[jt]sx?|css|json|jsonc|md|mdx)$|^\.prettier(rc|ignore)$|^vite\.config\.ts$)/;
if (changed.some((f) => FORMATTED.test(f))) {
  must("vp fmt --check", process.execPath, [vp, "fmt", "--check"], {
    quiet: true,
  });
  must(
    "prettier --check",
    process.execPath,
    [
      prettier,
      "--check",
      "**/*.{md,mdx,json,jsonc}",
      "src/**/*.{ts,js,css}",
      "tests/**/*.ts",
      "scripts/**/*.mjs",
      "*.mjs",
    ],
    { quiet: true },
  );
}

/* 2. the lint, when a script (or how scripts are linted) is staged. The
   whole repository, as `npm run lint` runs it: a second or two, and the
   same answer. Named files alone are linted with different type
   information, so the hook and a full run could disagree. */
const LINTED =
  /(\.([cm]?[jt]sx?|astro)$|^tsconfig\.json$|^package(-lock)?\.json$|^vite\.config\.ts$|^\.?oxlintrc)/;
if (changed.some((f) => LINTED.test(f)))
  must("lint", process.execPath, [vp, "lint", "--deny-warnings"]);

/* 3. Semgrep, when it is installed, on the staged files as they are on
   disk. A finding fails the commit only when it is on a line that is new
   on disk against HEAD (and, in a merge, against the branch coming in), so an old finding in a file the
   commit touches is CI's to report, not a reason to refuse this commit.
   Its JSON report decides; no clean report (not installed, no network for
   the rules, a crash, errors in the report) is not a verdict on the
   change, so it is noted and skipped. Semgrep gets no GIT_* variables from
   `git commit` (GIT_INDEX_FILE among them): nothing it runs can touch the
   index being committed. */
/* The lines of `file`, as it is on disk (what Semgrep reads), that are
   new against `rev`: from `git diff <rev>`, which compares the working
   tree, so the line numbers are Semgrep's own. null: every line is new
   (no such revision, as before a first commit). */
/* Staged renames, new path -> old path, so a moved file is compared with
   what it was, not counted as entirely new: moving a file must not turn its
   old findings into this commit's. */
const renamedFrom = new Map();
try {
  const out = execFileSync(
    "git",
    ["diff", ...PLAIN, "--cached", "-M", "--name-status", "-z"],
    { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  ).split("\0");
  let i = 0;
  while (i < out.length) {
    const status = out[i] ?? "";
    if (status.startsWith("R") || status.startsWith("C")) {
      renamedFrom.set(out[i + 2], out[i + 1]);
      i += 3;
    } else i += 2;
  }
} catch {
  /* no renames known: every moved file counts as new, as before */
}
function newLines(file, rev) {
  let diff;
  const from = renamedFrom.get(file);
  try {
    diff = execFileSync(
      "git",
      from
        ? ["diff", ...PLAIN, "-M", "--unified=0", rev, "--", from, file]
        : ["diff", ...PLAIN, "--no-renames", "--unified=0", rev, "--", file],
      { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    );
  } catch {
    return null;
  }
  const lines = new Set();
  for (const m of diff.matchAll(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/gm)) {
    const from = Number(m[1]);
    const count = m[2] === undefined ? 1 : Number(m[2]);
    for (let i = 0; i < count; i++) lines.add(from + i);
  }
  return lines;
}
/* What a finding has to be new against: HEAD, and while a merge is being
   concluded the branch coming in too, so a line the other branch brought
   is not this commit's. */
const against = ["HEAD"];
try {
  execFileSync("git", ["rev-parse", "-q", "--verify", "MERGE_HEAD"], {
    cwd: root,
    stdio: "ignore",
  });
  against.push("MERGE_HEAD");
} catch {
  /* not a merge */
}
if (staged.length)
  console.log(`pre-commit: semgrep (${staged.length} file(s))`);
const sgEnv = Object.fromEntries(
  Object.entries(process.env).filter(([k]) => !k.startsWith("GIT_")),
);
const sg = staged.length
  ? spawnSync(
      "semgrep",
      [
        "scan",
        "--config",
        "p/default",
        "--metrics=off",
        "--json",
        "--quiet",
        "--",
        ...staged,
      ],
      {
        cwd: root,
        env: sgEnv,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
      },
    )
  : null;
let report = null;
try {
  report = !sg || sg.error ? null : JSON.parse(sg.stdout);
} catch {
  /* no report */
}
/* A verdict needs a report, and no error about the run itself (the rules
   could not be fetched, a bad configuration); an error about one file
   (it could not be parsed) leaves the other files' findings standing. */
const runErrors = (report?.errors || []).filter(
  (e) => e?.level === "error" && !e?.path && !e?.spans,
);
const ran =
  report &&
  Array.isArray(report.results) &&
  (sg.status === 0 || sg.status === 1) &&
  runErrors.length === 0;
if (!sg) {
  /* nothing on disk to scan: the commit only deletes */
} else if (sg.error?.code === "ENOENT") {
  console.log(
    "pre-commit: semgrep is not installed, so skipped (https://semgrep.dev/docs/getting-started/)",
  );
} else if (!ran) {
  console.log(
    `pre-commit: semgrep could not run (exit ${sg.status ?? "none"}; offline?), so skipped`,
  );
} else {
  const added = new Map();
  const isNew = (r) => {
    if (!added.has(r.path))
      added.set(
        r.path,
        against.map((rev) => newLines(r.path, rev)),
      );
    const from = Number(r.start?.line) || 0;
    const to = Number(r.end?.line) || from;
    const onNew = (lines) => {
      if (!lines) return true;
      for (let l = from; l <= to; l++) if (lines.has(l)) return true;
      return false;
    };
    return added.get(r.path).every(onNew);
  };
  const found = report.results.filter(isNew);
  const old = report.results.length - found.length;
  if (old)
    console.log(
      `pre-commit: semgrep: ${old} finding(s) on lines this commit does not change, left to CI`,
    );
  if (found.length) {
    failed = true;
    for (const r of found)
      console.error(
        `  ${r.path}:${r.start?.line ?? "?"} ${r.check_id}\n    ${String(r.extra?.message ?? "").split("\n")[0]}`,
      );
    console.error(`pre-commit: semgrep: ${found.length} finding(s) above`);
  }
}

console.log(
  `pre-commit: ${failed ? "failed" : "passed"} in ${((Date.now() - started) / 1000).toFixed(1)}s`,
);
process.exit(failed ? 1 : 0);
