/**
 * Branding guards.
 *
 * Two things this repo has got wrong before: a lowercase wordmark, and a local
 * copy of the design tokens that then drifted away from nyuchi.com. Both are
 * the kind of regression a reviewer skims past, so they are asserted instead.
 */
import { describe, expect, it } from "vite-plus/test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = join(directory, entry);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

describe("wordmark", () => {
  it("is capitalised in the site data", () => {
    const siteData = read("src/data/site.ts");
    expect(siteData).toContain('wordmark: "Nyuchi Learning"');
  });

  it("is never written in lowercase anywhere in src", () => {
    const offenders = walk(join(root, "src"))
      .filter((file) => /\.(astro|ts|css)$/.test(file))
      .filter((file) =>
        /nyuchi (learning|africa)/.test(readFileSync(file, "utf8")),
      );
    expect(offenders, `lowercase wordmark in: ${offenders.join(", ")}`).toEqual(
      [],
    );
  });
});

describe("design tokens", () => {
  const globalCss = read("src/styles/global.css");

  it("imports the tokens from @bundu/ui rather than copying them", () => {
    expect(globalCss).toContain('@import "@bundu/ui/styles/globals.css"');
    expect(globalCss).toContain('@import "@bundu/ui/styles/brand-nyuchi.css"');
  });

  it("applies the brand overlay after the base tokens", () => {
    expect(globalCss.indexOf("brand-nyuchi.css")).toBeGreaterThan(
      globalCss.indexOf("globals.css"),
    );
  });

  /* A redefinition here is how the site drifted last time: it looks harmless in
     a diff and silently stops tracking nyuchi.com. */
  it("does not redefine any design token locally", () => {
    const declarations = [
      ...globalCss.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm),
    ].map((m) => m[1]);
    expect(
      declarations,
      `tokens redefined locally: ${declarations.join(", ")}`,
    ).toEqual([]);
  });

  it("builds Tailwind from the @bundu/ui preset", () => {
    const config = read("tailwind.config.mjs");
    expect(config).toContain('from "@bundu/ui/tailwind-preset"');
    expect(config).toContain("presets: [preset]");
  });
});
