/**
 * Defensive checks on the page shell.
 *
 * The site has no auth, no API endpoints and no analytics. If any of those
 * start sneaking in, these fail and force a deliberate review rather than a
 * quiet merge.
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

const layout = read("src/layouts/BaseLayout.astro");

/* Every component, not just the shell. The tracker check used to read
   BaseLayout alone, which was fine while the shell was the only place a third
   party could enter. It is not any more: the support messenger arrives as a
   component, and a check that only reads the layout would have let it — or
   anything else — in silently. Read the whole tree instead. */
const componentSources = readdirSync(join(root, "src/components"))
  .filter((entry) => entry.endsWith(".astro"))
  .map((entry) => read(join("src/components", entry)));
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

  it("declares the security headers via vercel.json", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const keys =
      vercel.headers?.[0]?.headers?.map(
        (header: { key: string }) => header.key,
      ) ?? [];
    for (const key of [
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Content-Security-Policy",
    ]) {
      expect(keys, `missing ${key}`).toContain(key);
    }
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
    for (const source of [...pages, layout, ...componentSources]) {
      for (const tracker of trackers) {
        expect(source, `matched ${tracker}`).not.toMatch(tracker);
      }
    }
  });
});

/* The support messenger is the one third party on this site, and it is allowed
   here on one condition: it does not load until a visitor asks for it. That is
   what lets the privacy policy still say this website sets no cookies unless
   you open the messenger, and it is a property of the source that is easy to
   destroy by accident — moving the loader out of the click handler, or adding
   the stock Intercom snippet next to it, would boot Intercom on every visit and
   nothing would look broken. So it is asserted rather than trusted. */
describe("support messenger", () => {
  const widget = read("src/components/SupportWidget.astro");

  it("loads Intercom only from inside a click handler", () => {
    expect(widget).toContain("widget.intercom.io/widget/");

    /* What matters is where the loader is CALLED, not where it is declared —
       declaring it above the handler is ordinary hoisting and says nothing. So
       find every call site that is not the declaration and require each one to
       come after the click listener opens. */
    const clickHandler = widget.indexOf('addEventListener("click"');
    expect(clickHandler, "no click handler at all").toBeGreaterThan(-1);

    const callSites = [...widget.matchAll(/(\w*)\s*loadIntercom\s*\(/g)].filter(
      (match) => match[1] !== "function",
    );
    expect(callSites.length, "loadIntercom is never called").toBeGreaterThan(0);
    for (const call of callSites) {
      expect(
        call.index,
        `loadIntercom is called at ${call.index}, before the click handler at ${clickHandler} — it may be loading on page load`,
      ).toBeGreaterThan(clickHandler);
    }
  });

  it("ships no eagerly-executing Intercom snippet", () => {
    /* Intercom's copy-paste snippet is an IIFE that appends the script
       immediately. If someone pastes it in beside this component, the widget
       still looks click-to-load while Intercom boots on arrival. */
    expect(widget).not.toMatch(
      /<script[^>]*\bsrc=["']https:\/\/widget\.intercom\.io/i,
    );
    expect(widget).not.toMatch(
      /\(function\s*\(\s*\)\s*\{[\s\S]*intercomSettings/i,
    );
  });

  it("degrades to email when the messenger cannot load", () => {
    /* A support button that fails silently is worse than no button: the visitor
       believes they have been heard. */
    expect(widget).toContain("noscript");
    expect(widget).toMatch(/mailto:/);
  });

  it("is the only third-party host the CSP allows beyond fonts", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const csp: string = vercel.headers[0].headers.find(
      (header: { key: string }) => header.key === "Content-Security-Policy",
    ).value;
    const hosts = [
      ...csp.matchAll(/https?:\/\/([^\s;]+)|wss:\/\/([^\s;]+)/g),
    ].map((match) => match[1] ?? match[2]);
    const allowed =
      /(^|\.)intercom\.io$|(^|\.)intercomcdn\.com$|(^|\.)intercomcdn\.eu$|(^|\.)intercomassets\.com$|(^|\.)intercomusercontent\.com$|(^|\.)intercom-messenger\.com$|(^|\.)intercom-sheets\.com$|(^|\.)intercom-reporting\.com$|(^|\.)gstatic\.com$|(^|\.)googleapis\.com$/;
    for (const host of hosts) {
      expect(
        host.replace(/^\*\./, ""),
        `unexpected host in CSP: ${host}`,
      ).toMatch(allowed);
    }
  });
});
