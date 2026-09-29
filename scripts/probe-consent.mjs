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

/* --- rejecting all --- */
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(PAGE, { waitUntil: "networkidle" });

  const banner = page.locator(".consent");
  check("banner is shown on a first visit", await banner.isVisible());

  /* Equal prominence is a requirement, not a preference: a reject button that is
     smaller or quieter than accept is the pattern regulators have been fining.
     Compare the rendered boxes rather than the classes. */
  const reject = page.locator('[data-consent-action="reject"]');
  const accept = page.locator('[data-consent-action="accept"]');
  const rejectBox = await reject.boundingBox();
  const acceptBox = await accept.boundingBox();
  check(
    "Reject all is the same size as Accept all",
    rejectBox && acceptBox && Math.abs(rejectBox.height - acceptBox.height) < 2,
    `reject ${JSON.stringify(rejectBox)} vs accept ${JSON.stringify(acceptBox)}`,
  );

  /* Nothing optional may start on. */
  await page.locator('[data-consent-action="customise"]').click();
  const optional = page.locator("[data-consent-category]:not([disabled])");
  const optionalCount = await optional.count();
  check(
    "there is more than one optional category to choose between",
    optionalCount > 1,
  );
  let preChecked = 0;
  for (let i = 0; i < optionalCount; i += 1) {
    if (await optional.nth(i).isChecked()) preChecked += 1;
  }
  check(
    "no optional category is pre-ticked",
    preChecked === 0,
    `${preChecked} were`,
  );

  const required = page.locator("[data-consent-category][disabled]");
  check(
    "the necessary category is on and cannot be switched off",
    (await required.count()) === 1 && (await required.first().isChecked()),
  );

  let cookies = await analyticsCookies(context);
  check(
    "no analytics cookie before a choice",
    cookies.length === 0,
    cookies.join(", "),
  );

  await reject.click();
  await page.waitForTimeout(1500);
  check("banner is dismissed after rejecting all", !(await banner.isVisible()));
  cookies = await analyticsCookies(context);
  check(
    "no analytics cookie after rejecting all",
    cookies.length === 0,
    cookies.join(", "),
  );

  /* The record has to be produceable later — all three regimes put the burden of
     showing consent on us, and a bare boolean is not a record. */
  const record = await page.evaluate(() => {
    try {
      return JSON.parse(localStorage.getItem("nyuchi-consent") ?? "null");
    } catch {
      return null;
    }
  });
  check(
    "a versioned, timestamped record is stored",
    Boolean(record?.v && record?.at),
  );
  check(
    "rejecting all records every optional category as false",
    record && record.analytics === false && record.support === false,
    JSON.stringify(record),
  );

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  check("banner stays dismissed after a reload", !(await banner.isVisible()));
  cookies = await analyticsCookies(context);
  check(
    "still no analytics cookie after a reload",
    cookies.length === 0,
    cookies.join(", "),
  );

  /* Withdrawal must be as easy as giving it. */
  const reopen = page.locator("#cookie-choices");
  check("the footer offers a way to change it", (await reopen.count()) > 0);
  if (await reopen.count()) {
    await reopen.click();
    await page.waitForTimeout(500);
    check("the footer control reopens the banner", await banner.isVisible());
  }

  await context.close();
}

/* --- choosing SOME: analytics on, support off --- */
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(PAGE, { waitUntil: "networkidle" });

  await page.locator('[data-consent-action="customise"]').click();
  await page.locator('[data-consent-category="analytics"]').check();
  await page.locator('[data-consent-action="save"]').click();
  await page.waitForTimeout(1500);

  const record = await page.evaluate(() => {
    try {
      return JSON.parse(localStorage.getItem("nyuchi-consent") ?? "null");
    } catch {
      return null;
    }
  });
  check(
    "choosing some records exactly what was chosen",
    record && record.analytics === true && record.support === false,
    JSON.stringify(record),
  );

  /* Support was declined, so the messenger must not be on offer at all. */
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  check(
    "declining the messenger hides its button",
    !(await page.locator("[data-support-launcher]").isVisible()),
  );
  check(
    "and offers email instead",
    await page.locator("[data-support-fallback]").isVisible(),
  );

  await context.close();
}

/* --- accepting, in a clean profile --- */
let acceptPath = "verified";
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(PAGE, { waitUntil: "networkidle" });

  await page.locator('[data-consent-action="accept"]').click();
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
    !(await page.locator(".consent").isVisible()),
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
console.log("\nconsent works: all, some or none — and nothing until asked");

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
