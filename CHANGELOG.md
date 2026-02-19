# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.1.0] - February 2026

### Added
- **PageHero component**: Standard hero section (tagline, h1 with accent-colored word, subtitle, share button, CTA slot) — follows cross-site nhimbe.com pattern. Used on 6 pages (about, frameworks, community, global-reach, consultation, team)
- **FeatureGrid component**: Reusable icon + title + description card grid with support for linked cards, alignment, and column variants. Used on 3 pages (about, global-reach, community)
- **CTASection component**: Standard end-of-page call-to-action section with heading, description, tagline, and button slot. Used on 3 pages (about, resources, pricing)
- **MetricCard/MetricGroup components**: Stat/metric display cards with responsive grid container. Used on 2 pages (index, global-reach)
- **ShareButton component**: Social sharing with Web Share API (mobile native) and fallback dropdown (X, LinkedIn, Facebook, WhatsApp, Copy Link). Integrated into PageHero via `share` prop
- **Component-level design tests**: UI components tested for semantic typography compliance (no hardcoded `text-xs`/`text-sm`). Reusable component existence tests added

### Changed
- **UI components**: All React UI primitives (`badge`, `card`, `dialog`, `label`, `tooltip`, `tabs`, `dropdown-menu`, `navigation-menu`, `breadcrumb`, `input`) migrated from hardcoded Tailwind text sizes to semantic typography classes (`text-body`, `text-meta`, `text-caption`)
- **Team page**: Normalized breadcrumb and hero structure to match standard pattern (was using gradient container with non-standard layout)

### Fixed
- **input.tsx**: `file:text-sm` replaced with `file:text-meta` for consistent typography
- **dropdown-menu.tsx**: Missing space in `text-metaoutline-none` classes (was `text-sm` before migration)

## [5.0.0] - February 2026

### Added
- **Testing Infrastructure**: Vitest test suites with 356 tests
  - Design guidelines compliance tests (breadcrumbs, no images, no emojis, heading hierarchy, typography, forbidden fonts, BaseLayout usage)
  - Accessibility & SEO tests (meta tags, Open Graph, JSON-LD, skip links, landmarks, heading hierarchy, viewport, CSS accessibility features)
- **Linting & Formatting**: ESLint with Astro plugin, Prettier with Astro plugin
- **CI/CD Pipeline**: GitHub Actions workflow (lint → design tests → build → a11y tests)
- **JetBrains Mono**: Now loaded via Google Fonts for code blocks
- **APCA Contrast Guidelines**: Forward-looking WCAG 3.0 contrast testing documented

### Changed
- **Design Philosophy**: Anthropic-inspired clean minimalist design (typography-led, restrained, content-first)
- **Color System**: Warm neutral surfaces - light `#FAF9F5`, dark `#0A0A0A`/`#141414`/`#1E1E1E` (replaced cold Slate palette)
- **Typography**: Body text 18px desktop/16px mobile, line-height 1.7, fluid `clamp()` headings, 65ch max prose width
- **All Hero Sections**: Converted to text-only (removed Unsplash images from about, frameworks pages)
- **H1 Font**: All pages now use `font-display` (Noto Serif) consistently, not `font-serif` (Georgia)
- **Icons**: Migrated from deprecated `lucide-astro` to `@lucide/astro` v0.574
  - Updated props: `strokeWidth` → `stroke-width` (kebab-case for Astro)
  - Renamed deprecated icons: CheckCircle→CircleCheckBig, AlertCircle→CircleAlert, BarChart→ChartBar, HelpCircle→CircleHelp
- **Header**: Warm dark solid state `rgba(10,10,10,0.98)`, backdrop blur, semantic color tokens
- **Footer**: All colors use semantic tokens (`--text`, `--text-secondary`) instead of hardcoded values
- **Breadcrumbs**: Added to all interior pages (about, frameworks, global-reach, community, consultation, resources, blog/index)
- **Pre-Commit Checklist**: Now includes documentation update requirements (CHANGELOG, CLAUDE.md, README, etc.)
- **CI Order**: Lint and tests run before build (fail fast on code quality)

### Fixed
- **Emojis Removed**: Replaced ✅/❌ in support-framework with text headings
- **Dual H1**: Fixed resources.astro Coming Soon overlay from `<h1>` to `<h2>`
- **ESLint Warnings**: Removed unused imports, fixed `let` → `const` in BaseLayout scroll handler
- **Reduced Motion**: Added `prefers-reduced-motion` check to header scroll transitions

### Updated
- All packages to latest versions: Astro 5.17, Tailwind CSS 4.2, React 19.2, TypeScript 5.9
- Documentation: CLAUDE.md v5.0, README.md, BRANDING.md, CONTRIBUTING.md, SECURITY.md, DEPLOYMENT.md

## [4.0.0] - December 2025

### Added
- **Tailwind CSS v4 Integration**: Migrated all pages to Tailwind CSS utility classes with CSS custom properties
- **Bundu Brand System**: Implemented Five African Minerals color palette (Cobalt, Tanzanite, Malachite, Gold, Terracotta)
- **Digital Literacy Framework**: New framework page for K-12 digital skills progression
- **Budget Planning Guide**: Renamed pricing page to clarify that frameworks are free
- **Coming Soon Overlay**: Resources page now shows coming soon status
- **Animation System**: Intersection Observer-based scroll animations
- **CONTRIBUTING.md**: Comprehensive contribution guidelines
- **CHANGELOG.md**: This file - version history tracking

### Changed
- **Messaging Updated**: "Leapfrog Traditional Education" changed to "Build Digital Campuses. Prepare for 2050."
- **Pricing Reframed**: Pricing page now clearly explains cost estimation vs. Nyuchi services
- **Navigation**: "Pricing" renamed to "Budget Planning" throughout site
- **Budget Scenarios**: Pricing tiers renamed to Minimal, Modest, Moderate, and Comprehensive budget scenarios
- **Primary Color**: Education theme uses Cobalt (#00B0FF) as primary interactive color
- **Typography**: Migrated from Playfair Display/Roboto to Noto Serif/Plus Jakarta Sans
- **Button Styling**: Changed from pill-shaped (9999px) to rounded (12px) buttons
- **Card Styling**: Updated to 16px border-radius with soft layered shadows
- **Brand Strip**: Zimbabwe flag strip replaced with 5-mineral Minerals Strip

### Fixed
- **Mobile Navigation**: Improved touch targets and menu toggle behavior
- **Accessibility**: WCAG AAA compliance (7:1+ contrast ratios)
- **Responsive Layout**: Better single-column layouts on mobile

### Security
- **SECURITY.md**: Complete rewrite with proper security policy

## [3.1.0] - December 2025

### Added
- Dark mode theme with Slate color surfaces
- Auto-hide header on scroll
- Dropdown menus for navigation sections
- Global mission messaging in footer
- New pages: Resources, Global Reach, Team, Community, Consultation

### Changed
- Header transitions between transparent and solid states
- Footer redesigned with hero section and 4-column grid
- Geographic scope messaging expanded (Africa, Asia, Latin America, Pacific)

## [3.0.0] - November 2025

### Added
- Claude-aligned design system
- Editorial, warm design aesthetic
- Layered shadow system

### Changed
- Typography: Newsreader for display, Inter for body
- Spacing: 4px base unit for granular control
- Overall feel: Sophisticated and approachable

## [2.0.0] - October 2024

### Added
- K-12 Support Process Framework
- Bold, mobile-optimized design
- Hamburger menu navigation
- Comprehensive pricing tiers
- SEO and AI optimization
- Google Analytics integration

### Changed
- Dramatic typography with Playfair Display
- Pill-shaped buttons (9999px border-radius)
- Uppercase styling for major headings
- Monochrome color scheme

## [1.0.0] - October 2024

### Added
- Initial release
- K-12 Digital Campus Framework
- Basic responsive design
- Zimbabwe flag strip
- Core framework documentation
- Homepage, frameworks, about, blog pages

---

## Version Naming

- **Major versions (X.0.0)**: Significant design system changes, breaking changes
- **Minor versions (x.Y.0)**: New features, pages, or frameworks
- **Patch versions (x.y.Z)**: Bug fixes, content updates, minor improvements

## Links

- [Compare versions on GitHub](https://github.com/nyuchitech/learning/releases)
- [Report issues](https://github.com/nyuchitech/learning/issues)
- [Contributing guidelines](CONTRIBUTING.md)
