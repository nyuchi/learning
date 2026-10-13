# Toolchain

npm, Astro 7, Tailwind 4, Vite+ and Prettier. Deploys to Vercel.

## What runs what

| Command                 | Tool                               | Where it runs                      |
| ----------------------- | ---------------------------------- | ---------------------------------- |
| `npm run check`         | `astro check`                      | `build` workflow, `vite-plus` gate |
| `npm test`              | `astro build`, `vp test run`, CSP  | `build` workflow                   |
| `npm run lint`          | `vp lint` (oxlint, type-aware)     | locally                            |
| `npm run format:check`  | Prettier with `.prettierrc`        | the org lint gate                  |
| `npm run ci:check`      | `astro check` and `vp fmt --check` | the org `vite-plus / check` gate   |
| `npm run qa`            | Playwright and axe-core, Chromium  | locally, before a visual change    |
| `npm run consent:probe` | Playwright, Chromium               | locally, before a consent change   |

The `build` workflow is this repo's own (`.github/workflows/build.yml`). The
lint gate and the `vite-plus` gate are reusable workflows in `nyuchi/.github`
that this repo does not control.

## Vite+

`vite-plus` 1.0 is a dev dependency and npm installs it; CI and Vercel both
install with `npm ci`. It replaced `vitest` (tests import from
`vite-plus/test`), and `vite.config.ts` carries the test settings, type-aware
linting and the org's format settings. Astro does not read `vite.config.ts`;
it builds with its own Vite config from `astro.config.mjs`, so nothing there
can change the site.

`vp check` would run lint, format and type checks in one, but the
`vite-plus / check` gate runs the transitional `ci:check` instead, because
`vp check` reports one type error in `astro.config.mjs` (a `Date` assigned to
the sitemap's string `lastmod`). That is site config, left for its own change.

## Two formatters

Prettier and Vite+'s formatter (Oxfmt, through `vp fmt`) both format this
repo, because both org gates are required: the lint gate runs Prettier, and
the `vite-plus` gate runs `vp fmt --check`. Dropping either would fail a gate
this repo cannot change, so both stay, with one set of settings:

- `.prettierrc` mirrors the org's Prettier config, and the lint gate needs it;
- the `fmt` block in `vite.config.ts` mirrors `nyuchi/.github`'s
  `.oxfmtrc.json` (`vp fmt` reads only that block);
- `tests/toolchain.test.ts` fails if the two differ.

Edit one, edit the other in the same change. If the org retires either gate,
remove that formatter's config and the test with it.

`*.astro` stays in `.prettierignore`: the org lint gate runs Prettier without
`prettier-plugin-astro`, so it cannot parse those files. `npm run check`
type-checks them.
