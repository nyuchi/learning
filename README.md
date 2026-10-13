# Nyuchi Learning

> [learning.nyuchi.com](https://learning.nyuchi.com) — the Nyuchi Learning
> surface, and the home of the classroom tools Nyuchi Web Services builds for
> schools.

[![build](https://github.com/nyuchi/learning/actions/workflows/build.yml/badge.svg)](https://github.com/nyuchi/learning/actions/workflows/build.yml)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat-square&logo=vercel&logoColor=white)

**Version:** the latest git tag (see [CHANGELOG.md](CHANGELOG.md)) | **Live:** [learning.nyuchi.com](https://learning.nyuchi.com) | **Work lands on:** `staging` | **Production:** `main` | **Deploy:** Vercel

---

## What it is

A small static Astro site:

| Route                                    | What it does                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`                                      | Points visitors at the three surfaces the learning content lives on, and at the tool they can use today.  |
| `/toddle-enhancement-extension`          | The product page for the Toddle Enhancement Extension.                                                    |
| `/toddle-enhancement-extension/releases` | The extension's release notes, for teachers, from `src/data/releases.ts`.                                 |
| `/feedback`, `/feedback/thanks`          | The feedback form, posted to Formspree.                                                                   |
| `/legal/*`, `/accessibility`             | Privacy, cookies, terms, data handling, student privacy, security and the rest, from `src/data/legal.ts`. |

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

Vercel. The site is fully static — every page is known at build time, so
nothing renders per request.

Work goes to `staging` by pull request, and each merge there is tagged as the
next patch (`.github/workflows/staging-version.yml`). A release is a pull
request from `staging` to `main`; production deploys from `main`, which is
tagged as the next minor with a GitHub release
(`.github/workflows/main-version.yml`). See [CHANGELOG.md](CHANGELOG.md).

Response headers, including the CSP, are declared in `vercel.json`.

## Local workflow

```sh
npm install
npm run dev            # http://localhost:4321 — hot reload
npm run check          # astro check (TypeScript across .astro files)
npm test               # build, then the tests (vp test), then the CSP hash check
npm run lint           # vp lint (oxlint, type-aware)
npm run format         # prettier --write; format:check is what CI runs
npm run fmt            # vp fmt; `vp fmt --check` is the org's vite-plus gate
npm run qa             # drive a real browser: accessibility + layout, 18 combinations
npm run consent:probe  # drive a real browser through the cookie banner
npm run csp:probe      # check the Intercom messenger against the CSP in a browser
npm run build          # produces .vercel/output for the Vercel adapter
npm run clean          # remove build output, caches and finished branches
```

## Security headers

`vercel.json` carries a real Content-Security-Policy, not just the framing and
sniffing headers. `script-src` is `'self'`, the hosts of the two third parties
(Google's analytics tag, after consent, and the Intercom messenger, when asked
for), and a hash for each inline script, so nothing inline runs unless it was
in the build that was reviewed.

The inline scripts are the theme bootstrap, which has to run before the first
paint or the page flashes light before going dark; the analytics consent check
in `Analytics.astro`, which loads Google's tag only after the visitor agrees;
and the small modules Astro inlines. A hash allowlist is only worth something
if it cannot silently fall out of date, so `npm test` verifies it:

```sh
npm run csp        # fail if a built inline script is not in the CSP
npm run csp:fix    # rewrite vercel.json with the current hashes, then review
```

Edit an inline script without running `csp:fix` and CI fails with the missing
hash, rather than the script quietly breaking in production.

## Notes on the toolchain

npm, Astro 7, Tailwind 4, Vite+ (`vp test`, `vp lint`, `vp fmt`), Prettier.
More in [docs/toolchain.md](docs/toolchain.md).

- **Astro 7 with Tailwind 4.** `@bundu/ui` ships a Tailwind 3 style preset,
  which Tailwind 4 consumes through `@config` — that is what makes `text-h2`,
  `ease-soft`, `max-w-narrow` and the mineral colours resolve, both as
  utilities here and inside the kit's own `@apply` rules.
- **`overrides` pins `path-to-regexp` to `^6.3.0`.** `@astrojs/vercel` pulls in
  a version with a high-severity advisory and there is no fixed release
  upstream; the override is within the same major, so it is a patch rather than
  a behaviour change.
- **Two formatters, one set of settings.** The org runs two required gates:
  a lint gate that runs Prettier, and `vite-plus / check`, which runs
  `vp fmt --check`. `.prettierrc` and the `fmt` block in `vite.config.ts` hold
  the same settings, and `tests/toolchain.test.ts` fails if they drift.
- **`*.astro` is in `.prettierignore`.** The org lint gate runs Prettier from
  `nyuchi/.github`, which has no `prettier-plugin-astro`, so it cannot parse
  those files. They are still type-checked by `npm run check`.

## Browser QA

`npm run qa` builds the site, serves it, and drives Chromium over every page at
phone, tablet and desktop width in both colour schemes. It runs axe-core
against WCAG 2.1 AA and checks for horizontal overflow, which is the classic
small-screen bug and is invisible in a desktop screenshot.

It is not in `npm test` because it needs a browser; run it before shipping a
visual change. A sandboxed browser that does not trust the local TLS proxy
fails the Google Fonts request — console errors are reported but do not fail
the run, for that reason. Overflow and accessibility violations do.

## Dependency audit

CI splits the audit in two:

| Step                                        | Scope                          | Blocking                       |
| ------------------------------------------- | ------------------------------ | ------------------------------ |
| Audit what ships                            | `--omit=dev`, high and above   | yes — expected to stay at zero |
| Report advisories in build and test tooling | everything, moderate and above | no                             |

The blocking step is `scripts/audit.mjs`: `npm audit --audit-level=high
--omit=dev`, with a dated list of advisories set aside by ID, each with the
reason it cannot reach a visitor and a date to recheck. Past that date the step
fails again. The second step keeps advisories in the tooling visible in the log
without pinning the job red over something that never ships.

## Repo layout

```
src/
  data/site.ts                        nav, footer, wordmark, extension links, analytics id
  data/legal.ts                       the facts the legal pages are built from
  data/consent.ts                     consent categories, storage key, version
  data/releases.ts                    the extension's release notes
  layouts/BaseLayout.astro            head, theme bootstrap, header + footer
  components/                         Wordmark, SiteHeader, SiteFooter, Analytics,
                                      CookieBanner, SupportWidget
  pages/                              home, the extension and its releases,
                                      feedback, accessibility, legal/*
  styles/global.css                   @bundu/ui imports and nothing else
public/llms.txt                       the site, summarised for language models
scripts/                              CSP check and fix, audit, browser QA and
                                      probes, clean
tests/                                links, branding, security, consent, SEO,
                                      toolchain
docs/toolchain.md                     how the tools fit together
```

## Licence

Proprietary. See [LICENSE](LICENSE).
