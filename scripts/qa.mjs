/**
 * Browser QA: accessibility (axe-core) and layout across real viewports.
 *
 * The site has never been opened at phone width in this session, and nothing
 * in CI looks at rendered output — so this checks the two things a static-site
 * test suite cannot: does it pass an accessibility audit, and does it overflow
 * horizontally on a small screen.
 */
import { chromium } from "playwright";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

/** Where the built site is being served. `npm run qa` starts one for you. */
const BASE = process.env.QA_BASE_URL || "http://127.0.0.1:4173";

/** Chromium: CHROMIUM_PATH wins, else Playwright's own, else one on the box.
 *
 * Playwright's default is the headless shell, which a machine can be missing
 * even when it has a perfectly good Chromium — and a gate that cannot start is
 * a gate that gets skipped, which is how the last accessibility regression
 * would have reached production. So look for one before giving up. */
function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  try {
    const fallback = chromium.executablePath();
    if (existsSync(fallback)) return undefined; // let Playwright use its own
  } catch {
    /* no Playwright browser registered at all */
  }
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"];
  for (const root of roots.filter(Boolean)) {
    if (!existsSync(root)) continue;
    for (const entry of readdirSync(root).sort().reverse()) {
      for (const leaf of ["chrome-linux/chrome", "chrome-linux64/chrome"]) {
        const candidate = join(root, entry, leaf);
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return undefined;
}

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
      });
      await page.close();
    }
  }
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
  (r) => r.overflows || r.violations.length || r.status !== 200,
);
console.log(`checked ${report.length} page/viewport/scheme combinations`);
if (!bad.length) {
  console.log("no overflow, no console errors, no accessibility violations");
} else {
  for (const r of bad) {
    console.log(`\n${r.scheme} ${r.path} @${r.viewport} (HTTP ${r.status})`);
    if (r.overflows)
      console.log(
        `  OVERFLOW by ${r.overflowBy}px — ${r.offenders.join(", ")}`,
      );
    for (const e of r.consoleErrors)
      console.log(`  CONSOLE: ${e.slice(0, 160)}`);
    for (const v of r.violations)
      console.log(
        `  A11Y [${v.impact}] ${v.id}: ${v.help}\n      ${v.nodes.join("\n      ")}`,
      );
  }
}

process.exit(bad.length ? 1 : 0);
