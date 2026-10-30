# Changelog

From this release the site's versions are its git tags, under the org's
versioning policy: each merge into `staging` is a patch tag (from
v0.0.1, 2026-10-04), each release to `main` the next minor. The 3.x and 2.x
numbers below were the site's earlier, hand-kept numbering and are retired; the
`version` in package.json is not the release version.

## Unreleased

### Added

- **The Chrome Web Store numbers on the home page.** The proof section
  says what the store listing shows, dated: rated 5.0 out of 5 (1 rating),
  27 users, as of 29 October 2026, from `toddleExtension.storeStats` in
  `src/data/site.ts`.
- **The site is redesigned as a funnel, on @bundu/ui's own components.**
  The home page, the extension page and the Mukoko Lingo page now open with
  the kit's split `Hero` (the product screenshot, or a card of what Nyuchi
  Learning makes with each one's real status), a strip of short, documented
  facts, and sections built from `Section` and `SectionHeader` in
  nyuchi.com's rhythm: alternating surfaces, headers that sit over
  full-width grids rather than in a narrow column against the left edge of
  a wide screen. The home page runs hero → how it works → the gradebook
  before and after → the two products → pricing (free, individual,
  organisation) → proof → FAQ → a closing call to action; the product pages
  run problem → outcome → how it works → pricing → FAQ → call to action,
  keeping every claim they made before. New: a data-flow diagram
  (`DataFlow.astro`) of what the extension touches inside the browser and
  the only things that cross that line, a two-lane "how it works" for
  Mukoko Lingo (`LingoFlow.astro`), and a `<details>` FAQ that needs no
  JavaScript. The header carries the page's primary call to action ("Add to
  Chrome", or "Start learning" on the Lingo page), with "Talk to us" beside
  it on wide screens, and no longer wraps at phone width. The releases page
  has a version index: a sticky sidebar from `lg`, a row of chips on a
  phone. The cookie banner is a single compact bar on wide screens and a
  short sheet on a phone, so it no longer covers a page's headline and first
  call to action; what it asks, and what happens before an answer, are
  unchanged.
- **Shift-left security checks (#77).** A pre-commit hook
  (`.githooks/pre-commit`, turned on by `npm ci`) runs both formatters as the
  org gates do, `vp lint --deny-warnings`, and Semgrep on the staged files
  when it is installed. Pull requests get dependency review, which fails on a
  new high or critical advisory (the org's step, called directly so the four
  advisories GitHub misreads for Vite+'s aliased core can be set aside). `.vscode/extensions.json`
  recommends Astro, Oxc, Prettier, Semgrep, SonarQube for IDE, EditorConfig
  and markdownlint. See `docs/toolchain.md`.
- **Mukoko Lingo has its own page, `/mukoko-lingo`.** Mukoko Lingo is a
  partner app developed by Nyuchi Learning, part of Mukoko, Africa's super
  app. The page says what it does today, who it is for, what schools get
  and how to start, in the extension page's style, with the app's own icon.
  Every claim is from Lingo's public repository (mukoko-dev/mukoko-lingo:
  README.md, app.json, BRANDING.md and the app's own copy). It sits beside
  the Toddle Enhancement Extension wherever the extension appears: a second
  product card on the home page, "Mukoko Lingo" in the header (where
  "Tools" is now "Toddle extension"), and the footer's "Tools" column, now
  "Products". It has a SoftwareApplication node in its JSON-LD, Open Graph
  tags, a sitemap entry and an entry under Products in llms.txt.
  `mukokoLingo` in `src/data/site.ts` holds its links.
  `tests/seo.test.ts` checks all of that.
- **`npm run clean`, and after every merge.** `scripts/clean.mjs` removes
  the build output (`dist/`, `.astro/`, `.vercel/output/`), the QA report,
  the tools' caches, finished Claude Code worktrees and local branches
  already in `main` or `staging`, touching only what Git ignores. It runs
  after a `git pull` that merges (`.githooks/post-merge`, turned on by
  `npm ci` through the new `prepare` script) and after Claude Code merges a
  pull request (`.claude/settings.json`). See CONTRIBUTING.md.

### Changed

- **Extension 0.14.0 on the releases page.** The gradebook's expand
  buttons are back (Toddle changed its header); 0.14.0 is listed first, on
  the store from 30 October 2026, the 0.13.1 to 0.13.5 test builds land on
  it, and the legal pages' `current` version is 0.14.0.
- **Extension 0.13.0 is on the release notes and the legal pages.** It
  reached the Chrome Web Store on 29 October 2026 and makes licence claim
  links work again. `extensionVersions.current` is now 0.13.0; 0.13.0 adds
  no connection and stores nothing new, so no legal statement changes.

- **The data page lists licence claim links under What Nyuchi holds.** The
  licence server keeps a record for each one-time claim link: a hash of the
  link, never the link itself, the licence it belongs to, the address it was
  emailed to, and when and how it was used. The page now says so, from the
  licence server's `claim_tokens` table.

- **0.12.0 is on the Chrome Web Store, and is the current version.** The
  owner confirmed it was published on 29 October 2026.
  `extensionVersions.current` is 0.12.0, and the legal pages' date moves to
  29 October 2026, because what they say the extension does changed with
  it, checked against the extension's CHANGELOG, store listing, README,
  SECURITY.md, security review and data schema:
  - **Three outside connections, not two.** The privacy policy, data
    handling, security, terms, student privacy and cookie pages, the
    product page, the home page, `DataFlow.astro` and llms.txt now name the
    third: redeeming a licence email's one-time claim link, one POST of the
    link's token alone to `licenses.nyuchi.com/v1/claims/redeem`, valid
    once for 72 hours, with the claim page the one page named in the
    manifest's `externally_connectable` (the security page no longer says
    no website can connect to the extension). The privacy policy has a
    section for it (`#claim-link`).
  - **Toddle compatibility reports.** The check, what a report holds
    (masked page structure, no student data) and that it goes through the
    existing feedback form only on Send report or when the teacher has
    switched on automatic sending (off by default), on the legal pages
    (`#compatibility-reports` in the privacy policy), and as a feature on
    the product and home pages.
  - **Excel or CSV.** The export is an Excel workbook or a CSV file wherever
    it is described, the meta descriptions included; the security page says
    the Excel export holds no formula.
  - **A school's licence is set by IT through Chrome policy**, and an
    organisation key can no longer be typed in: the extension page's
    deployment card, the terms, the legal pages, the upgrade text, the home
    page FAQ and llms.txt (which said a key cannot be pushed by policy).
  - **What it stores**: the compatibility record and the automatic-report
    choice, the fingerprint of the key a revocation result is about, a
    school's key read from policy and never copied, and three values in
    Toddle's site storage, not four (`tee-settings` is cleared, as it has
    been since before 0.11.0).
  - The security page's licence-key fix is named as 0.11.0's, not the
    current version's, and the parts that read only Toddle's page no
    longer include Toddle's icons.
- **Releases: 0.12.0 first, on the store from 29 October 2026**, with notes
  from its CHANGELOG in plain words. The test builds since 0.10.0 (0.10.1
  to 0.10.5, 0.11.1 to 0.11.6) now open 0.12.0's notes, where their changes
  reached the store; 0.11.3 to 0.11.6 are added to `taggedTestBuilds`.
- **After paying: a claim link, not a key (restores #89).** #94 held the
  claim-link wording back until 0.12.0; it is out and the licence server
  sends claim links, so the extension page's "After paying" note and the
  pricing cards' checkout line say the email carries a one-time link,
  never the key, that it works once for 72 hours and a new one can be asked
  for, and that a school licence's buyer sets it up through the Nyuchi
  console and Chrome policy. `tests/purchase.test.ts` holds both to it.

- **Dependencies and CI actions up to date.** `vite-plus` 1.4.0 (from
  1.0.0; supersedes #101), Vite 8.3.5 (supersedes #98), `@astrojs/vercel`
  11.0.17, and `actions/checkout` v7.0.1 and `actions/setup-node` v7.1.0,
  pinned by SHA (supersedes #96). `npm audit` reports nothing: the Vite,
  undici and fast-uri advisories take their patched releases, and `zod` is
  held at 4.6.6 or later through `overrides` (GHSA-mrhx-c7xc-m3w5), since
  `@vercel/cli-config` pins 4.1.11. The audit's exception list stays empty.
- **Mukoko Lingo is written for organisations first.** The page, the
  homepage card and `llms.txt` now lead with schools, businesses and
  government, then single learners. The "For schools" section is "For
  schools, businesses and government" (anchor `#organisations`), and the
  enquiry button reads "Talk to us about your organisation". Lingo is
  described as "Part of Mukoko by Nyuchi", and Swahili is shown as beta
  (owner decisions, 2026-10-15).

- **Mukoko Lingo, described as it is.** The home page card and llms.txt
  said Lingo was "free for personal use", "Shona and Ndebele primary" and
  taught French and Portuguese. Its repository says it teaches Shona,
  Ndebele, English and Chinese, and that starting is free; the copy now
  says that, and links to the live app at lingo.mukoko.com rather than
  mukoko.com/lingo. The home page's "three surfaces" are now the two
  products and two destinations.
- **0.11.0 is on the Chrome Web Store, and is the current version (#85).**
  It is 0.10.0 with a security fix to how licence keys are checked. The
  Releases page lists it first, marked on the store, from the extension's
  CHANGELOG; the test builds tagged since 0.10.0 (0.10.1 to 0.10.5, 0.11.1
  and 0.11.2) open its notes, and 0.12.0, not released, is not listed.
  `extensionVersions.current` is 0.11.0; the new `changedIn` (0.9.0) keeps
  "versions before 0.9.0" true where the old licence host and flags key are
  named. The product page, the Security page (which now describes the
  0.11.0 fix), the Releases description and llms.txt name 0.11.0. The
  anchors for 0.9.6 and 0.9.7 the issue asked for were already there; the
  test that every tagged test build has one now covers the 0.10.x and
  0.11.x builds too.
- **`webStore`'s type is a named `Url`**, so Prettier 3.3 and 3.9 format
  `src/data/site.ts` the same way; the org lint gate (3.9.4) had flagged it.
- **After paying: the checkout note describes today's email, a licence
  key.** The claim-link wording (#89) is held back until the licence server
  sends claim links, which ships with extension 0.12.0. Until then buyers
  still receive the key by email, so the note says that. Restore #89 when
  0.12.0 and the server's claim links go live.
- **0.10.0 is on the Chrome Web Store.** The Releases page shows it as on the store since 13 October 2026, and the test builds 0.9.9 and 0.9.10 open its notes.
- **The Toddle Enhancement Extension 0.9.0 is on the Chrome Web Store**,
  published on 7 October 2026. The Releases page marks it "On the Chrome Web
  Store", dated 7 October 2026. `extensionVersions.current` is 0.9.0 and
  there is no `next` until another minor is waiting for the store;
  `previous` (0.8.2) names the store release before it where updating from
  it still matters. Every "from version 0.9.0" is plain present tense, and
  the "0.8.2, on the store today" wording is gone from the product page, the
  legal pages, llms.txt and SECURITY.md (`flags.before`, the three switches
  of 0.8.2, the sidebar's eye button). What still helps a teacher updating
  from 0.8.2 stays, as history: flags it hid stay concealed, and versions
  before 0.9.0 used the storage key `gbx-hide-flags` and asked the licence
  host `licences.nyuchi.dev`.
- **Google Analytics loads only after consent (#83).** Google's tag is no
  longer on the page behind Consent Mode set to denied, which still sent
  Google a cookieless ping; it is not requested at all until the visitor
  agrees. `Analytics.astro` queues the denied defaults and holds the only
  loader, which runs on a stored yes from the current banner version or when
  `CookieBanner.astro` records one. A record from an older version, the first
  banner's `analytics-consent` key, or anything malformed counts as no answer,
  and the banner asks again; `SupportWidget.astro` applies the same check
  through `parseConsent` in `src/data/consent.ts`. The privacy and cookie
  policies now say that Google Analytics contacts Google only after you agree
  (Google Fonts is still named separately), dated 13 October 2026, as is
  llms.txt. The CSP has one inline-script hash fewer. `tests/consent.test.ts`
  runs the built script against current, old, legacy and malformed records,
  and `npm run consent:probe` now fails on any Google Analytics request
  before consent.
- **CI asks for less (#84).** Every workflow grants nothing at the top level;
  each job asks for its own permissions (`contents: read` for the build and
  audit jobs, `contents: write` only for the two tagging jobs). The build
  workflow's checkouts set `persist-credentials: false`, since nothing there
  pushes. `actions/checkout` and `actions/setup-node` are pinned to full
  commit SHAs (v4.4.0 each), with the version in a comment, and the new
  `.github/dependabot.yml` keeps those pins current, a week after each
  release (`cooldown`). The reusable workflows
  from `nyuchi/.github` were already pinned to a commit.
- **Docs match the site as it is (#86).** README, CONTRIBUTING and
  `docs/toolchain.md` describe the Astro site's pages, the staging → main
  release flow, Vite+ as adopted (no longer "cannot be adopted"), the inline
  scripts the CSP hashes, and the current audit; the dead Lint badge, the
  vitest pin, `master` and "two pages" are gone. `react` and `react-dom` are
  no longer dev dependencies: nothing imports them, and `@bundu/ui` declares
  no peer dependencies. Prettier and `vp fmt` both stay, because each is run
  by a required org gate; `tests/toolchain.test.ts` fails if their settings
  differ.

### Fixed

- **Dependency advisories.** `http-cache-semantics` takes its patched
  release (GHSA-ch52-4w7c-c8xp), so its dated exception in
  `scripts/audit.mjs` is gone. `postcss-selector-parser` is held at 7.1.6 or
  later through an npm `overrides` entry (GHSA-rj75-hqrm-r3gf): the
  typography plugin pins 6.0.10, and the built CSS is byte-for-byte the same
  with the newer version.
- **Anchors for the extension's test builds 0.9.6, 0.9.7 and 0.9.8 (#85)**
  on the Releases page, under 0.10.0 beside 0.9.1 to 0.9.5, so the links from
  those builds' menus land on the release they lead to. 0.10.0 is still
  "Coming soon to the Chrome Web Store". `taggedTestBuilds` in
  `src/data/releases.ts` lists every tagged test build, and a test fails the
  build if one has no anchor, or more than one.

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
- **Second release review.** The 0.9.0 notes no longer say nothing new is
  read (the data handling page lists each read, now including the teachers'
  roles and photos the staff view shows); the flags summary, the search data
  and the student privacy page say from which version flags are never hidden
  and asked for each time; the first review's version is fixed at 0.8.2; the
  terms and the product page say the cancelled-keys check is at most once a
  day; the staging version workflow runs only on `staging`.
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
