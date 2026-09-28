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
import {
  policyHosts,
  readPolicy,
  readVercelConfig,
} from "../scripts/lib/csp.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

const layout = read("src/layouts/BaseLayout.astro");

/* Every source file under src/, not an enumerated list of directories.
   The tracker check used to read BaseLayout alone, which was fine while the
   shell was the only place a third party could enter. It is not any more — and
   an enumerated list is the same bug one directory later: the two legal pages
   were never scanned at all, and one of them now names a third party by design.
   Walk the tree, so the next arrival is caught wherever it lands. */
function walk(directory: string): string[] {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) return walk(path);
      return /\.(astro|ts|js)$/.test(entry.name) ? [path] : [];
    },
  );
}

const sources = walk("src").map((path) => ({ path, text: read(path) }));
const pages = sources
  .filter((file) => file.path.startsWith("src/pages/"))
  .map((file) => file.text);

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
    const vercel = readVercelConfig();
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
    for (const source of sources.map((file) => file.text)) {
      for (const tracker of trackers) {
        expect(source, `matched ${tracker}`).not.toMatch(tracker);
      }
    }
  });
});

/* The support messenger is the one third party on this site, and it is allowed
   here on one condition: it does not load until a visitor asks for it.

   That condition is a RUNTIME property, and scripts/qa.mjs is what proves it —
   it loads every page in Chromium and fails the run on any third-party request
   or any cookie before a click. What is left here is the part that is genuinely
   a property of the source, and cheap enough to run in CI without a browser. */
describe("support messenger", () => {
  const widget = read("src/components/SupportWidget.astro");

  it("ships no eagerly-executing Intercom snippet", () => {
    /* Intercom's copy-paste snippet is an IIFE that appends the script
       immediately. If someone pastes it in beside this component, the widget
       still looks click-to-load while Intercom boots on arrival — and unlike
       most regressions this one would pass a casual read of the diff. */
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

  it("takes the workspace id and support address from site data", () => {
    /* Both are facts kept in src/data/legal.ts. A literal here is a second copy
       that will not be updated with the first. */
    expect(widget).toContain("legal.support.intercomAppId");
    expect(widget).not.toMatch(/f1vga504|support@nyuchi\.com/);
  });

  it("is the only third-party host the CSP allows beyond fonts", () => {
    /* A tripwire, not a copy of the policy: it fails when a host nobody
       expected appears, whatever else changes. A list of suffixes rather than
       one alternation regex, because a missing (^|\.) in that regex silently
       widens the check it exists to narrow. */
    const ALLOWED = [
      "intercom.io",
      "intercomcdn.com",
      "intercomcdn.eu",
      "intercomassets.com",
      "intercomusercontent.com",
      "intercom-messenger.com",
      "intercom-sheets.com",
      "intercom-reporting.com",
      "gstatic.com",
      "googleapis.com",
    ];
    const hosts = policyHosts(readPolicy());
    expect(hosts.length).toBeGreaterThan(0);
    for (const host of hosts) {
      const ok = ALLOWED.some(
        (suffix) => host === suffix || host.endsWith(`.${suffix}`),
      );
      expect(ok, `unexpected host in CSP: ${host}`).toBe(true);
    }
  });
});
