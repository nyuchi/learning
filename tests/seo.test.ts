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
  "legal/security/index.html",
  "legal/cookies/index.html",
  "legal/data/index.html",
  "legal/student-privacy/index.html",
  "legal/vulnerability-disclosure/index.html",
  "legal/notice/index.html",
  "accessibility/index.html",
  "feedback/index.html",
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

  it("ships a sitemap whose URLs are exactly the pages' canonicals", () => {
    expect(existsSync(join(root, "dist", "sitemap-index.xml"))).toBe(true);
    const sitemap = built("sitemap-0.xml");

    /* Compare the two SETS, not substrings.
     *
     * This assertion used to be a `toContain` per path, which passes when the
     * sitemap says `/legal/privacy/` and the page says `/legal/privacy` — the
     * canonical is a substring of the sitemap entry. That is exactly the bug it
     * existed to catch: Google follows the sitemap, reads a page declaring a
     * different canonical, and drops the URL as a duplicate. Nothing indexed,
     * and every check here was green.
     *
     * A set comparison cannot be satisfied by a prefix. */
    const inSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1])
      .sort();

    const canonicals = PAGES.map((page) => {
      const html = built(page);
      const found = html.match(/<link rel="canonical" href="([^"]+)"/);
      expect(found, `${page} declares no canonical`).not.toBeNull();
      return found![1];
    }).sort();

    expect(inSitemap).toEqual(canonicals);
  });

  it("keeps the feedback thank-you page out of search", () => {
    const thanks = built("feedback/thanks/index.html");
    expect(thanks).toContain('<meta name="robots" content="noindex">');
    expect(built("sitemap-0.xml")).not.toContain("/feedback/thanks");
  });

  it("gives every sitemap entry a lastmod", () => {
    /* Search Console reports its absence, and without it a crawler has no
       cheap signal that a page changed. */
    const sitemap = built("sitemap-0.xml");
    const locs = [...sitemap.matchAll(/<loc>/g)].length;
    const lastmods = [...sitemap.matchAll(/<lastmod>/g)].length;
    expect(lastmods).toBe(locs);
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
  const footer = built("index.html").split("<footer")[1] ?? "";

  it("links to every page of the site", () => {
    for (const page of PAGES) {
      const path = `/${page.replace(/\/?index\.html$/, "")}`;
      if (path === "/") continue;
      expect(footer, `footer does not link to ${path}`).toContain(
        `href="${path}"`,
      );
    }
  });

  it("says Nyuchi is not affiliated with Toddle", () => {
    expect(footer).toContain(
      "not affiliated with, endorsed by or sponsored by Toddle",
    );
  });
});

describe("llms.txt", () => {
  it("lists every legal page", () => {
    const llms = built("llms.txt");
    for (const page of PAGES.filter((p) => /^(legal|accessibility)/.test(p))) {
      const path = page.replace(/\/index\.html$/, "");
      expect(llms, `llms.txt does not list /${path}`).toContain(
        `https://learning.nyuchi.com/${path})`,
      );
    }
  });
});

describe("security.txt", () => {
  /* RFC 9116: Contact and Expires are required; an expired file is to be
     treated as stale, so it fails here a month before it lapses. */
  const text = built(".well-known/security.txt");
  const field = (name: string) =>
    new RegExp(`^${name}: (.+)$`, "m").exec(text)?.[1];

  it("is served from /.well-known with the required fields", () => {
    expect(field("Contact")).toBe("mailto:security@nyuchi.com");
    expect(field("Preferred-Languages")).toBe("en");
    expect(field("Canonical")).toBe(
      "https://learning.nyuchi.com/.well-known/security.txt",
    );
    expect(field("Policy")).toBe(
      "https://learning.nyuchi.com/legal/vulnerability-disclosure",
    );
  });

  it("has not expired, and will not for at least a month", () => {
    const expires = Date.parse(field("Expires") ?? "");
    expect(Number.isNaN(expires)).toBe(false);
    expect(expires - Date.now()).toBeGreaterThan(30 * 24 * 60 * 60 * 1000);
  });
});

describe("the security page", () => {
  /* Privacy and legal reviewers read this page instead of the extension's
     private repository, so the parts they will look for must be there. */
  const page = built("legal/security/index.html");

  it("states how to report a vulnerability and when we answer", () => {
    expect(page).toContain("mailto:security@nyuchi.com?subject=Security");
    expect(page).toContain("within 3 working days");
  });

  it("names the review, the release that fixed it, and the residual limit", () => {
    expect(page).toContain("1 October 2026");
    expect(page).toContain("0.8.2");
    expect(page).toContain("Content-Security-Policy");
  });

  it("is linked from the privacy policy and llms.txt", () => {
    expect(built("legal/privacy/index.html")).toContain(
      'href="/legal/security"',
    );
    expect(built("llms.txt")).toContain(
      "https://learning.nyuchi.com/legal/security",
    );
  });
});
