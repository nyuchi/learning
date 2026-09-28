#!/usr/bin/env node
/**
 * Verify that every inline script in the build is allowed by the CSP.
 *
 * The shell carries one inline script — the theme bootstrap, which has to beat
 * the first paint — so the CSP allows it by hash rather than by opening
 * script-src to all inline code. A hash allowlist is only worth anything if it
 * cannot silently fall out of date, hence this check: edit the bootstrap
 * without updating vercel.json and the build fails here, loudly, instead of the
 * theme quietly breaking in production.
 *
 *   node scripts/check-csp.mjs        # verify
 *   node scripts/check-csp.mjs --fix  # rewrite vercel.json with current hashes
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const fix = process.argv.includes("--fix");

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = join(directory, entry);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

let pages;
try {
  pages = walk(dist).filter((file) => file.endsWith(".html"));
} catch {
  console.error("no dist/ — run `npm run build` first");
  process.exit(1);
}

/** sha256-<base64> over the exact bytes between the script tags. */
const hashes = new Set();
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const match of html.matchAll(
    /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    hashes.add(
      `'sha256-${createHash("sha256").update(match[1], "utf8").digest("base64")}'`,
    );
  }
}

const vercelPath = join(root, "vercel.json");
const vercel = JSON.parse(readFileSync(vercelPath, "utf8"));
const headerBlock = vercel.headers?.[0]?.headers ?? [];
const csp = headerBlock.find(
  (header) => header.key === "Content-Security-Policy",
);
if (!csp) {
  console.error("vercel.json declares no Content-Security-Policy");
  process.exit(1);
}

const scriptSrc = csp.value
  .split(";")
  .map((part) => part.trim())
  .find((part) => part.startsWith("script-src"));
const missing = [...hashes].filter((hash) => !scriptSrc?.includes(hash));

if (missing.length === 0) {
  console.log(
    `CSP covers ${hashes.size} inline script(s) across ${pages.length} page(s)`,
  );
  process.exit(0);
}

if (!fix) {
  console.error("inline scripts not allowed by the CSP in vercel.json:");
  for (const hash of missing) console.error(`  ${hash}`);
  console.error(
    "\nRun `npm run csp:fix` to update vercel.json, then review the diff.",
  );
  process.exit(1);
}

csp.value = csp.value
  .split(";")
  .map((part) => part.trim())
  .map((part) =>
    part.startsWith("script-src")
      ? `script-src 'self' ${[...hashes].join(" ")}`
      : part,
  )
  .join("; ");
writeFileSync(vercelPath, `${JSON.stringify(vercel, null, 2)}\n`);
console.log(`updated vercel.json with ${hashes.size} inline script hash(es)`);
