/**
 * Defensive checks on the page shell.
 *
 * The site has no auth, no API endpoints and no analytics. If any of those
 * start sneaking in, these fail and force a deliberate review rather than a
 * quiet merge.
 */
import { describe, expect, it } from "vite-plus/test";
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
  /* One form, on purpose: feedback, posted to Formspree. Any other form — or
     this one pointed somewhere else — should be argued for in review. */
  it("contain exactly one <form>, the feedback form, posting to Formspree", () => {
    const forms = sources.filter(
      (file) => file.path.startsWith("src/pages/") && /<form\b/.test(file.text),
    );
    expect(forms.map((file) => file.path)).toEqual([
      "src/pages/feedback.astro",
    ]);
    expect(forms[0].text).toMatch(/action=\{feedback\.endpoint\}/);
    expect(read("src/data/site.ts")).toMatch(
      /endpoint: "https:\/\/formspree\.io\/f\/[a-z0-9]+"/,
    );
  });

  /* Matched as the host or global a tracker actually appears as, not as a bare
     substring. "segment" alone also matches the word segment in a comment, and
     a security check that cries wolf is one that gets deleted.

     Google Analytics is now here on purpose, and it is the ONLY one. It lives in
     exactly one file, which is the point of this assertion: the decision to
     measure visitors was made once, deliberately, and is reviewable in one
     place. A tracker appearing anywhere else — or a second one appearing beside
     GA in Analytics.astro — is not that decision, and fails here. */
  const ANALYTICS_COMPONENTS = [
    "src/components/Analytics.astro",
    "src/components/CookieBanner.astro",
  ];

  it("contain no analytics or tracking scripts beyond the approved one", () => {
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
    /* Only GA's own hosts and globals are excused, and only in its own file. */
    const APPROVED = [
      /googletagmanager\.com/,
      /google-analytics\.com/,
      /\bgtag\s*\(/,
      /\bdataLayer\b/,
    ];
    for (const file of sources) {
      const excused = ANALYTICS_COMPONENTS.includes(file.path)
        ? APPROVED
        : ([] as RegExp[]);
      for (const tracker of trackers) {
        if (excused.some((ok) => ok.source === tracker.source)) continue;
        expect(file.text, `${file.path} matched ${tracker}`).not.toMatch(
          tracker,
        );
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

  it("lets the CSP name no third-party host beyond the approved ones", () => {
    /* A tripwire, not a copy of the policy: it fails when a host nobody
       expected appears, whatever else changes. A list of suffixes rather than
       one alternation regex, because a missing (^|\.) in that regex silently
       widens the check it exists to narrow.

       Three groups, and each one earned its place in a commit: Google Fonts,
       the Intercom messenger, and Google Analytics. */
    const ALLOWED = [
      "googletagmanager.com",
      "google-analytics.com",
      "analytics.google.com",
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
      "formspree.io",
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

/* Consent. The privacy policy promises no analytics cookie until the visitor
   presses Accept, and that promise rests entirely on the ORDER of three inline
   scripts: deny, then load Google's tag, then configure. Reorder the head for an
   unrelated reason and the cookie starts appearing with nothing visibly broken
   and the policy quietly false.

   scripts/probe-consent.mjs proves the behaviour in a browser. This is the
   cheap CI-safe half: the defaults exist, they are all denied, and they come
   first. */
describe("consent", () => {
  const analytics = read("src/components/Analytics.astro");
  const banner = read("src/components/CookieBanner.astro");

  it("denies every storage signal by default", () => {
    const defaults = analytics.slice(analytics.indexOf("'consent', 'default'"));
    for (const signal of [
      "ad_storage",
      "ad_user_data",
      "ad_personalization",
      "analytics_storage",
    ]) {
      const declared = new RegExp(`${signal}:\\s*'denied'`).test(defaults);
      expect(declared, `${signal} is not denied by default`).toBe(true);
    }
  });

  it("sets the defaults before Google's tag is loaded", () => {
    const deny = analytics.indexOf("'consent', 'default'");
    const load = analytics.indexOf("googletagmanager.com/gtag/js");
    const config = analytics.indexOf("'config'");
    expect(deny).toBeGreaterThan(-1);
    expect(load).toBeGreaterThan(-1);
    expect(
      deny,
      "consent defaults are declared after the tag loads — GA could store before the visitor chooses",
    ).toBeLessThan(load);
    expect(load).toBeLessThan(config);
  });

  it("grants analytics_storage only, never the advertising signals", () => {
    /* This site runs no advertising, so the ad_* signals are denied permanently.
       A banner that grants them would be granting something with no purpose. */
    const updates = [
      ...banner.matchAll(/consent",\s*"update",\s*\{([^}]*)\}/g),
    ].map((match) => match[1]);
    expect(updates.length).toBeGreaterThan(0);
    for (const update of updates) {
      expect(update).toContain("analytics_storage");
      for (const ad of ["ad_storage", "ad_user_data", "ad_personalization"]) {
        expect(update, `banner grants ${ad}`).not.toContain(ad);
      }
    }
  });

  it("offers reject, accept and choose", () => {
    /* All, some, or none. A banner whose only real button is Accept is not
       consent, and one with no middle path is not granular. */
    for (const action of ["reject", "accept", "customise", "save"]) {
      expect(banner, `no ${action} action`).toMatch(
        new RegExp(`data-consent-action="${action}"`),
      );
    }
  });

  it("gives reject and accept the same styling class", () => {
    /* Equal prominence, enforced structurally: both take .consent-btn and
       .btn-primary, so they cannot drift apart by someone restyling one.
       scripts/probe-consent.mjs measures the rendered boxes as well. */
    const buttons = [
      ...banner.matchAll(
        /<button[^>]*data-consent-action="(reject|accept)"[^>]*>/g,
      ),
    ];
    expect(buttons.length).toBe(2);
    for (const [tag] of buttons) {
      expect(tag).toContain("btn-primary");
      expect(tag).toContain("consent-btn");
    }
  });

  it("pre-ticks nothing optional", () => {
    /* Every optional category must be declared without `checked`, so ignoring
       the banner lands where rejecting does. */
    const categories = read("src/data/consent.ts");
    expect(categories).toContain("required: false");
    /* The only checked/disabled input is the required one. */
    const checked = [...banner.matchAll(/checked=\{([^}]*)\}/g)].map(
      (m) => m[1],
    );
    for (const expression of checked) {
      expect(expression).toContain("category.required");
    }
  });

  it("records a version and a timestamp, not just a boolean", () => {
    /* All three regimes put the burden of demonstrating consent on us. */
    expect(banner).toMatch(/v: version/);
    expect(banner).toMatch(/at: new Date\(\)\.toISOString\(\)/);
  });

  it("declares a category only where something implements it", () => {
    /* A toggle that controls nothing is theatre, and an inaccurate notice is a
       worse position than a short one. Each optional category must be read by
       some component. */
    const categories = read("src/data/consent.ts");
    const ids = [...categories.matchAll(/id: "(\w+)"/g)].map(
      (match) => match[1],
    );
    expect(ids).toContain("analytics");
    expect(ids).toContain("support");
    expect(banner).toContain('granted("analytics")');
    expect(read("src/components/SupportWidget.astro")).toContain(
      "record.support",
    );
  });

  it("lets the choice be withdrawn later", () => {
    expect(banner).toContain("cookie-choices");
    expect(banner).toContain("reopen");
  });
});
