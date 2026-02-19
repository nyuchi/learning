# nyuchi learning - Build Digital Campuses. Prepare for 2050.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

> **Open, shareable frameworks for building and upgrading digital campuses and digital literacy programs.**
>
> Built by educators, for education. Copy it. Adapt it. Improve it. Share it.

## Overview

**nyuchi learning** is a division of nyuchi africa focused on creating comprehensive, open-source frameworks for digital transformation in K-12 schools across Africa and the developing world. Our frameworks are designed to be freely accessible, adaptable to local contexts, and community-driven.

**The frameworks are completely free.** We provide guidance on how to build or upgrade to a digital campus -- schools implement the recommendations using their own resources and vendors.

**Live Site:** [learning.nyuchi.com](https://learning.nyuchi.com)

### Our Frameworks

1. **K-12 Digital Campus Framework**
   - Comprehensive blueprint for building and upgrading digital campuses
   - Infrastructure, software, pedagogy, professional development
   - 3-year implementation roadmap
   - Budget scenarios from minimal ($0-$15K) to comprehensive ($120K-$180K)

2. **Digital Literacy Framework**
   - K-12 progression pathway for digital skills
   - Technology skills + critical thinking
   - Safe, responsible digital citizenship

3. **K-12 Support Process Framework**
   - Three-tier support system (AI chatbot, EdTech team, IT Operations)
   - SLA recommendations and routing criteria
   - Implementation checklist and budget estimates

4. **More frameworks coming soon...**

### Philosophy: Ubuntu

**"I am because we are"** (Shona: "Ndiri nekuti tiri")

This African philosophy guides everything we create:
- Community success over individual achievement
- Open and shareable resources
- Collaborative improvement
- Mutual support and growth

---

## Features

### Clean Minimalist Design

- **Typography-led** - Large, readable text as the primary design element
- **Minimal imagery** - No stock photos; Lucide icons and whitespace for visual interest
- **Warm palette** - Anthropic-inspired warm neutrals with Five African Minerals accents
- **Light/Dark/System themes** - Automatic theme switching with manual toggle
- **WCAG 2.2 AAA + APCA** - Forward-looking accessibility with perceptual contrast testing
- **Minerals Strip** - Signature 5-color vertical strip (desktop only)

### Technical Excellence

- **Astro 5.16+** - Static site generation for optimal performance
- **Tailwind CSS 4.1+** - Utility-first CSS with comprehensive design tokens
- **React 19 + Radix UI** - Accessible interactive components
- **TypeScript** - Strict type checking throughout
- **Comprehensive SEO** - Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **AI-friendly** - Allows GPTBot, Claude-Web, CCBot, PerplexityBot
- **Automatic sitemap** - Per-page priorities via @astrojs/sitemap
- **RSS feed** - Content syndication at /rss.xml
- **Google Analytics** - Integrated tracking (G-BNHM29F8W5)

### Navigation & Wayfinding

- **Breadcrumb navigation** - On every interior page for SEO and usability
- **Auto-hide header** - Transparent/solid states, hides on scroll down, shows on scroll up
- **Dropdown menus** - Desktop navigation with About section dropdown
- **Mobile hamburger menu** - Full-screen overlay with 48px touch targets
- **4-column footer** - Organized link groups with Ubuntu messaging

### Accessibility

- **WCAG 2.2 AAA compliance** - 7:1+ color contrast ratios
- **APCA testing** - Forward-looking WCAG 3.0 perceptual contrast
- **Skip links** - 3 navigation targets (content, nav, footer)
- **Keyboard navigation** - Full keyboard support with visible focus indicators
- **Screen reader support** - Semantic HTML, ARIA labels, landmarks
- **Touch targets** - 44x44px minimum, 48px for primary buttons
- **Reduced motion** - Respects `prefers-reduced-motion`
- **Forced colors** - Supports Windows High Contrast Mode
- **Print styles** - Clean print output with visible URLs

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | 5.16+ | Static site generator |
| **Tailwind CSS** | 4.1+ | Utility-first CSS with design tokens |
| **React** | 19+ | Interactive components |
| **Radix UI** | Latest | Accessible UI primitives |
| **TypeScript** | 5.6+ | Type safety (strict mode) |
| **Lucide Icons** | 0.441+ | Icon system (no emojis) |
| **PostCSS** | 8.5+ | CSS processing pipeline |
| **Google Fonts** | - | Noto Serif (H1) & Plus Jakarta Sans (body) |
| **@astrojs/sitemap** | 3.6+ | Sitemap with per-page priorities |
| **@astrojs/rss** | 4.0+ | RSS feed generation |
| **@astrojs/mdx** | 4.3+ | Rich content authoring |
| **Sanity.io** | Planned | Headless CMS for blog content |
| **Vercel** | - | Deployment and hosting |

---

## Project Structure

```
/
├── public/                     # Static assets
│   ├── *.svg                   # Logo variants, favicon
│   ├── frameworks/             # Framework documentation (Markdown)
│   ├── llms.txt                # AI crawler directives
│   └── robots.txt              # SEO crawler configuration
├── src/
│   ├── components/             # Reusable components
│   │   ├── Logo.astro          # Logo (3 variants: main, horizontal, compact)
│   │   ├── SEO.astro           # Meta tags, Open Graph, JSON-LD
│   │   ├── ThemeToggle.astro   # Light/Dark/System theme switcher
│   │   ├── PageBreadcrumb.astro # Breadcrumb navigation
│   │   ├── BuilderBox.astro    # Builder UI pattern
│   │   ├── InfoTooltip.astro   # Tooltip component
│   │   └── UserAvatar.astro    # Avatar component
│   ├── layouts/
│   │   └── BaseLayout.astro    # Master layout (header, footer, minerals strip, animations)
│   ├── lib/                    # Utility functions
│   ├── pages/                  # File-based routing
│   │   ├── index.astro         # Homepage
│   │   ├── frameworks.astro    # Frameworks overview
│   │   ├── framework.astro     # K-12 Digital Campus Framework
│   │   ├── digital-literacy-framework.astro
│   │   ├── support-framework.astro
│   │   ├── pricing.astro       # Budget planning guide
│   │   ├── resources.astro     # Resources hub
│   │   ├── about.astro         # Mission & Impact
│   │   ├── global-reach.astro  # Geographic scope
│   │   ├── team.astro          # Team
│   │   ├── community.astro     # Community & GitHub
│   │   ├── consultation.astro  # Book a consultation
│   │   ├── rss.xml.ts          # RSS feed
│   │   └── blog/               # Blog posts
│   ├── styles/
│   │   └── global.css          # Tailwind theme, design tokens, component & accessibility layers
│   └── env.d.ts                # TypeScript environment definitions
├── astro.config.mjs            # Astro configuration (sitemap priorities, React)
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript strict mode, path aliases (@/*)
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.mjs          # PostCSS configuration
├── vercel.json                 # Vercel deployment configuration
├── CLAUDE.md                   # Development & design guidelines (v5.0)
├── BRANDING.md                 # Brand guidelines (v6.0)
├── DEPLOYMENT.md               # Deployment instructions
├── CONTRIBUTING.md             # Contribution guidelines
├── SECURITY.md                 # Security policy
├── LICENSE                     # MIT License
└── README.md                   # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- Basic familiarity with terminal/command line

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nyuchitech/learning.git
   cd learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

### Available Scripts

```bash
npm run dev          # Start development server (HMR enabled)
npm run build        # TypeScript check + production build to dist/
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
```

---

## Design System

**For comprehensive design guidelines, see [CLAUDE.md](CLAUDE.md)**

### Design Philosophy

The site follows a **clean minimalist design** inspired by Anthropic's website:
- Typography-led design with large, readable body text (18px desktop)
- Generous whitespace as structural element
- Minimal imagery (blogs are the only exception, via Sanity.io)
- Warm, trust-building palette (warm cream light mode, deep warm black dark mode)
- Content-first approach where reading flow is prioritized

### Key Design Tokens

| Element | Value |
|---------|-------|
| Primary (dark) | `#00B0FF` (Cobalt) |
| Primary (light) | `#0047AB` (Cobalt) |
| Background (dark) | `#0A0A0A` |
| Background (light) | `#FAF9F5` |
| Body text size | 18px desktop, 16px mobile |
| Button radius | 12px |
| Card radius | 16px |
| Body line height | 1.7 |
| Max prose width | 65ch |

### Branding

**For brand guidelines, see [BRANDING.md](BRANDING.md)**

- **Company**: nyuchi learning, a division of nyuchi africa (always lowercase)
- **Philosophy**: Ubuntu - "I am because we are" (Shona: "Ndiri nekuti tiri")
- **Palette**: Five African Minerals (Cobalt, Tanzanite, Malachite, Gold, Terracotta)
- **Fonts**: Noto Serif (H1), Plus Jakarta Sans (everything else)
- **Icons**: Lucide only, no emojis

---

## Deployment

### Vercel (Recommended)

This site is optimized for Vercel deployment:

1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Astro and configures build settings
4. Deploy

**Production URL:** [learning.nyuchi.com](https://learning.nyuchi.com)

### Manual Deployment

For other static hosting providers:

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

Supported: Netlify, Cloudflare Pages, GitHub Pages, any static file host.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Framework Contributions

- **Use the frameworks** in your school and share your experiences
- **Adapt the frameworks** to fit your local context
- **Share improvements** back with the community
- **Translate content** into local languages
- **Report issues** or suggest enhancements

### Code Contributions

1. Fork the repository
2. Create a feature branch
3. Make your changes (follow [CLAUDE.md](CLAUDE.md) guidelines)
4. Run `npm run build` to verify
5. Submit a pull request

---

## Roadmap

### Current (v5.0 - February 2026)

- Clean minimalist design (Anthropic-inspired)
- WCAG 2.2 AAA + APCA contrast testing
- Light/Dark/System theme support
- Breadcrumb navigation on all pages
- Tailwind CSS 4.1+ with comprehensive design tokens
- React 19 + Radix UI components
- Enhanced SEO with per-page sitemap priorities
- RSS feed
- AI crawler support (llms.txt)

### Planned

- Sanity.io CMS integration for blog content
- Additional frameworks
- Framework PDF generation
- Multilingual content support
- Community showcase section
- Implementation case studies

---

## Documentation

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Development & design guidelines (v5.0) |
| [BRANDING.md](BRANDING.md) | Brand guidelines (v6.0) |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment instructions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [SECURITY.md](SECURITY.md) | Security policy |

---

## About nyuchi

### nyuchi africa

Parent company, Zimbabwe-registered (2019):
- Commitment to local economy reinvestment
- Education-first mission (founder is an educator)
- Remote-first organization
- Africa-tested solutions

### nyuchi learning (This Division)

Focused on educational frameworks and digital transformation:
- Creates open, shareable implementation guides
- Serves K-12 schools across Africa and the developing world
- Community-driven improvement model
- Completely free frameworks

---

## License

**Frameworks:** Open and freely shareable. Copy, adapt, improve, and share freely.

**Website Code:** See [LICENSE](LICENSE) file for details.

---

## Contact & Links

- **Website:** [learning.nyuchi.com](https://learning.nyuchi.com)
- **Frameworks:** [learning.nyuchi.com/frameworks](https://learning.nyuchi.com/frameworks)
- **GitHub:** [github.com/nyuchitech/learning](https://github.com/nyuchitech/learning)

---

**Ubuntu:** I am because we are. We grow together, we succeed together.

---

**Last Updated:** February 2026
**Version:** 5.0 (Clean Minimalist Design, APCA Contrast, Sanity CMS)
**Maintained By:** nyuchi learning Development Team
