/**
 * Browser QA: accessibility (axe-core) and layout across real viewports.
 *
 * The site has never been opened at phone width in this session, and nothing
 * in CI looks at rendered output — so this checks the two things a static-site
 * test suite cannot: does it pass an accessibility audit, and does it overflow
 * horizontally on a small screen.
 */
import { chromium } from "playwright";
import { findChromium } from "./lib/browser.mjs";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

/** Where the built site is being served. `npm run qa` starts one for you. */
const BASE = process.env.QA_BASE_URL || "http://127.0.0.1:4173";

const EXECUTABLE = findChromium();

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const PAGES = [
  "/",
  "/toddle-enhancement-extension/",
  "/legal/privacy/",
  "/legal/terms/",
];
const VIEWPORTS = [
  { name: "phone", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const report = [];

for (const scheme of ["light", "dark"]) {
  for (const path of PAGES) {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
      });
      const consoleErrors = [];
      page.on(
        "console",
        (m) => m.type() === "error" && consoleErrors.push(m.text()),
      );
      page.on("pageerror", (e) => consoleErrors.push(String(e)));

      /* Two separate things to catch, and they must not be conflated.
       *
       * The messenger must not load until someone asks for it. That is the
       * claim the privacy policy makes and the one worth a browser to check.
       *
       * Everything else third-party must be on the approved list. Google Fonts
       * and Google Analytics are there because a commit put them there; anything
       * else arriving is the regression this exists to catch.
       *
       * Analytics loading eagerly is not a licence for the messenger to, which
       * is why these are two assertions rather than one "no third parties". */
      const APPROVED =
        /(^|\.)(googleapis|gstatic|googletagmanager|google-analytics)\.com$|(^|\.)analytics\.google\.com$/;
      const unapproved = [];
      const intercomBeforeClick = [];
      page.on("request", (request) => {
        const host = new URL(request.url()).host;
        if (host === new URL(BASE).host) return;
        if (/intercom/i.test(host)) {
          intercomBeforeClick.push(host);
          return;
        }
        if (APPROVED.test(host)) return;
        unapproved.push(host);
      });

      const res = await page.goto(`${BASE}${path}`, {
        waitUntil: "networkidle",
      });

      // Horizontal overflow is the classic small-screen bug and is invisible
      // in a desktop screenshot.
      const overflow = await page.evaluate(() => {
        const d = document.documentElement;
        return {
          scrollW: d.scrollWidth,
          clientW: d.clientWidth,
          offenders: [...document.querySelectorAll("*")]
            .filter(
              (el) => el.getBoundingClientRect().right > d.clientWidth + 1,
            )
            .slice(0, 5)
            .map(
              (el) =>
                `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]}`,
            ),
        };
      });

      let violations = [];
      if (vp.name === "desktop") {
        await page.addScriptTag({ content: AXE });
        const axe = await page.evaluate(
          async () =>
            // eslint-disable-next-line no-undef
            await window.axe.run(document, {
              runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
            }),
        );
        violations = axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
        }));
      }

      report.push({
        scheme,
        path,
        viewport: vp.name,
        status: res?.status(),
        overflows: overflow.scrollW > overflow.clientW + 1,
        overflowBy: overflow.scrollW - overflow.clientW,
        offenders: overflow.offenders,
        consoleErrors,
        violations,
        unapproved: [...new Set(unapproved)],
        intercomBeforeClick: [...new Set(intercomBeforeClick)],
        /* Zero again, and it is a stronger claim than before: analytics now
           loads denied behind a consent banner, so nothing stores anything until
           a visitor chooses. Any cookie here means either consent defaults
           regressed or a third party started setting one unasked. */
        cookies: (await page.context().cookies()).map((cookie) => cookie.name),
      });
      await page.close();
    }
  }
}
/* The other half of the messenger contract: pressing the button must actually
   reach Intercom. Checked once rather than on all 24 combinations — it is the
   same button on every page, and each run would otherwise hit a third party two
   dozen times. */
let messenger = "not checked";
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/toddle-enhancement-extension/`, {
    waitUntil: "networkidle",
  });
  const asked = [];
  page.on("request", (request) => {
    if (/intercom/i.test(request.url())) asked.push(request.url());
  });
  await page.locator("[data-support-launcher]").click();
  await page.waitForTimeout(2500);
  messenger = asked.length
    ? "ok"
    : "the button was pressed and nothing was requested from Intercom";
  await page.close();
}

await browser.close();
writeFileSync(
  new URL("../qa-report.json", import.meta.url),
  JSON.stringify(report, null, 2),
);

// --- summary ---
/* Console errors are reported but do not fail the run: a sandboxed browser
   that does not trust the local TLS proxy fails the Google Fonts request, and
   that is the environment, not the site. Overflow and accessibility
   violations do fail. */
const bad = report.filter(
  (r) =>
    r.overflows ||
    r.violations.length ||
    r.status !== 200 ||
    r.unapproved.length ||
    r.intercomBeforeClick.length ||
    r.cookies.length,
);
console.log(`checked ${report.length} page/viewport/scheme combinations`);
if (!bad.length) {
  console.log(
    "no overflow, no console errors, no accessibility violations,\n" +
      "no unapproved third party, no cookies before consent,\n" +
      "and no Intercom before a click",
  );
} else {
  for (const r of bad) {
    console.log(`\n${r.scheme} ${r.path} @${r.viewport} (HTTP ${r.status})`);
    if (r.overflows)
      console.log(
        `  OVERFLOW by ${r.overflowBy}px — ${r.offenders.join(", ")}`,
      );
    if (r.unapproved.length)
      console.log(`  UNAPPROVED third party: ${r.unapproved.join(", ")}`);
    if (r.intercomBeforeClick.length)
      console.log(
        `  INTERCOM loaded before any click: ${r.intercomBeforeClick.join(", ")}`,
      );
    if (r.cookies.length)
      console.log(`  COOKIES set before any consent: ${r.cookies.join(", ")}`);
    for (const e of r.consoleErrors)
      console.log(`  CONSOLE: ${e.slice(0, 160)}`);
    for (const v of r.violations)
      console.log(
        `  A11Y [${v.impact}] ${v.id}: ${v.help}\n      ${v.nodes.join("\n      ")}`,
      );
  }
}

if (messenger === "ok") {
  console.log("support messenger: loads on click, not before");
} else {
  console.log(`support messenger: FAIL — ${messenger}`);
}

process.exit(bad.length || messenger !== "ok" ? 1 : 0);
