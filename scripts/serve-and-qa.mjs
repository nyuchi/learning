#!/usr/bin/env node
/**
 * Serve dist/ and run the browser QA against it.
 *
 * A tiny static server rather than a dependency: the QA needs real HTTP (a
 * file:// origin changes how the browser treats scripts and fonts) and this is
 * thirty lines against another package in the tree.
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

const qa = spawn(
  process.execPath,
  [join(dirname(fileURLToPath(import.meta.url)), "qa.mjs")],
  {
    stdio: "inherit",
    env: { ...process.env, QA_BASE_URL: `http://127.0.0.1:${PORT}` },
  },
);

qa.on("exit", (code) => {
  server.close();
  process.exit(code ?? 1);
});
