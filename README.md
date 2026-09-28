# Nyuchi Learning

> [learning.nyuchi.com](https://learning.nyuchi.com) — the Nyuchi Learning
> surface, and the home of the classroom tools Nyuchi Web Services builds for
> schools.

[![Lint](https://github.com/nyuchi/learning/actions/workflows/lint.yml/badge.svg)](https://github.com/nyuchi/learning/actions/workflows/lint.yml)
[![build](https://github.com/nyuchi/learning/actions/workflows/build.yml/badge.svg)](https://github.com/nyuchi/learning/actions/workflows/build.yml)
![Astro](https://img.shields.io/badge/Astro-5-BC52EE?style=flat-square&logo=astro&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat-square&logo=vercel&logoColor=white)

**Version:** 3.0.0 | **Live:** [learning.nyuchi.com](https://learning.nyuchi.com) | **Default branch:** `master` | **Deploy:** Vercel

---

## What it is

A small static Astro site with two pages:

| Route                           | What it does                                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `/`                             | Points visitors at the three surfaces the learning content lives on, and at the tool they can use today.         |
| `/toddle-enhancement-extension` | The product page for the [Toddle Enhancement Extension](https://github.com/nyuchi/toddle-enhancement-extension). |

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

`vercel.json` carries a real Content-Security-Policy, not just the framing and
sniffing headers. `script-src` is `'self'` plus a hash for each inline script,
so nothing inline runs unless it was in the build that was reviewed.

There is exactly one inline script — the theme bootstrap, which has to run
before the first paint or the page flashes light before going dark. A hash
allowlist is only worth something if it cannot silently fall out of date, so
`npm test` verifies it:

```sh
npm run csp        # fail if a built inline script is not in the CSP
npm run csp:fix    # rewrite vercel.json with the current hashes, then review
```

Edit the bootstrap without running `csp:fix` and CI fails with the missing
hash, rather than the theme quietly breaking in production.

## Notes on the toolchain

- **Astro 5, not 7.** `@bundu/ui@0.1.1` ships Tailwind 3 syntax and a Tailwind 3
  `presets` config, and `@astrojs/tailwind` supports Astro ≤ 5. When the kit
  ships a Tailwind 4 build, this can move up.
- **`postcss-import` runs before `tailwindcss`.** Without it, the `@layer
components` blocks inside the imported `globals.css` are dropped and every
  `.btn-primary` / `.card` / `.eyebrow` silently disappears from the build.
- **`vitest` is pinned to `~4.0.18`.** `4.1.11` trips a resolver bug in npm
  10.9 (`Cannot read properties of null (reading 'edgesOut')`) and `npm install`
  cannot complete.
- **`*.astro` is in `.prettierignore`.** The org lint gate runs Prettier from
  `nyuchi/.github`, which has no `prettier-plugin-astro`, so it cannot parse
  those files. They are still type-checked by `npm run check`.

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
