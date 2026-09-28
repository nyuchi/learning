#!/usr/bin/env node
/**
 * Verify that every inline script in the build is allowed by the CSP.
 *
 * The shell carries one inline script — the theme bootstrap, which has to beat
 * the first paint — so the CSP allows it by hash rather than by opening
 * script-src to all inline code. A hash allowlist is only worth anything if it
 * cannot silently fall out of date, hence this check: edit the bootstrap
 * without updating vercel.json and the build fails here, loudly, instead of
 * the theme quietly breaking in production.
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

/** sha256-<base64> over the exact bytes between the script tags.
 *
 * The pattern tolerates how a script tag can legally vary — upper case, and
 * whitespace or bogus attributes inside the end tag (`</script\t\n bar>` is
 * valid) — because a block this missed would get no hash, and the CSP would
 * then block it in production while every check here stayed green. */
const hashes = new Set();
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const match of html.matchAll(
    /<script\b(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script[^>]*>/gi,
  )) {
    const [, attrs, body] = match;
    /* A script element whose type is not a JavaScript MIME type is a data
       block: the browser never executes it, so CSP's script-src does not
       apply and it needs no hash. Hashing them anyway would mean every edit
       to the JSON-LD — that is, every edit to a page's title or description —
       silently invalidated the policy until someone re-ran csp:fix. And if a
       browser did block one, the page would still be correct; it would lose
       its structured data, not its behaviour. */
    if (/\btype\s*=\s*["']?application\/ld\+json/i.test(attrs)) continue;
    hashes.add(
      `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`,
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

/* Replace only the hashes, keeping every other source in script-src.
   This used to rewrite the directive as `script-src 'self' <hashes>`, which
   silently deleted anything else that had been added to it — a host for a
   third-party widget, say. The deletion did not fail anything here: the hashes
   were still correct, so this script reported success while production started
   refusing to load a script it had been loading the day before. So keep what we
   did not come here to change. */
csp.value = csp.value
  .split(";")
  .map((part) => part.trim())
  .map((part) => {
    if (!part.startsWith("script-src")) return part;
    const kept = part
      .split(/\s+/)
      .slice(1)
      .filter((source) => !/^'sha(256|384|512)-/.test(source));
    return ["script-src", ...kept, ...hashes].join(" ");
  })
  .join("; ");
writeFileSync(vercelPath, `${JSON.stringify(vercel, null, 2)}\n`);
console.log(`updated vercel.json with ${hashes.size} inline script hash(es)`);
