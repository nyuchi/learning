#!/usr/bin/env node
/**
 * Serve dist/ and run a browser script against it.
 *
 * A tiny static server rather than a dependency: a browser check needs real HTTP
 * (a file:// origin changes how the browser treats scripts and fonts) and this
 * is thirty lines against another package in the tree.
 *
 * Which script to run is an argument, defaulting to qa.mjs. It used to be
 * hardcoded, which meant the CSP probe — the one check that catches a hole all
 * the green checks miss — had no way to get a served dist/ and expected a server
 * somebody had started by hand. A check that takes two commands and a spare
 * terminal is a check nobody runs.
 *
 *   node scripts/serve-and-qa.mjs                          # qa.mjs
 *   node scripts/serve-and-qa.mjs probe-intercom-csp.mjs
 */
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = Number(process.env.QA_PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
};

async function resolveFile(pathname) {
  const candidates = [
    join(root, pathname),
    join(root, pathname, "index.html"),
    join(root, `${pathname}.html`),
  ];
  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      /* try the next shape */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(
    new URL(req.url, "http://localhost").pathname,
  );
  const file = await resolveFile(pathname);
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
    return;
  }
  res.writeHead(200, {
    "content-type": TYPES[extname(file)] || "application/octet-stream",
  });
  res.end(await readFile(file));
});

await new Promise((ready) => server.listen(PORT, "127.0.0.1", ready));

const script = process.argv[2] || "qa.mjs";
const base = `http://127.0.0.1:${PORT}`;

const child = spawn(
  process.execPath,
  [join(dirname(fileURLToPath(import.meta.url)), script)],
  {
    stdio: "inherit",
    /* Both variables, so the served origin reaches whichever script is run
       without each one having to know the other's name for it. */
    env: { ...process.env, QA_BASE_URL: base, PROBE_BASE_URL: base },
  },
);

child.on("exit", (code) => {
  server.close();
  process.exit(code ?? 1);
});
