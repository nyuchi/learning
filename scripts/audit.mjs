#!/usr/bin/env node
/**
 * `npm audit --audit-level=high --omit=dev`, minus a short, dated list of
 * advisories that have been assessed and cannot be fixed yet.
 *
 * npm audit has no way to set one advisory aside, and dropping the level would
 * hide every new advisory with it. So this runs the audit as JSON and fails on
 * any advisory at or above the level that is not in IGNORED below — and on any
 * entry in IGNORED whose recheck date has passed, so nothing stays set aside
 * by default.
 *
 *   node scripts/audit.mjs
 */
import { execFileSync } from "node:child_process";

const LEVELS = ["info", "low", "moderate", "high", "critical"];
const LEVEL = "high";

/* Every entry: the advisory, why it is safe here, when it was set aside and
   when it must be looked at again. Remove an entry as soon as a fix installs. */
const IGNORED = [
  {
    id: "GHSA-ch52-4w7c-c8xp",
    package: "http-cache-semantics",
    added: "2026-10-03",
    recheck: "2026-11-03",
    why:
      "http-cache-semantics <=4.2.0 (no patched release) can serve another " +
      "user's cached response through max-stale handling. astro 7.3.5 uses " +
      "it only in assets/build/remote.js, which caches remote images during " +
      "`astro build` (core/build/static-build -> generate). This site is " +
      'output: "static": no server code ships, no shared cache answers ' +
      "users, so the vulnerable path never runs outside our own build.",
  },
];

let raw;
try {
  raw = execFileSync("npm", ["audit", "--omit=dev", "--json"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
} catch (e) {
  /* npm audit exits non-zero when it finds anything; the JSON is still there */
  raw = e.stdout;
  if (!raw) throw e;
}
const report = JSON.parse(raw);
if (report.error) {
  console.error("npm audit failed:", report.error.summary || report.error);
  process.exit(1);
}

const atLeast = (s) => LEVELS.indexOf(s) >= LEVELS.indexOf(LEVEL);
const ghsa = (url) => (url || "").split("/").pop();

/* Every chain ends in an advisory object, so the advisories are the full set. */
const found = new Map();
for (const v of Object.values(report.vulnerabilities || {})) {
  for (const via of v.via) {
    if (typeof via === "object" && atLeast(via.severity)) {
      found.set(ghsa(via.url), via);
    }
  }
}

const today = new Date().toISOString().slice(0, 10);
let failed = false;

for (const entry of IGNORED) {
  if (today > entry.recheck) {
    console.error(
      `✖ ${entry.id} (${entry.package}) was set aside until ${entry.recheck}: ` +
        "recheck it — remove the entry if a fix installs, or reassess and move the date.",
    );
    failed = true;
  }
}

for (const [id, via] of found) {
  const entry = IGNORED.find((e) => e.id === id);
  if (entry) {
    console.log(
      `- ${id} (${via.name}, ${via.severity}) set aside until ${entry.recheck}: ${entry.why}`,
    );
  } else {
    console.error(
      `✖ ${id} (${via.name}, ${via.severity}): ${via.title} — ${via.url}`,
    );
    failed = true;
  }
}

for (const entry of IGNORED) {
  if (!found.has(entry.id)) {
    console.log(`- ${entry.id} is no longer reported: remove it from IGNORED.`);
  }
}

if (failed) process.exit(1);
console.log(`✔ no unassessed advisories at ${LEVEL} or above in what ships`);
