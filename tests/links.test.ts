/**
 * The outbound links are most of what this site does, so a moved destination
 * should fail here rather than quietly 404 for a visitor.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

const siteData = read("src/data/site.ts");
const home = read("src/pages/index.astro");
const extensionPage = read("src/pages/toddle-enhancement-extension.astro");

describe("ecosystem destinations", () => {
  for (const url of [
    "https://bundu.org/education",
    "https://nyuchi.com/learning",
    "https://mukoko.com/lingo",
  ]) {
    it(`links to ${url}`, () => {
      expect(`${home}${siteData}`).toContain(url);
    });
  }

  it("does not link to the retired education.bundu.org subdomain", () => {
    expect(`${home}${siteData}`).not.toContain("education.bundu.org");
  });
});

describe("outbound links", () => {
  const sources = [siteData, home, extensionPage].join("\n");
  const urls = [...sources.matchAll(/https?:\/\/[^"'\s`)]+/g)].map(
    (match) => match[0],
  );

  it("finds links to check", () => {
    expect(urls.length).toBeGreaterThan(5);
  });

  it("uses HTTPS everywhere", () => {
    const insecure = urls.filter((url) => url.startsWith("http://"));
    expect(insecure, `these should be https: ${insecure.join(", ")}`).toEqual(
      [],
    );
  });

  /* A target="_blank" without rel=noopener hands the opened page a handle on
     this one. Nothing here opens in a new tab, but the rel is set anyway so
     adding one later cannot silently introduce the hole. */
  it("marks external links rel=noopener noreferrer", () => {
    const externalAnchors = [
      ...sources.matchAll(/<a\b[^>]*href=\{?["']?https?:[^>]*>/g),
    ].map((match) => match[0]);
    for (const anchor of externalAnchors) {
      expect(anchor, `missing rel on: ${anchor}`).toMatch(
        /rel="noopener noreferrer"/,
      );
    }
  });
});

describe("the extension page", () => {
  it("points at the extension repository", () => {
    expect(siteData).toContain(
      "https://github.com/nyuchi/toddle-enhancement-extension",
    );
  });

  it("links to the latest release and the deployment guide", () => {
    expect(extensionPage).toContain("toddleExtension.latestRelease");
    expect(extensionPage).toContain("toddleExtension.enterpriseGuide");
  });

  /* The privacy claim is the reason a school would adopt this, so the page must
     keep stating the limits next to it. */
  it("states what Present mode does not do", () => {
    expect(extensionPage).toContain("What it does not do");
  });
});
