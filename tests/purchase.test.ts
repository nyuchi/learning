/**
 * What a buyer is told happens after paying. Since extension 0.12.0 the
 * licence server emails a one-time claim link, never the key (the
 * extension's src/lib/claim.ts and CHANGELOG 0.12.0: once, for 72 hours),
 * so no page may promise a key by email. Restores #89, held back by #94
 * until 0.12.0 was on the Chrome Web Store.
 */
import { describe, expect, it } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const page = read("src/pages/toddle-enhancement-extension.astro");
const pricing = read("src/components/ExtensionPricing.astro");

/** The text from `start` to the end of its paragraph, as one line. */
const paragraph = (source: string, start: string) => {
  const at = source.indexOf(start);
  expect(at, start).toBeGreaterThan(-1);
  return (
    source
      .slice(at, source.indexOf("</p>", at))
      .replace(/<[^>]+>/g, "")
      // Drop any "<" a nested or broken tag left behind, so no tag can
      // survive the strip (CodeQL js/incomplete-multi-character-sanitization).
      .replace(/</g, "")
      .replace(/\s+/g, " ")
  );
};
const afterPaying = paragraph(page, "After paying.");
const checkout = paragraph(pricing, "Checkout is through Buy Me a Coffee.");

describe("after paying", () => {
  it("says the email carries a one-time link, never the key", () => {
    expect(afterPaying).toContain(
      "one-time link to your licence, never the key itself",
    );
    expect(afterPaying).toContain("there is no key to copy");
    expect(checkout).toContain(
      "one-time link to your licence, never the key itself",
    );
    for (const source of [page, pricing]) {
      expect(source).not.toMatch(/key (is emailed|arrives by email)/);
    }
  });

  it("says how long the link works, as the extension does (72 hours)", () => {
    expect(afterPaying).toContain("The link works once, for 72 hours");
    expect(afterPaying).toContain("ask for a new one");
  });

  it("says how to use it, and how a school licence differs", () => {
    expect(afterPaying).toContain("Add it to Chrome");
    expect(checkout).toContain("Add it to Chrome");
    expect(afterPaying).toContain("Nyuchi console and Chrome policy");
  });
});
