/**
 * The two formatters agree.
 *
 * The org runs two required gates over this repo: its lint gate runs Prettier
 * with `.prettierrc`, and `vite-plus / check` runs `vp fmt --check` with the
 * `fmt` block in vite.config.ts. Two formatters with different settings on one
 * file can never both pass, so the settings must match. This fails the moment
 * one is edited without the other, instead of a pull request going red on
 * whichever gate runs second.
 */
import { describe, expect, it } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../vite.config";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const prettier = JSON.parse(readFileSync(join(root, ".prettierrc"), "utf8"));

describe("formatting", () => {
  it("gives Prettier and vp fmt the same settings", () => {
    /* sortPackageJson is Oxfmt's alone (Prettier never sorts), and is off. */
    const { sortPackageJson, ...fmt } = (
      config as { fmt: Record<string, unknown> }
    ).fmt;
    expect(sortPackageJson).toBe(false);
    expect(fmt).toEqual(prettier);
  });
});
