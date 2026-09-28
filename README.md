# Nyuchi Learning

> [learning.nyuchi.com](https://learning.nyuchi.com) — the Nyuchi Learning
> surface, and the home of the classroom tools Nyuchi Web Services builds for
> schools.

[![Lint](https://github.com/nyuchi/learning/actions/workflows/lint.yml/badge.svg)](https://github.com/nyuchi/learning/actions/workflows/lint.yml)
[![build](https://github.com/nyuchi/learning/actions/workflows/build.yml/badge.svg)](https://github.com/nyuchi/learning/actions/workflows/build.yml)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)

**Version:** 3.0.0 | **Live:** [learning.nyuchi.com](https://learning.nyuchi.com) | **Default branch:** `master` | **Deploy:** Cloudflare Workers

---

## What it is

A small static Astro site with two pages:

| Route                           | What it does                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `/`                             | Points visitors at the three surfaces the learning content lives on, and at the tool they can use today. |
| `/toddle-enhancement-extension` | The product page for the Toddle Enhancement Extension.                                                   |

The redirect job has not gone away — the content split described in
[CHANGELOG.md](CHANGELOG.md) still holds — but this domain is now also where
the classroom software lives, so the site is no longer only a signpost.

## Design

Nothing here defines a colour, a font or a component class. All of it comes from
[`@bundu/ui`](https://www.npmjs.com/package/@bundu/ui), Nyuchi's implementation
of the [Mzizi](https://mzizi.dev) design system:

```css
/* src/styles/global.css */
@import "@bundu/ui/styles/globals.css";     /* seven minerals, semantic tokens, components */
@import "@bundu/ui/styles/brand-nyuchi.css"; /* gold primary + ring, as on nyuchi.com */
```

```js
/* tailwind.config.mjs */
presets: [preset]  /* @bundu/ui/tailwind-preset */
```

This is deliberate, and it is the second thing this repo got wrong before. The
previous version carried a hand-copied subset of the tokens with a comment
claiming they were verbatim; they were not, and the site drifted away from
nyuchi.com without anyone noticing. `tests/branding.test.ts` now fails the
build if a token is redefined locally.

If a colour looks wrong, it is wrong in `@bundu/ui` — fixing it there fixes
every Nyuchi surface at once.

## Hosting

Cloudflare Workers, serving `dist/` as static assets. There is **no Astro
adapter**: the site is fully static, so `astro build` emits `dist/`, wrangler
uploads it, and no Worker code runs per request. An SSR adapter would add a
worker invocation and a cold start to every page view of a site that has
nothing to compute.

```sh
npm run build      # → dist/
npm run preview    # build, then serve it locally through wrangler
npm run deploy     # build, then wrangler deploy
```

Configuration is `wrangler.jsonc`. Response headers, including the CSP, are in
`public/_headers` — it has to live in `public/` so it reaches the uploaded
assets, and a test asserts it ends up in `dist/`.

Deploys happen on merge to `master` via `.github/workflows/deploy.yml`, which
needs two repository secrets: `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID`.

## Local workflow

```sh
npm install
npm run dev          # http://localhost:4321 — hot reload
npm run check        # astro check (TypeScript across .astro files)
npm test             # vitest, then build, then the CSP hash check
npm run format       # prettier --write
npm run build        # produces .vercel/output for the Vercel adapter
npm run preview      # serve the built output locally
```

## Security headers

`public/_headers` carries a real Content-Security-Policy, not just the framing and
sniffing headers. `script-src` is `'self'` plus a hash for each inline script,
so nothing inline runs unless it was in the build that was reviewed.

There is exactly one inline script — the theme bootstrap, which has to run
before the first paint or the page flashes light before going dark. A hash
allowlist is only worth something if it cannot silently fall out of date, so
`npm test` verifies it:

```sh
npm run csp        # fail if a built inline script is not in the CSP
npm run csp:fix    # rewrite public/_headers with the current hashes, then review
```

Edit the bootstrap without running `csp:fix` and CI fails with the missing
hash, rather than the theme quietly breaking in production.

## Notes on the toolchain

- **Astro 7 with Tailwind 4.** `@bundu/ui@0.1.1` ships a Tailwind 3 style
  config, which Tailwind 4 consumes through `@config` — that is what makes
  `text-h2`, `ease-soft`, `max-w-narrow` and the mineral colours resolve, both
  as utilities here and inside the kit's own `@apply` rules. Verified in the
  build output: every component class, the full token set, and the `dark:`
  variants are all present.
- **`vitest` is pinned to `~4.0.18`.** `4.1.11` trips a resolver bug in npm
  10.9 (`Cannot read properties of null (reading 'edgesOut')`) and
  `npm install` cannot complete at all. This is why the advisory on vitest is
  reported rather than blocking in CI — see below.
- **`*.astro` is in `.prettierignore`.** The org lint gate runs Prettier from
  `nyuchi/.github`, which has no `prettier-plugin-astro`, so it cannot parse
  those files. They are still type-checked by `npm run check`.

## Dependency audit

CI splits the audit in two:

| Step                                        | Scope                          | Blocking                       |
| ------------------------------------------- | ------------------------------ | ------------------------------ |
| Audit what ships                            | `--omit=dev`, high and above   | yes — expected to stay at zero |
| Report advisories in build and test tooling | everything, moderate and above | no                             |

The split exists because of one specific, temporary situation: every published
vitest up to `4.1.10` carries an advisory, and `4.1.11` — the fix — cannot be
installed under npm 10.9. Blocking on it would pin the job red indefinitely,
which teaches people to ignore a red audit. Surfacing it in the log keeps it
visible without that cost. The second step goes back to blocking as soon as
vitest `4.1.11` installs cleanly.

## Repo layout

```
src/
  data/site.ts                        nav, footer, wordmark, extension links
  layouts/BaseLayout.astro            head, theme bootstrap, header + footer
  components/                         Wordmark, SiteHeader, SiteFooter, MineralStrip
  pages/index.astro                   the home page
  pages/toddle-enhancement-extension.astro
  styles/global.css                   @bundu/ui imports and nothing else
scripts/check-csp.mjs                 CSP hash verification
tests/                                links, branding, security
```

## Licence

See [LICENSE](LICENSE) if present; otherwise all rights reserved by Nyuchi
Africa.
