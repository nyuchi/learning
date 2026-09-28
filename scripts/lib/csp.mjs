/**
 * The one place that knows where the Content-Security-Policy lives.
 *
 * Three separate readers had grown the same `vercel.headers[0].headers.find(…)`
 * walk, two of them unguarded. That positional assumption about vercel.json's
 * shape is exactly the kind of thing that breaks quietly: add a header block
 * ahead of the existing one and an unguarded reader either throws or, worse,
 * reads a policy that is not the deployed one — which for the CSP probe defeats
 * its entire purpose.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const VERCEL_PATH = join(
  resolve(dirname(fileURLToPath(import.meta.url)), "..", ".."),
  "vercel.json",
);

/** The whole parsed file, for a caller that needs to write it back. */
export function readVercelConfig(path = VERCEL_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

/** The CSP header object itself, so a caller can mutate `.value` and save. */
export function findCspHeader(vercel) {
  for (const block of vercel.headers ?? []) {
    const header = (block.headers ?? []).find(
      (candidate) => candidate.key === "Content-Security-Policy",
    );
    if (header) return header;
  }
  return null;
}

/** The policy string. Throws rather than returning a policy nobody declared. */
export function readPolicy(path = VERCEL_PATH) {
  const header = findCspHeader(readVercelConfig(path));
  if (!header)
    throw new Error("vercel.json declares no Content-Security-Policy");
  return header.value;
}

export function writeVercelConfig(vercel, path = VERCEL_PATH) {
  writeFileSync(path, `${JSON.stringify(vercel, null, 2)}\n`);
}

/** Every host the policy names, deduplicated, with any `*.` prefix stripped. */
export function policyHosts(policy) {
  return [
    ...new Set(
      [...policy.matchAll(/(?:https?|wss):\/\/([^\s;]+)/g)].map((match) =>
        match[1].replace(/^\*\./, ""),
      ),
    ),
  ];
}
