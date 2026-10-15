/**
 * Google Analytics loads only after consent — checked against the build.
 *
 * The privacy policy says the browser fetches nothing from Google Analytics
 * until the visitor agrees. tests/security.test.ts checks the source; this
 * checks what actually ships: no page carries Google's tag, and the one inline
 * script that can fetch it does so only for a stored yes from the current
 * banner. The script is run as built, in a small fake browser, so a change to
 * the check itself is caught here and not in production.
 *
 * Needs dist/ — `npm test` builds first.
 */
import { describe, expect, it } from "vite-plus/test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import {
  CONSENT_KEY,
  CONSENT_VERSION,
  LEGACY_CONSENT_KEY,
  parseConsent,
} from "../src/data/consent";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = join(directory, entry);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

const pages = walk(dist)
  .filter((file) => file.endsWith(".html"))
  .map((file) => ({ file, html: readFileSync(file, "utf8") }));

const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script[^>]*>/gi;

/** The inline script that holds the loader, exactly as the home page ships it. */
function analyticsScript(): string {
  const home = pages.find((page) => page.file === join(dist, "index.html"));
  const bodies = [...(home?.html ?? "").matchAll(SCRIPT)]
    .filter(([, attrs]) => !/\bsrc=/.test(attrs))
    .map(([, , body]) => body)
    .filter((body) => body.includes("window.nyuchiAnalytics = {"));
  expect(bodies).toHaveLength(1);
  return bodies[0];
}

/** Run the analytics script against the given storage; report what it did. */
function run(storage: Record<string, string>) {
  const appended: { src: string }[] = [];
  const document = {
    querySelector: (selector: string) =>
      selector === "script[data-analytics-loader]" && appended.length
        ? appended[0]
        : null,
    createElement: () => ({
      src: "",
      async: false,
      setAttribute() {},
    }),
    head: {
      appendChild: (element: { src: string }) => appended.push(element),
    },
  };
  const localStorage = {
    getItem: (key: string) => (key in storage ? storage[key] : null),
  };
  const context: Record<string, unknown> = { document, localStorage };
  context.window = context;
  runInNewContext(analyticsScript(), context);
  const dataLayer = (context.dataLayer as ArrayLike<unknown>[]).map((entry) =>
    Array.from(entry),
  );
  return {
    appended,
    dataLayer,
    load: () =>
      (context.nyuchiAnalytics as { load: () => void } | undefined)?.load(),
  };
}

const record = (fields: Record<string, unknown>) =>
  JSON.stringify({
    at: "2026-10-13T00:00:00.000Z",
    necessary: true,
    ...fields,
  });

describe("Google Analytics before consent", () => {
  it("is not requested by any built page", () => {
    expect(pages.length).toBeGreaterThan(0);
    for (const { file, html } of pages) {
      const loaders = [...html.matchAll(SCRIPT)].filter(([, attrs]) =>
        /\bsrc=["']?[^"' >]*googletagmanager\.com/i.test(attrs),
      );
      expect(loaders, `${file} loads Google's tag eagerly`).toHaveLength(0);
      expect(html, `${file} preloads Google's tag`).not.toMatch(
        /<link\b[^>]*googletagmanager\.com/i,
      );
    }
  });

  it("is not loaded on a first visit", () => {
    expect(run({}).appended).toHaveLength(0);
  });

  it("is not loaded for a stored no", () => {
    const stored = record({ v: CONSENT_VERSION, analytics: false });
    expect(run({ [CONSENT_KEY]: stored }).appended).toHaveLength(0);
  });

  it("ignores a yes given to an older banner", () => {
    const stored = record({ v: CONSENT_VERSION - 1, analytics: true });
    expect(run({ [CONSENT_KEY]: stored }).appended).toHaveLength(0);
  });

  it("ignores a yes recorded without a version", () => {
    const stored = JSON.stringify({ analytics: true });
    expect(run({ [CONSENT_KEY]: stored }).appended).toHaveLength(0);
  });

  it("ignores the first banner's key", () => {
    expect(run({ [LEGACY_CONSENT_KEY]: "granted" }).appended).toHaveLength(0);
  });

  it("ignores malformed records", () => {
    for (const stored of [
      "{",
      "null",
      "true",
      "[]",
      '"granted"',
      record({ v: String(CONSENT_VERSION), analytics: true }),
      record({ v: CONSENT_VERSION, analytics: "true" }),
    ]) {
      expect(
        run({ [CONSENT_KEY]: stored }).appended,
        `loaded for ${stored}`,
      ).toHaveLength(0);
    }
  });
});

describe("Google Analytics after consent", () => {
  it("loads once, for a current yes, after the denied defaults", () => {
    const stored = record({ v: CONSENT_VERSION, analytics: true });
    const result = run({ [CONSENT_KEY]: stored });
    expect(result.appended).toHaveLength(1);
    expect(result.appended[0].src).toMatch(
      /^https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-/,
    );
    const consent = result.dataLayer.filter((entry) => entry[0] === "consent");
    expect(consent.map((entry) => entry[1])).toEqual(["default", "update"]);
    expect(consent[1][2]).toEqual({ analytics_storage: "granted" });
  });

  it("loads when the banner calls the loader, and only once", () => {
    /* The banner's path: no stored answer at page load, then Accept. */
    const result = run({});
    expect(result.appended).toHaveLength(0);
    result.load();
    result.load();
    expect(result.appended).toHaveLength(1);
  });
});

describe("parseConsent", () => {
  /* The banner and the support widget read consent through this. */
  it("accepts only a record from the current banner", () => {
    const current = record({ v: CONSENT_VERSION, analytics: true });
    expect(parseConsent(current)?.analytics).toBe(true);
    for (const stored of [
      null,
      "",
      "{",
      "null",
      "[]",
      "42",
      record({ v: CONSENT_VERSION - 1, analytics: true }),
      record({ v: CONSENT_VERSION + 1, analytics: true }),
      JSON.stringify({ analytics: true, support: true }),
    ]) {
      expect(parseConsent(stored), `accepted ${stored}`).toBeNull();
    }
  });
});
