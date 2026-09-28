/**
 * SEO and agent-readiness.
 *
 * These pages are read by search crawlers and by assistants answering "is this
 * safe for our school?". A missing canonical or a stale llms.txt is the kind
 * of regression nobody notices until the answer being given about the product
 * is wrong.
 */
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative: string) => readFileSync(join(root, relative), "utf8");
const built = (relative: string) => read(join("dist", relative));

const PAGES = [
  "index.html",
  "toddle-enhancement-extension/index.html",
  "legal/privacy/index.html",
  "legal/terms/index.html",
];

describe("every page", () => {
  for (const page of PAGES) {
    describe(page, () => {
      const html = built(page);

      it("has a canonical URL on the production host", () => {
        const match = /<link rel="canonical" href="([^"]+)"/.exec(html);
        expect(match?.[1]).toMatch(/^https:\/\/learning\.nyuchi\.com/);
      });

      it("has a title and a description", () => {
        expect(/<title>[^<]{10,}<\/title>/.test(html)).toBe(true);
        expect(/<meta name="description" content="[^"]{50,}"/.test(html)).toBe(
          true,
        );
      });

      it("emits a valid JSON-LD graph", () => {
        const match =
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(
            html,
          );
        expect(match, "no JSON-LD found").toBeTruthy();
        const graph = JSON.parse(match![1]);
        expect(graph["@context"]).toBe("https://schema.org");
        const types = graph["@graph"].map(
          (node: { "@type": string }) => node["@type"],
        );
        expect(types).toContain("Organization");
        expect(types).toContain("WebSite");
        expect(types).toContain("WebPage");
      });
    });
  }
});

describe("crawlers and assistants", () => {
  it("ships robots.txt pointing at the sitemap", () => {
    const robots = built("robots.txt");
    expect(robots).toContain(
      "Sitemap: https://learning.nyuchi.com/sitemap-index.xml",
    );
  });

  it("ships a sitemap listing every page", () => {
    expect(existsSync(join(root, "dist", "sitemap-index.xml"))).toBe(true);
    const sitemap = built("sitemap-0.xml");
    for (const path of [
      "https://learning.nyuchi.com/",
      "https://learning.nyuchi.com/toddle-enhancement-extension",
      "https://learning.nyuchi.com/legal/privacy",
      "https://learning.nyuchi.com/legal/terms",
    ]) {
      expect(sitemap, `sitemap is missing ${path}`).toContain(path);
    }
  });

  it("ships llms.txt describing the product accurately", () => {
    const llms = built("llms.txt");
    expect(llms.startsWith("# Nyuchi Learning")).toBe(true);
    // The two claims most likely to be repeated back by an assistant.
    expect(llms).toContain("It hides flags, not names");
    expect(llms).toContain("transmits nothing");
  });
});

describe("the footer is the canonical navigation", () => {
  /* Every page must be reachable from the footer: it is the only navigation
     that appears on every page, so a page missing from it is a page only
     reachable by knowing the URL. */
  it("links to every page of the site", () => {
    const siteData = read("src/data/site.ts");
    for (const path of [
      "/toddle-enhancement-extension",
      "/legal/privacy",
      "/legal/terms",
    ]) {
      expect(siteData, `footer does not link to ${path}`).toContain(path);
    }
  });
});
