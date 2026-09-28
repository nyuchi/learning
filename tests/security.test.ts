/**
 * Defensive checks on the page shell.
 *
 * The site has no auth, no API endpoints and no analytics. If any of those
 * start sneaking in, these fail and force a deliberate review rather than a
 * quiet merge.
 */
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
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
     into the shell should be argued for in review, which is what this asserts.

     The shape of the pattern is load-bearing, not habit. HTML tag names are
     case-insensitive, and an end tag may carry whitespace and even bogus
     attributes before the ">" — `</script\t\n bar>` is valid. A tighter
     pattern would skip such a block and this assertion would pass while
     missing the very thing it exists to read. */
  it("has exactly one inline script, and it is the theme bootstrap", () => {
    const inline = [
      ...layout.matchAll(
        /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script[^>]*>/gi,
      ),
    ].map((match) => match[1]);
    expect(inline).toHaveLength(2); // the is:inline bootstrap, and the bundled toggle
    const [bootstrap] = inline;
    expect(bootstrap).toContain("prefers-color-scheme");
    expect(bootstrap).toContain("classList.toggle");
  });

  it("makes no network calls from the shell's scripts", () => {
    const inline = [
      ...layout.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script[^>]*>/gi),
    ]
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

  it("declares the security headers in public/_headers", () => {
    const headers = read("public/_headers");
    for (const key of [
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Content-Security-Policy",
    ]) {
      expect(headers, `missing ${key}`).toMatch(
        new RegExp(`^\\s*${key}:`, "m"),
      );
    }
  });

  /* Cloudflare serves _headers only if it reaches the uploaded assets, and it
     does that by sitting in public/, which Astro copies verbatim. A rule that
     never ships is worse than no rule, because the policy still reads as if it
     were enforced.

     `npm test` builds before it runs vitest so this sees a fresh dist/. */
  it("ships _headers into the build output", () => {
    expect(
      existsSync(join(root, "public", "_headers")),
      "_headers must live in public/ to be copied into the build",
    ).toBe(true);
    expect(
      existsSync(join(root, "dist", "_headers")),
      "run `npm run build` first — _headers did not reach dist/",
    ).toBe(true);
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

  /* Matched as the host or global a tracker actually appears as, not as a bare
     substring. "segment" alone also matches the word segment in a comment, and
     a security check that cries wolf is one that gets deleted. */
  it("contain no analytics or tracking scripts", () => {
    const trackers = [
      /googletagmanager\.com/,
      /google-analytics\.com/,
      /\bgtag\s*\(/,
      /\bdataLayer\b/,
      /plausible\.io/,
      /usefathom\.com/,
      /cdn\.segment\.com/,
      /\banalytics\.(load|track|page)\s*\(/,
      /mixpanel/,
      /hotjar/,
      /clarity\.ms/,
      /posthog/,
    ];
    for (const source of [...pages, layout]) {
      for (const tracker of trackers) {
        expect(source, `matched ${tracker}`).not.toMatch(tracker);
      }
    }
  });
});
