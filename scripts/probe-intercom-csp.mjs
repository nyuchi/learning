#!/usr/bin/env node
/**
 * Press the Support button in a real browser and report what the CSP blocked.
 *
 * This is the host-discovery tool, not the gate. The gate is scripts/qa.mjs,
 * which asserts on every page that nothing third-party loads before a click.
 * What this script is for is the other half: the Intercom host list came from
 * documentation, and a documented list is not a working one — their help pages
 * are JavaScript-rendered and could not be read directly, regions differ, and
 * the messenger pulls in hosts no directive in the old policy allowed at all.
 * Getting it wrong means a support widget that silently does nothing in
 * production while every check stays green.
 *
 *   npm run csp:probe                            # builds, serves, probes
 *   PROBE_BASE_URL=https://… node scripts/probe-intercom-csp.mjs
 */
import { chromium } from "playwright";
import { findChromium } from "./lib/browser.mjs";
import { readPolicy } from "./lib/csp.mjs";

const BASE = process.env.PROBE_BASE_URL || "http://127.0.0.1:4173";
const PAGE = "/toddle-enhancement-extension/";
const SETTLE_TIMEOUT = 12_000;

/* A static file server does not send the production headers, so lift the policy
   out of vercel.json and attach it to the document response. Injecting the real
   header rather than a <meta> tag matters twice over: it does not depend on the
   built HTML containing a literal <head> to patch (a variation there would
   apply no policy at all, and the probe would then cheerfully report "no
   violations"), and a meta-delivered policy silently ignores some directives. */
const csp = readPolicy();

const browser = await chromium.launch({ executablePath: findChromium() });
const page = await browser.newPage();

const refused = [];

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
    refused.push(`request refused: ${request.url()} — ${failure}`);
  }
});

/* Whether the workspace id is right, and whether this domain is trusted, are
   only answerable from Intercom's own reply: a clean CSP with a rejected ping
   looks identical to success from the outside. Only JSON replies carry a reason
   worth reading, so skip the bundles — buffering a messenger bundle across CDP
   to keep 300 characters of it is megabytes thrown away per run. */
const api = [];
page.on("response", async (response) => {
  const url = response.url();
  if (!/intercom/i.test(url)) return;
  if (!/(ping|messenger|api-iam)/i.test(url)) return;
  const type = response.headers()["content-type"] ?? "";
  if (!/json|text\/plain/i.test(type)) return;
  let hint = "";
  try {
    hint = (await response.text()).replace(/\s+/g, " ").slice(0, 200);
  } catch {
    /* opaque or already consumed */
  }
  api.push({ url: url.replace(/\?.*$/, ""), status: response.status(), hint });
});

/* Route only the document. A catch-all route sends every font, stylesheet and
   messenger asset through a Node round-trip to no effect. */
await page.route(`${BASE}${PAGE}`, async (route) => {
  if (route.request().resourceType() !== "document") return route.continue();
  const response = await route.fetch();
  await route.fulfill({
    response,
    headers: { ...response.headers(), "content-security-policy": csp },
  });
});

await page.goto(`${BASE}${PAGE}`, { waitUntil: "networkidle" });

const before = {
  intercom: await page.evaluate(() => typeof window.Intercom !== "undefined"),
  cookies: (await page.context().cookies()).length,
};

const button = page.locator("[data-support-launcher]");
await button.waitFor({ state: "visible", timeout: 10_000 });
await button.click();

/* Wait for the messenger to settle rather than for a fixed duration, so a
   healthy run finishes in a second or two. On an untrusted origin it never
   settles and this costs the full timeout, which is the case the report below
   calls inconclusive. */
await page
  .waitForFunction(() => typeof window.Intercom === "function", null, {
    timeout: SETTLE_TIMEOUT,
  })
  .catch(() => {});
await page.waitForLoadState("networkidle").catch(() => {});

const violations = await page.evaluate(() => window.__violations ?? []);
const after = {
  intercom: await page.evaluate(() => typeof window.Intercom === "function"),
  frames: page.frames().filter((frame) => /intercom/i.test(frame.url())).length,
  cookies: (await page.context().cookies()).length,
};

await browser.close();

if (api.length === 0) {
  console.log("Intercom API: no JSON replies seen");
} else {
  console.log("Intercom API calls:");
  for (const call of api) {
    console.log(`  ${call.status} ${call.url}`);
    if (call.hint) console.log(`        ${call.hint}`);
  }
}
console.log();
console.log(
  `before the click: Intercom=${before.intercom}, cookies=${before.cookies}`,
);
console.log(
  `after the click:  Intercom=${after.intercom}, intercom frames=${after.frames}, cookies=${after.cookies}`,
);

/* Deduplicate to directive + host, which is what needs adding to a policy. */
const blocked = new Set();
for (const violation of violations) {
  if (!violation.blocked || violation.blocked === "inline") continue;
  let host = violation.blocked;
  try {
    host = new URL(violation.blocked).host;
  } catch {
    /* some blockedURI values are already bare */
  }
  blocked.add(`${violation.directive} ${host}`);
}

if (blocked.size === 0 && refused.length === 0) {
  console.log(
    "\nno CSP violations — every host the messenger needs is allowed",
  );
} else {
  console.log("\nBLOCKED — add these to the policy in vercel.json:");
  for (const entry of [...blocked].sort()) console.log(`  ${entry}`);
  for (const entry of refused) console.log(`  ${entry}`);
}

if (before.intercom) {
  console.error(
    "\nFAIL: Intercom was present before the button was pressed — it is loading on page load",
  );
  process.exit(1);
}
if (!after.intercom) {
  /* Not a failure of this repo's code: the loader ran and the CSP allowed it,
     but the real messenger never took over. Off a trusted origin that is
     exactly what Intercom does, so say so rather than passing or failing
     blind. */
  console.log(
    [
      "",
      "INCONCLUSIVE: the loader ran and the CSP allowed it, but the messenger",
      "never took over and made no JSON call. Off an origin the workspace",
      "trusts, that is expected — 127.0.0.1 is not learning.nyuchi.com. Verify",
      "on the Vercel preview once learning.nyuchi.com is a trusted domain in",
      "Intercom's messenger settings.",
    ].join("\n"),
  );
}
if (blocked.size > 0 || refused.length > 0) process.exit(1);
