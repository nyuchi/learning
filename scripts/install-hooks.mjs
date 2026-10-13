#!/usr/bin/env node
/**
 * Turns on this repository's Git hooks (`.githooks/`) in this clone.
 * `npm ci` and `npm install` run it, as `prepare`.
 *
 * All it does is set `core.hooksPath` to `.githooks` in this clone's own
 * `.git/config`: it enables hooks and bypasses nothing. Because the hooks
 * are tracked files, Git runs the version on the branch you have
 * checked out, as `npm test` and `npm ci` already run that branch's code:
 * check out a branch you don't trust only in a clone you'd run its tests
 * in (CONTRIBUTING.md). It changes nothing,
 * and says so, where that would silence hooks a developer already has:
 * `core.hooksPath` set at any level (a global secret scanner, say), or a
 * hook of their own in `.git/hooks/`. Outside a Git clone of this
 * repository (a packed copy, or no git at all) it does nothing, and it
 * never fails an install.
 *
 * The one hook, .githooks/post-merge, runs scripts/clean.mjs after a
 * `git pull` that merges.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HOOKS = ".githooks";

const git = (...args) =>
  execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
const quiet = (fn) => {
  try {
    return fn();
  } catch {
    return "";
  }
};
const note = (text) =>
  console.log(`git hooks: ${text} This repository's hooks are in ${HOOKS}/;
  to use them: git config core.hooksPath ${HOOKS} (CONTRIBUTING.md).`);

function install() {
  const top = quiet(() => git("rev-parse", "--show-toplevel"));
  /* not a Git clone, no git, or a clone of something else around us
     (native realpath: the case on disk, so the two spellings agree) */
  if (!top || realpathSync.native(top) !== realpathSync.native(root)) return;

  /* core.hooksPath from any level: system, global or this clone */
  const current = quiet(() => git("config", "--get", "core.hooksPath"));
  if (current === HOOKS) return;
  if (current) return note(`core.hooksPath is ${current}; left as it is.`);

  /* hooks of a developer's own in .git/hooks/ (Git's *.sample files are
     not hooks) */
  const dir = quiet(() => git("rev-parse", "--git-path", "hooks"));
  const hooksDir = dir && (isAbsolute(dir) ? dir : join(root, dir));
  const own =
    hooksDir && existsSync(hooksDir)
      ? readdirSync(hooksDir).filter((n) => !n.endsWith(".sample"))
      : [];
  if (own.length)
    return note(
      `${hooksDir} has hooks of its own (${own.join(", ")}); left as it is.`,
    );

  try {
    git("config", "--local", "core.hooksPath", HOOKS);
    console.log(`git hooks: on (${HOOKS}/, see CONTRIBUTING.md)`);
  } catch {
    note("could not set core.hooksPath (is .git/config writable?).");
  }
}

try {
  install();
} catch {
  /* an install never fails on an optional hook */
}
