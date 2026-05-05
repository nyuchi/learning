/**
 * Verifies the redirect-target URLs in the one-pager point at the right
 * domains in the right shape.
 *
 * If a redirect target moves (e.g. Bundu Education relocates), this test
 * fails until the page is updated — the destination cards are the only
 * thing this site actually does.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pageSource = readFileSync(
  join(here, "..", "src", "routes", "+page.svelte"),
  "utf8",
);

const expectedTargets = [
  "https://bundu.org/education",
  "https://nyuchi.com/learning",
  "https://mukoko.com/lingo",
];

describe("redirect targets", () => {
  for (const url of expectedTargets) {
    it(`links to ${url}`, () => {
      expect(pageSource).toContain(url);
    });
  }

  it("uses HTTPS for every project link", () => {
    const matches = pageSource.match(/href:\s*"([^"]+)"/g) ?? [];
    const urls = matches.map((m) => m.replace(/href:\s*"|"/g, ""));
    const externals = urls.filter((u) => u.startsWith("http"));
    expect(externals.length).toBeGreaterThan(0);
    for (const u of externals) {
      expect(u.startsWith("https://"), `${u} should be HTTPS`).toBe(true);
    }
  });

  it("does not link to the retired education.bundu.org subdomain", () => {
    expect(pageSource).not.toContain("education.bundu.org");
  });
});
