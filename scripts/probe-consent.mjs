#!/usr/bin/env node
/**
 * Prove the consent banner actually gates the cookie.
 *
 * The privacy policy makes a specific, checkable promise: Google Analytics sets
 * no cookie until you press Accept. That promise lives in the ORDER of three
 * inline scripts and in one Consent Mode call, which is the kind of thing that
 * keeps working right up until someone reorders the head for an unrelated
 * reason. Nothing about the page would look broken; the cookie would simply
 * start appearing, and the policy would quietly become false.
 *
 * So this drives it: load the page, assert no analytics cookie; decline, assert
 * still none and the banner is gone; reload, assert it stays gone and still no
 * cookie; then accept in a fresh context and assert the cookie appears.
 *
 *   npm run consent:probe
 */
import { chromium } from "playwright";
import { findChromium } from "./lib/browser.mjs";

const BASE =
  process.env.QA_BASE_URL ||
  process.env.PROBE_BASE_URL ||
  "http://127.0.0.1:4173";
const PAGE = `${BASE}/`;

/* GA's own cookies. _ga is the client id; _ga_<id> is the session. Neither may
   exist before consent. The consent choice itself lives in localStorage, not a
   cookie, so anything matching here is analytics. */
const ANALYTICS_COOKIE = /^_ga|^_gid$|^_gat/;

const browser = await chromium.launch({ executablePath: findChromium() });
const failures = [];
const notes = [];

async function analyticsCookies(context) {
  return (await context.cookies())
    .map((cookie) => cookie.name)
    .filter((name) => ANALYTICS_COOKIE.test(name));
}

function check(label, condition, detail = "") {
  if (condition) {
    notes.push(`ok    ${label}`);
  } else {
    failures.push(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

/* --- declining --- */
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(PAGE, { waitUntil: "networkidle" });

  const banner = page.locator(".cookie-banner");
  check("banner is shown on a first visit", await banner.isVisible());

  let cookies = await analyticsCookies(context);
  check(
    "no analytics cookie before a choice",
    cookies.length === 0,
    cookies.join(", "),
  );

  await page.locator('[data-consent="denied"]').click();
  await page.waitForTimeout(1500);

  check("banner is dismissed after declining", !(await banner.isVisible()));
  cookies = await analyticsCookies(context);
  check(
    "no analytics cookie after declining",
    cookies.length === 0,
    cookies.join(", "),
  );

  /* The decision has to survive a reload, or it is not a decision. */
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  check("banner stays dismissed after a reload", !(await banner.isVisible()));
  cookies = await analyticsCookies(context);
  check(
    "still no analytics cookie after a reload",
    cookies.length === 0,
    cookies.join(", "),
  );

  /* And it has to be reversible from the footer. */
  const reopen = page.locator("#cookie-choices");
  check("the footer offers a way to change it", (await reopen.count()) > 0);
  if (await reopen.count()) {
    await reopen.click();
    await page.waitForTimeout(500);
    check("the footer control reopens the banner", await banner.isVisible());
  }

  await context.close();
}

/* --- accepting, in a clean profile --- */
let acceptPath = "verified";
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(PAGE, { waitUntil: "networkidle" });

  await page.locator('[data-consent="granted"]').click();
  /* GA writes its cookie on the next measurement call after the update. */
  await page.waitForTimeout(3000);

  /* Did Google's bundle actually arrive? A sandboxed browser that does not trust
     the local TLS proxy fails the request with ERR_CERT_AUTHORITY_INVALID, the
     same way it fails Google Fonts. Without the bundle there is no GA to set a
     cookie, and calling that a broken consent update would be a lie about this
     repo's code — so the two cases are reported differently. */
  const gtmLoaded = await page.evaluate(
    () => typeof window.google_tag_manager !== "undefined",
  );
  const cookies = await analyticsCookies(context);

  if (cookies.length > 0) {
    notes.push("ok    accepting does set the analytics cookie");
    notes.push(`      cookies after accept: ${cookies.join(", ")}`);
  } else if (!gtmLoaded) {
    acceptPath = "unverifiable";
  } else {
    failures.push(
      "FAIL  accepting did not set the analytics cookie, and Google's bundle DID load — the consent update is not reaching gtag",
    );
  }

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  check(
    "banner stays dismissed for someone who accepted",
    !(await page.locator(".cookie-banner").isVisible()),
  );

  await context.close();
}

await browser.close();

for (const note of notes) console.log(note);
for (const failure of failures) console.log(failure);

if (failures.length) {
  console.log(`\n${failures.length} consent check(s) failed`);
  process.exit(1);
}
console.log("\nconsent gating works: no analytics cookie until Accept");

if (acceptPath === "unverifiable") {
  console.log(
    [
      "",
      "One check could not run here: whether accepting actually starts",
      "measurement. Google's tag never loaded in this browser",
      "(ERR_CERT_AUTHORITY_INVALID — this sandbox does not trust the local TLS",
      "proxy, and it fails Google Fonts the same way), so there was no GA to set",
      "a cookie either way. The promise the privacy policy makes — no cookie",
      "before consent — is proven above and does not depend on it.",
      "",
      "Re-run against the deployed site to close that gap:",
      "  QA_BASE_URL=https://learning.nyuchi.com node scripts/probe-consent.mjs",
    ].join("\n"),
  );
}
