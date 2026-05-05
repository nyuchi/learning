/**
 * Defensive checks on the page shell.
 *
 * The site has no auth, no forms, no API endpoints, and no analytics.
 * If any of those start sneaking in via app.html or +page.svelte, these
 * tests fail and force a deliberate review.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

function read(relative: string): string {
  return readFileSync(join(root, relative), "utf8");
}

const appHtml = read("src/app.html");
const pageSource = read("src/routes/+page.svelte");

describe("app shell", () => {
  it("has no inline <script> blocks", () => {
    expect(appHtml).not.toMatch(/<script\b[^>]*>[^<]+<\/script>/);
  });

  it("only loads stylesheets from Google Fonts", () => {
    const stylesheetHrefs = [
      ...appHtml.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g),
      ...appHtml.matchAll(/<link[^>]+href="([^"]+)"[^>]+rel="stylesheet"/g),
    ].map((m) => m[1]);

    for (const href of stylesheetHrefs) {
      expect(href.startsWith("https://fonts.googleapis.com/")).toBe(true);
    }
  });

  it("declares the security headers via vercel.json", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const headerKeys =
      vercel.headers?.[0]?.headers?.map((h: { key: string }) => h.key) ?? [];
    expect(headerKeys).toContain("X-Content-Type-Options");
    expect(headerKeys).toContain("X-Frame-Options");
  });
});

describe("page", () => {
  it("contains no <form> elements", () => {
    expect(pageSource).not.toMatch(/<form\b/);
  });

  it("contains no analytics or tracking scripts", () => {
    const trackers = [
      "googletagmanager",
      "google-analytics",
      "gtag",
      "plausible",
      "fathom",
      "mixpanel",
      "segment",
    ];
    for (const t of trackers) {
      expect(pageSource.toLowerCase()).not.toContain(t);
    }
  });
});
