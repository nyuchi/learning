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

`vite-plus` 1.4 is a dev dependency and npm installs it; CI and Vercel both
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

## Before a commit, and in the editor

`.githooks/pre-commit` (turned on by `npm ci`, through `prepare`) runs
`scripts/pre-commit.mjs`: both formatters as the org gates run them, when a
file they format is staged; `vp lint --deny-warnings` when a script is staged;
and Semgrep (`p/default`) on the staged files when `semgrep` is installed,
failing only on findings on lines the commit changes. Without Semgrep, or
offline, the hook says so and carries on. It is the same hook as
`toddle-enhancement-extension`'s, with that repo's security tests swapped for
the formatters. `git commit --no-verify` skips it; CI runs everything again.

`.vscode/extensions.json` recommends the editor's half of the same checks:
Astro, Oxc (Vite+'s lint and format), Prettier, Semgrep, SonarQube for IDE,
EditorConfig and markdownlint. SonarQube for IDE runs without a
`sonar-project.properties`, which is only needed for connected mode.

## Security checks in CI

- **Dependency audit:** the `audit` job in `build.yml` (README, "Dependency
  audit").
- **Dependency review:** on every pull request,
  `actions/dependency-review-action` fails a change that adds or updates a
  dependency with a known high or critical advisory. It is the step the org's
  `reusable-dependency-review.yml` runs, called directly because that
  workflow cannot set an advisory aside, and GitHub's dependency graph reads
  Vite+'s aliased core (`vite` → `@voidzero-dev/vite-plus-core`) as Vite 1.4.0.
  `build.yml` lists the four advisories set aside for that, and why.
- **CodeQL:** GitHub's default setup (repository settings) scans the
  JavaScript and TypeScript and the workflows. Default setup and a CodeQL
  workflow are alternatives, so there is no workflow here.
