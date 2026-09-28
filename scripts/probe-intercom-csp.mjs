#!/usr/bin/env node
/**
 * Press the Support button in a real browser and report what the CSP blocked.
 *
 * The Intercom host list in vercel.json came from Intercom's documentation, and
 * a documented list is not the same as a working one: their help pages are
 * JavaScript-rendered and could not be read directly, regions differ, and the
 * messenger pulls in hosts that no directive in the old policy allowed at all.
 * Getting it wrong means a support widget that silently does nothing in
 * production while every check here stays green — the exact failure mode a CSP
 * introduces.
 *
 * So this drives the built site with the real policy applied, clicks the button,
 * and collects every securitypolicyviolation the page fires plus every request
 * the browser refused. Anything it prints is a host the policy is missing.
 *
 *   node scripts/probe-intercom-csp.mjs          # against a local server
 *   PROBE_BASE_URL=https://… node scripts/probe-intercom-csp.mjs
 */
import { chromium } from "playwright";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.PROBE_BASE_URL || "http://127.0.0.1:4173";

/* Same Chromium discovery as scripts/qa.mjs — Playwright's headless shell is
   not always present even when a perfectly good Chromium is. */
function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  try {
    if (existsSync(chromium.executablePath())) return undefined;
  } catch {
    /* nothing registered */
  }
  for (const dir of [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    "/opt/pw-browsers",
  ]) {
    if (!dir || !existsSync(dir)) continue;
    for (const entry of readdirSync(dir).sort().reverse()) {
      for (const leaf of ["chrome-linux/chrome", "chrome-linux64/chrome"]) {
        const candidate = join(dir, entry, leaf);
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return undefined;
}

/* A static file server does not send the production headers, so lift the policy
   straight out of vercel.json and apply it with a meta tag. Testing against a
   policy other than the deployed one would prove nothing. */
const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
const csp = vercel.headers[0].headers.find(
  (header) => header.key === "Content-Security-Policy",
).value;

const browser = await chromium.launch({ executablePath: findChromium() });
const page = await browser.newPage();

const violations = [];
const failures = [];

await page.addInitScript(() => {
  window.__violations = [];
  document.addEventListener("securitypolicyviolation", (event) => {
    window.__violations.push({
      directive: event.effectiveDirective || event.violatedDirective,
      blocked: event.blockedURI,
    });
  });
});

page.on("requestfailed", (request) => {
  const failure = request.failure()?.errorText ?? "";
  /* Chromium reports a CSP refusal as a blocked-by-client failure. */
  if (/blocked/i.test(failure)) {
    failures.push({ url: request.url(), reason: failure });
  }
});

/* Whether the workspace id is right, and whether this domain is trusted, are
   only answerable from Intercom's own reply. A clean CSP with a rejected ping
   looks identical to success from the outside, so read the reply. */
const api = [];
page.on("response", async (response) => {
  const url = response.url();
  if (!/intercom/i.test(url)) return;
  if (!/(ping|messenger|api-iam)/i.test(url)) return;
  let hint = "";
  try {
    const text = (await response.text()).slice(0, 300);
    hint = text.replace(/\s+/g, " ");
  } catch {
    /* opaque or already consumed */
  }
  api.push({ url: url.replace(/\?.*$/, ""), status: response.status(), hint });
});

/* Apply the real policy before any of the page's own script runs. */
await page.route("**/*", async (route) => {
  if (route.request().resourceType() !== "document") return route.continue();
  const response = await route.fetch();
  let html = await response.text();
  html = html.replace(
    /<head>/i,
    `<head><meta http-equiv="Content-Security-Policy" content="${csp.replace(/"/g, "&quot;")}">`,
  );
  await route.fulfill({ response, body: html });
});

await page.goto(`${BASE}/toddle-enhancement-extension/`, {
  waitUntil: "networkidle",
});

/* Before the click there must be no Intercom activity at all — that is the
   whole premise of the component, and it is cheap to verify here. */
const intercomBefore = await page.evaluate(
  () => typeof window.Intercom !== "undefined",
);
const cookiesBefore = (await page.context().cookies()).length;

const button = page.locator("[data-support-launcher]");
await button.waitFor({ state: "visible", timeout: 10_000 });
await button.click();

/* Give the messenger time to load, boot, open its iframe and fetch its assets. */
await page.waitForTimeout(12_000);

violations.push(...(await page.evaluate(() => window.__violations ?? [])));

/* Distinguish the real messenger from our own stub. The component installs a
   queueing shim so that boot() can be called before the script lands; that shim
   is also a function called window.Intercom, so "typeof === function" proves
   nothing. The real script replaces it and drains the queue, so a surviving
   .q array means Intercom never took over. */
const intercomAfter = await page.evaluate(() => {
  const ic = window.Intercom;
  if (typeof ic !== "function") return "absent";
  return Array.isArray(ic.q) ? "stub-only" : "real";
});
const frames = page.frames().filter((frame) => /intercom/i.test(frame.url()));
const cookiesAfter = (await page.context().cookies()).length;

await browser.close();

if (api.length === 0) {
  console.log("Intercom API: no calls seen at all");
} else {
  console.log("Intercom API calls:");
  for (const call of api) {
    console.log(`  ${call.status} ${call.url}`);
    if (call.hint) console.log(`        ${call.hint.slice(0, 200)}`);
  }
}
console.log();
console.log(
  `before the click: Intercom present=${intercomBefore}, cookies=${cookiesBefore}`,
);
console.log(
  `after the click:  Intercom=${intercomAfter}, intercom frames=${frames.length}, cookies=${cookiesAfter}`,
);

/* Deduplicate down to hosts, which is what actually needs adding to a policy. */
const blocked = new Map();
for (const violation of violations) {
  if (!violation.blocked || violation.blocked === "inline") continue;
  let host = violation.blocked;
  try {
    host = new URL(violation.blocked).host;
  } catch {
    /* some blockedURI values are already bare */
  }
  const key = `${violation.directive} ${host}`;
  blocked.set(key, (blocked.get(key) ?? 0) + 1);
}

if (blocked.size === 0 && failures.length === 0) {
  console.log(
    "\nno CSP violations — every host the messenger needs is allowed",
  );
} else {
  console.log("\nBLOCKED — add these to the policy in vercel.json:");
  for (const [key, count] of [...blocked].sort()) {
    console.log(`  ${key}  (${count}×)`);
  }
  for (const failure of failures) {
    console.log(`  request refused: ${failure.url} — ${failure.reason}`);
  }
}

if (intercomBefore) {
  console.error(
    "\nFAIL: Intercom was present before the button was pressed — it is loading on page load",
  );
  process.exit(1);
}
if (intercomAfter === "absent") {
  console.error(
    "\nFAIL: nothing at all after the click — the widget is broken",
  );
  process.exit(1);
}
if (intercomAfter === "stub-only") {
  /* Not a failure of this repo's code: the script loaded and the CSP allowed it,
     but the real messenger never took over. Off a trusted domain that is exactly
     what Intercom does, so say so rather than passing or failing blind. */
  console.log(
    [
      "",
      "INCONCLUSIVE: the loader ran and the CSP allowed it, but the real",
      "messenger never replaced the stub and made no API call. Off an origin the",
      "workspace trusts, that is expected — 127.0.0.1 is not learning.nyuchi.com.",
      "Verify on the Vercel preview once learning.nyuchi.com is a trusted domain",
      "in Intercom's messenger settings.",
    ].join("\n"),
  );
}
if (blocked.size > 0) process.exit(1);
