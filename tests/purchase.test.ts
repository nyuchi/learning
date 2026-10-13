/**
 * What a buyer is told happens after paying. The licence server emails a
 * one-time claim link, never the key (nyuchi-licence-server: src/claims.js,
 * CLAIM_TTL_S = 72 hours), so the page must not promise a key by email.
 */
import { describe, expect, it } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const page = readFileSync(
  join(root, "src/pages/toddle-enhancement-extension.astro"),
  "utf8",
);
/* The paragraph under the plans, as one line of text. */
const checkout = (() => {
  const at = page.indexOf("Checkout is through Buy Me a Coffee.");
  expect(at).toBeGreaterThan(-1);
  return page
    .slice(at, page.indexOf("</p>", at))
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ");
})();

describe("after paying", () => {
  it("says the email carries a one-time link, never the key", () => {
    expect(checkout).toContain(
      "one-time link to your licence, never the key itself",
    );
    expect(checkout).toContain("there is no key to copy");
    expect(page).not.toMatch(/licence key is emailed/);
  });

  it("says how long the link works, as the licence server does (72 hours)", () => {
    expect(checkout).toContain("The link works once, for 72 hours");
    expect(checkout).toContain("ask for a new one");
  });

  it("says how to use it, and how a school licence differs", () => {
    expect(checkout).toContain("Add it to Chrome");
    expect(checkout).toContain("Nyuchi console and Chrome policy");
  });
});
