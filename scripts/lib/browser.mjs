/**
 * Find a Chromium the local machine will actually launch.
 *
 * Playwright's default is the headless shell, which a machine can be missing
 * even when it has a perfectly good Chromium — and a gate that cannot start is
 * a gate that gets skipped, which is how an accessibility regression reaches
 * production. So look for one before giving up.
 *
 * This lives here because two scripts need it and browser discovery is exactly
 * the thing that breaks per-machine: with a copy in each, whoever adds a search
 * root or a macOS path fixes one and silently leaves the other broken.
 *
 * Returns a path, or undefined to mean "let Playwright use its own".
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const LEAVES = ["chrome-linux/chrome", "chrome-linux64/chrome"];

export function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;

  try {
    if (existsSync(chromium.executablePath())) return undefined;
  } catch {
    /* no Playwright browser registered at all */
  }

  for (const root of [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    "/opt/pw-browsers",
  ]) {
    if (!root || !existsSync(root)) continue;
    for (const entry of readdirSync(root).sort().reverse()) {
      for (const leaf of LEAVES) {
        const candidate = join(root, entry, leaf);
        if (existsSync(candidate)) return candidate;
      }
    }
  }

  return undefined;
}
