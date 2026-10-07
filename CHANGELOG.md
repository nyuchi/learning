# Changelog

From this release the site's versions are its git tags, under the org's
versioning policy: each merge into `staging` is a patch tag (from
v0.0.1, 2026-10-04), each release to `main` the next minor. The 3.x and 2.x
numbers below were the site's earlier, hand-kept numbering and are retired; the
`version` in package.json is not the release version.

## 0.1.0 — 2026-10-07

Released with the Toddle Enhancement Extension 0.9.0, which is in Chrome Web
Store review; the site describes it as the next version until it is live.

### Added

- **A Releases page for the extension**, at
  `/toddle-enhancement-extension/releases`: what changed in each version,
  in plain words for teachers, newest first. 0.9.0 is "Coming soon to the
  Chrome Web Store"; 0.8.2, 0.8.1, 0.8.0, 0.7.x and the early builds follow,
  condensed. Versions 0.8.3 to 0.8.13, test builds for schools piloting the
  extension, are said in one line: their changes arrive together in 0.9.0.
  Each version has the anchor `#v<version>`, which the extension's menu will
  link to. No downloads and no GitHub links: the extension's repository is
  private, and teachers install from the Chrome Web Store. The notes live in
  `src/data/releases.ts`, so adding a release is one edit. Linked from the
  extension page, the footer and llms.txt, and in the sitemap.

### Changed

- **0.9.0's last changes, on the Releases page and the legal pages.** Text
  and icons at the right size on Toddle, a flag's text drawn from its
  Markdown, the Excusals tab's Time out column, and a licence key that
  follows the teacher's own Chrome account (also kept in Chrome's synced
  storage, never sent to Nyuchi). Every page that said the key stays on the
  device says so; the wording lives once, in `licenceSync`
  (`src/data/legal.ts`). The pricing section shows individual licence holders
  the upgrade: code BXXF20VA, US$7 off the organisation licence only.
- **One account of 0.9.0 across the site.** The gradebook's toolbar and the
  Attendance dashboard's details run in closed shadow roots in 0.9.0 on every
  page; the 6 October review's fixes reach schools in 0.9.0; each version
  difference says from which version.
- **A release to `main` is tagged as the next minor** (`main-version.yml`,
  the org's reusable auto-tag, with a GitHub release).
- **The licence server's address is `licenses.nyuchi.com`.** The privacy
  policy, the data and security pages, the vulnerability disclosure scope,
  the extension page's allowlist note, llms.txt and SECURITY.md name the new
  host for the daily check for cancelled keys from version 0.9.0, and say
  that 0.8.2, on the store today, asks `licences.nyuchi.dev`, the same
  server, which still answers. The legal pages' date moves to 7 October 2026.
- **@bundu/ui 0.5.0** (was 0.1.1): the kit's updated tokens. The page
  background is a cooler, neutral off-white; layout, type, buttons and the
  Nyuchi brand colours are unchanged. Every check and test passes as before.
- **The site's code is proprietary**, all rights reserved, with a LICENSE
  file saying so (it had none). Not open source.

- **The terms say who owns the extension.** A new "Who owns the extension"
  section: the extension and its code belong to Nyuchi Web Services, part
  of Nyuchi Africa (Private) Limited, all rights reserved, and it is not
  open source. A licence grants use, not ownership. Its code may not be
  copied, modified, reused or redistributed, in whole or in part, in another
  product or service without written permission. Reading the code to check
  what it does stays welcome, and building a competing product stays
  forbidden. Said once, in `ownership` (`src/data/legal.ts`), and repeated on
  the extension page and in llms.txt.
- **Student flags, as 0.9.0 ships them:** a concealed flag is a grey smudge
  with no colour, nothing on the page brings it back, and a teacher updating
  from 0.8.2 has flags concealed.
- **The extension page and legal pages describe 0.9.0, the next Chrome Web
  Store release**, and say where 0.8.2, on the store today, differs. Patches
  (0.8.3 to 0.8.13) are test releases that do not go to the store, so
  `extensionVersions.next` is now 0.9.0, not 0.8.4.
  - Student flags: the extension no longer hides Toddle's own flags. A
    teacher can conceal them for a shared screen with the free switch, and
    "Show flags" in the sidebar shows one student's. The wording is
    "conceal" and "flag visibility", said once in `flags`
    (`src/data/legal.ts`); a test fails on "hide flags" on the extension
    page, the home page and in llms.txt. The sidebar asks Toddle for a
    student's flags each time it opens. The value on Toddle's site is
    `tee-blur-flags` (`gbx-hide-flags` in 0.8.2).
  - The rebuild: the flag switch, the student sidebar and the home page's
    additions run in the extension's isolated world, in closed shadow roots
    (product page, Security page, llms.txt). The Security page adds the home
    page channel's limit.
  - The student sidebar: today's timetable as its own part, the student's
    email, a class's teachers to email at once, and stepping aside in
    Toddle's admin portal. My classes switches on and off at once.
  - For schools: the Admin console, Group Policy, Intune and macOS steps,
    the organisation key pasted in once by each teacher, and allowing
    the licence server (now `licenses.nyuchi.com`, and `licences.nyuchi.dev`
    for 0.8.2), summarised on the extension page; the full guide
    on request. A link to the help centre's "How to use" collection.
  - The data schema (the extension's `docs/data-schema.md`) is described on
    the data handling page and the extension page, available on request.
  - Data handling: the licence server keeps a SHA-256 of each key, never
    the key itself, and the school's email domains for an organisation key.
  - The second security review was of 0.8.4, a test release; its fixes are
    in 0.9.0.
- **The privacy policy rests on two laws: Zimbabwe's Cyber and Data
  Protection Act [Chapter 12:07] and the EU and UK GDPR**, applied to everyone.
  A new "The law we follow" section names POTRAZ as Zimbabwe's regulator, says
  where data goes and how transfers out of the EU and UK are covered, and the
  rights section lists each right, the one-month answer and where to complain
  (POTRAZ, the ICO, or an EU authority). Each legal basis carries its GDPR
  article. A breach goes to POTRAZ within 24 hours, as Zimbabwe's Act requires,
  and to an EU or UK regulator within 72 where the GDPR requires it. Singapore's
  PDPA is no longer named. The facts live once, in `dataProtection`
  (`src/data/legal.ts`).
- **The legal pages match the extension's code, for 0.8.2 and 0.8.4**, and
  were dated 6 October 2026. (Superseded within this release: the pages now
  describe 0.9.0, say flags are concealed rather than hidden, and are dated
  7 October 2026; see the entries above.) Checked against the extension's data schema
  (`docs/toddle-data-fields.md`) and its code:
  - Student flags: from 0.8.4 they are shown as Toddle shows them, and the
    free switch hides them everywhere; versions before 0.8.4 hid them by
    default. Unless flags are hidden, the sidebar asks Toddle for a
    student's flags each time it opens.
  - Memory: answers stay in the tab's memory until it is closed or
    reloaded, reused for at most 5 minutes (2 for a student's day). Not
    "a few minutes, then discarded".
  - Storage: every key, named — the last revocation check and the Toddle
    account's email in the extension's storage, and the four values on
    Toddle's site (`tee-settings`, `gbx-hide-flags`, `tee-course-view`,
    `tee-academic-year`). The "style of Toddle's message button" value it
    once listed does not exist.
  - Every switch, including gradebook tools and the Attendance dashboard's
    student details.
  - Licence keys may, not must, name who they are for.
  - What each feature reads (gradebook, home page, profile page, Attendance
    dashboard, sidebar), and the sign-in headers and academic year noted
    from Toddle's own requests.
  - Exactly what leaves the device, student photos included.
  - The Security page covers the adversarial review of 6 October 2026
    (findings 13 to 16) and what code inside Toddle's page cannot promise.
- **The audit sets one advisory aside, by ID, until 2026-11-03** (CI only).
  GHSA-ch52-4w7c-c8xp in `http-cache-semantics` has no patched release, and
  astro 7.3.5 uses the package only to cache remote images during
  `astro build`; this site is static, so the path never runs for a visitor.
  `scripts/audit.mjs` runs the same `npm audit --audit-level=high --omit=dev`
  and fails on anything else at that level, or once the recheck date passes.
- **Vite+ for checks and tests** (tooling only; the built site is unchanged).
  `vite-plus` 1.0 replaces `vitest` as a dev dependency, and `vite.config.ts`
  carries the org format settings, type-aware linting and type checking, and
  the test settings that were in `vitest.config.ts`. Tests import from
  `vite-plus/test`. The org-required `vite-plus / check` runs the transitional
  `ci:check` (`astro check` and `vp fmt --check`) until `astro.config.mjs`
  stops assigning a `Date` to the sitemap's string `lastmod`.

## 3.3.0 — 2026-10-01

### Added

- **The legal pages a school's reviewers ask for**, all dated 1 October 2026
  and drafted from the code:
  - `/legal/security`: the Toddle Enhancement Extension's security model, how
    it is tested, the independent adversarial review of 1 October 2026 and
    every finding it fixed in 0.8.2, the limit no extension can remove, and how
    to report a vulnerability.
  - `/legal/vulnerability-disclosure`: scope (site, extension, licence
    server), how to report, response and fix times, safe harbour, no bounty.
  - `/.well-known/security.txt` (RFC 9116), pointing at that policy; a test
    fails a month before it expires.
  - `/legal/cookies`: every cookie and stored value, what sets it, how long it
    lasts and which consent choice switches it on.
  - `/legal/data`: data handling for schools, including what Nyuchi holds,
    the services that process it, retention, breach notification and a data
    processing agreement on request.
  - `/legal/student-privacy`: staff use the extension, not students; FERPA,
    COPPA and DPAs, stated as data flows.
  - `/legal/notice`: who operates the site and the extension, and how to reach
    them.
  - `/accessibility`: the WCAG 2.2 AA target, how it is tested, known
    limitations.
- A **Legal** group in the footer listing every one of them, and a
  non-affiliation notice for Toddle in the footer, the terms and the extension
  page.

### Changed

- **The extension page describes 0.8.2:** the student sidebar anywhere a
  student appears in Toddle, the Now card and today's classes and attendance,
  the class view and message buttons into Toddle's own chat, and the
  Attendance dashboard's Students tab. No new screenshots yet.
- **The privacy policy** says what 0.8.2 reads for the sidebar and when; that
  flags are fetched only when someone shows them; that licences are tied to
  their owner and checked in the browser; the extension's second outside
  connection (a data-free daily check for cancelled keys); who the controller
  is and on what basis, under Zimbabwe's Cyber and Data Protection Act; data
  subjects' rights; and breach notification. Privacy requests now go to
  `privacy@nyuchi.com`.
- **The terms** are now the terms of use and service: using the website, how
  licence keys work, acceptable use, and the courts of Harare.
- `SECURITY.md` describes this site as it is, and points to the Security
  page and the disclosure policy.

## 3.2.0 — 2026-09-28

### Added

- **Browser QA.** `npm run qa` builds the site, serves it, and drives a real
  browser over every page at phone, tablet and desktop width in both colour
  schemes: axe-core against WCAG 2.1 AA, plus a horizontal-overflow check that
  a desktop screenshot cannot catch. It found a serious violation on its first
  run (see below). 18 combinations, all clean.
- `/legal/terms` — terms and conditions, written to be read. It says plainly
  that the extension rides on an interface Toddle does not publish, that a
  Toddle release can break it, and that anything you are about to act on should
  be confirmed in Toddle itself.
- `llms.txt` — a plain-text map of the site for assistants, including an
  explicit note not to infer capability the product does not claim.
- JSON-LD on every page: an `Organization`/`WebSite`/`WebPage` graph, plus
  `SoftwareApplication` on the extension page. The claims mirror the privacy
  policy, because these are the sentences a search result or an assistant
  repeats.
- `tests/seo.test.ts` — canonicals, titles, descriptions, the JSON-LD graph,
  robots.txt, the sitemap, and that the footer links to every page.

### Fixed

- **Inline links were distinguishable by colour alone** — a serious WCAG 1.4.1
  failure (`link-in-text-block`) that axe-core found on the extension and
  privacy pages. They relied on `hover:underline`, which does not exist on
  touch and does not help a reader who cannot distinguish the colour. A `.link`
  component class now underlines them at rest.

### Changed

- The CSP hash check ignores `application/ld+json` blocks. They are data, never
  executed, so `script-src` does not apply — and hashing them meant every edit
  to a page title silently invalidated the policy.

## 3.1.0 — 2026-09-28

### Added

- `/legal/privacy` — the privacy policy. The Chrome Web Store requires a policy
  URL and makes the publisher certify it matches the listing's disclosures, so
  the claims on it are generated from `src/data/legal.ts`, the same source the
  listing copy is written from. They cannot drift apart silently.
- `robots.txt`, pointing at the sitemap.

### Changed

- **The extension's source repository is private**, so the site no longer links
  to it. A test fails the build on any `github.com` link, and one switch
  (`toddleExtension.webStore`) drives every call to action: an enquiry while
  there is no store listing, an install link the moment there is one.
- **Corrected the product page.** It described hiding student names; the
  shipping extension hides Toddle's student _flags_ and deliberately never
  hides names, because a gradebook of anonymous rows is no use to a teacher.
- Dropped the "free and open source" and "the source is public" claims, which
  stopped being true when the repository went private.
- The seven-mineral identity strip is the canonical `MineralStrip` from
  `@bundu/ui` — fixed to the left edge, full height, vertical. It was
  previously a hand-rolled horizontal bar in the footer.
- `npm test` builds before running the tests, so assertions about build output
  read a build of the commit under test rather than whatever was lying around.

Hosting stays on Vercel. A Cloudflare Workers migration was made and reverted
within this release; `learning.nyuchi.com` never moved.

## 3.0.0 — 2026-09-28

Rebuilt in Astro, rebranded, and given a second page.

### The site is Astro again

The SvelteKit one-pager is gone. Astro is what the rest of the Nyuchi
marketing estate is built on, and it is what `@bundu/ui` ships components for,
so a Svelte site could only ever reimplement the design system rather than
consume it.

Astro 7 with Tailwind 4. `@bundu/ui@0.1.1` ships a Tailwind 3 style config,
which Tailwind 4 consumes through `@config` — component classes, the token
set, the type scale and the `dark:` variants all come through intact, verified
against the build output.

### The design system comes from the package now

`src/app.css` used to carry a hand-copied subset of the design tokens, under a
comment claiming they were verbatim from the marketing monorepo. They were not:
nyuchi.com had since gained the sodalite and copper minerals, the heritage
palette, popover and destructive tokens, touch targets and a radius scale, and
had settled on gold as its primary. This site had none of that and was still on
malachite.

All of it now comes from `@bundu/ui` — `globals.css` for the tokens and
component classes, `brand-nyuchi.css` for the primary, and the Tailwind preset
for the utilities. `tests/branding.test.ts` fails the build if a token is
redefined locally, so the drift cannot recur quietly.

### Branding

The wordmark is capitalised: **Nyuchi Learning**, not the previous lowercase
setting. A test fails on a lowercase spelling anywhere in `src/`.

### Added

- `/toddle-enhancement-extension` — the product page for the Toddle
  Enhancement Extension: what it does, how to install it as a teacher or push
  it to a school, what it can see, and what Present mode does and does not do.
- A site shell matching nyuchi.com: sticky translucent header, the
  seven-mineral identity strip, a four-column footer, and a light/dark toggle
  that remembers the choice.
- A real Content-Security-Policy in `vercel.json`, with `script-src 'self'`
  plus a hash per inline script, plus `Referrer-Policy` and
  `Permissions-Policy`. `npm test` verifies the hashes against the build, so
  editing the theme bootstrap without updating the policy fails CI instead of
  breaking the theme in production.
- A skip link, and `prefers-reduced-motion` handling.

### Changed

- `npm run check` is `astro check`, not `svelte-check`.
- `vitest` pinned to `~4.0.18`; `4.1.11` trips a resolver bug in npm 10.9 that
  makes `npm install` fail outright.
- `overrides` pins `path-to-regexp` to `^6.3.0`, clearing the high-severity
  advisory that the current `@astrojs/vercel` still pulls in.
- The CI audit is split: `--omit=dev` at high severity blocks and is at zero;
  build and test tooling is reported without blocking, because the one
  remaining advisory (vitest) has no installable fix.
- `*.astro` added to `.prettierignore`, because the org lint gate runs Prettier
  without `prettier-plugin-astro` and cannot parse those files.

## 2.0.0 — 2026-05-04

Complete rewrite. The `learning.nyuchi.com` site is no longer a
content-bearing Astro app; it is a SvelteKit one-pager whose only job is
to redirect visitors to the place the original content moved to.

### Why this change happened

Up to May 2026 this repo housed two different audiences under one brand:

- **Open educational frameworks** — content that belonged with the Bundu
  Foundation's education initiative.
- **Commercial training and consultation** — content that belonged with
  Nyuchi Africa's commercial product line.

In [bundu-labs/marketing#5](https://github.com/bundu-labs/marketing/pull/5)
the content was migrated into the marketing monorepo and split across
three surfaces:

- `bundu.org/education` — Bundu Education (open frameworks)
- `nyuchi.com/learning` — Nyuchi Learning (commercial training)
- `mukoko.com/lingo` — Mukoko Lingo (consumer language learning)

With the content gone, the standalone Astro app no longer had a reason
to exist. Rather than leave the old site live with stale content or
return 404s, this repo now ships a small one-pager that lists the three
destinations and lets visitors pick the one that matches what they came
for.

### Added

- `src/routes/+page.svelte` — the one-pager. Hero, three project cards
  (Bundu Education, Nyuchi Learning, Mukoko Lingo), a closing
  "How they fit together" section, and a Bundu Family footer.
- `src/routes/+layout.svelte` — imports global CSS and renders the page
  snippet via Svelte 5 `{@render children()}`.
- `src/app.html` — shell with Noto Serif / Noto Sans / JetBrains Mono
  font preloads and the Tailwind body classes.
- `src/app.css` — design tokens copied verbatim from
  `bundu-labs/marketing apps/nyuchi/src/styles/global.css`. Primary
  mineral is **malachite** (the canonical "education" colour).
- `tailwind.config.mjs` — Five African Minerals palette, fluid type
  scale (`text-display`, `text-h1`...`text-caption`), dynamic-class
  safelist for `bg-{mineral}` etc.
- `svelte.config.js` + `vite.config.js` — SvelteKit 2 + Svelte 5 +
  Vite 8 + `@sveltejs/adapter-vercel`.
- `vercel.json` — `framework: sveltekit` plus the standard security
  headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `X-XSS-Protection`).
- `.github/workflows/ci.yml` — runs `svelte-check`, `vite build`, and
  `prettier --check` on every PR.

### Changed

- `README.md` — rewritten to describe what the repo is now (a SvelteKit
  redirect page) instead of what it used to be (an Astro framework
  publisher).
- `SECURITY.md` — scoped down to reflect the new tiny attack surface
  (no auth, no forms, no API endpoints).
- `CONTRIBUTING.md` — rewritten as a short note: change the `projects`
  array in `+page.svelte` if a destination URL moves; everything else
  is set up correctly.

### Removed

- `astro.config.mjs`, `components.json`, `eslint.config.js`,
  `vitest.config.js`, `postcss.config.mjs` (Astro-shaped) — superseded.
- `src/` (entire Astro app — components, layouts, pages, blog,
  framework markdown, assets). Content lives in
  `bundu-labs/marketing` now.
- `public/` — replaced with `static/` (SvelteKit convention). Only the
  favicon survives.
- `tests/` — the source/build/a11y/SEO test suites. Out of scope for a
  redirect one-pager; if more substantial UI ever returns we'll
  reintroduce a small `vitest` setup.
- `ARCHITECTURE.md`, `BRANDING.md`, `DEPLOYMENT.md`,
  `MISSION_VISION_VALUES_PROPOSAL.md`, `PR_DESCRIPTION.md`,
  `PR_SUMMARY.md`, `TODO.md`, `CLAUDE.md` — described the old Astro
  app's architecture and roadmap. Obsolete.
- `LICENSE` — the repo is now private; no public licence applies.
- All Astro / React / Radix / Lucide / Tailwind 4 dependencies.

### Stack

- SvelteKit 2 + Svelte 5 (runes: `$props`, snippets via `{@render}`)
- Vite 8
- Tailwind 3 (matches the marketing monorepo; **not** Tailwind 4 as
  before)
- TypeScript 5
- Prettier 3.3.3 (pinned to match CI in `nyuchi/.github`'s reusable
  lint workflow)
- `@sveltejs/adapter-vercel` for deployment
