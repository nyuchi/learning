/**
 * Defensive checks on the page shell.
 *
 * The site has no auth, no API endpoints and no analytics. If any of those
 * start sneaking in, these fail and force a deliberate review rather than a
 * quiet merge.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

const layout = read("src/layouts/BaseLayout.astro");
const pages = [
  "src/pages/index.astro",
  "src/pages/toddle-enhancement-extension.astro",
].map(read);

describe("app shell", () => {
  /* There is exactly one inline script: the theme bootstrap, which has to run
     before the first paint or the page flashes light. Anything else inlined
     into the shell should be argued for in review, which is what this asserts. */
  it("has exactly one inline script, and it is the theme bootstrap", () => {
    const inline = [
      ...layout.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g),
    ].map((match) => match[1]);
    expect(inline).toHaveLength(2); // the is:inline bootstrap, and the bundled toggle
    const [bootstrap] = inline;
    expect(bootstrap).toContain("prefers-color-scheme");
    expect(bootstrap).toContain("classList.toggle");
  });

  it("makes no network calls from the shell's scripts", () => {
    const inline = [...layout.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
      .map((match) => match[1])
      .join("\n");
    for (const forbidden of [
      "fetch(",
      "XMLHttpRequest",
      "navigator.sendBeacon",
      "import(",
    ]) {
      expect(inline).not.toContain(forbidden);
    }
  });

  it("only loads stylesheets from Google Fonts", () => {
    const hrefs = [
      ...layout.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g),
      ...layout.matchAll(/<link[^>]+href="([^"]+)"[^>]+rel="stylesheet"/g),
    ].map((match) => match[1]);

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith("https://fonts.googleapis.com/")).toBe(true);
    }
  });

  it("declares the security headers via vercel.json", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const keys =
      vercel.headers?.[0]?.headers?.map(
        (header: { key: string }) => header.key,
      ) ?? [];
    expect(keys).toContain("X-Content-Type-Options");
    expect(keys).toContain("X-Frame-Options");
    expect(keys).toContain("Referrer-Policy");
    expect(keys).toContain("Content-Security-Policy");
  });

  it("has a skip link ahead of the header", () => {
    expect(layout.indexOf('href="#main"')).toBeLessThan(
      layout.indexOf("<SiteHeader"),
    );
  });
});

describe("pages", () => {
  it("contain no <form> elements", () => {
    for (const page of pages) expect(page).not.toMatch(/<form\b/);
  });

  it("contain no analytics or tracking scripts", () => {
    const trackers = [
      "googletagmanager",
      "google-analytics",
      "gtag",
      "plausible",
      "fathom",
      "mixpanel",
      "segment",
      "hotjar",
    ];
    for (const page of [...pages, layout]) {
      for (const tracker of trackers) {
        expect(page.toLowerCase()).not.toContain(tracker);
      }
    }
  });
});
