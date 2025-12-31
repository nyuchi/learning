# Nyuchi Learning - Build Digital Campuses. Prepare for 2050.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

> **Open, shareable frameworks for building and upgrading digital campuses and digital literacy programs.**
>
> Built by educators, for education. Copy it. Adapt it. Improve it. Share it.

## Overview

**Nyuchi Learning** is a division of Nyuchi Africa focused on creating comprehensive, open-source frameworks for digital transformation in K-12 schools across Africa and the developing world. Our frameworks are designed to be freely accessible, adaptable to local contexts, and community-driven.

**The frameworks are completely free.** We provide guidance on how to build or upgrade to a digital campus—schools implement the recommendations using their own resources and vendors.

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

### Frameworks & Documentation

- **Multiple Frameworks**: K-12 Digital Campus, Digital Literacy, and Support Process frameworks
- **Comprehensive Documentation**: Detailed implementation guides, budget estimates, technical specifications
- **Download Options**: Markdown downloads for offline access and sharing
- **Budget Planning**: Four budget scenarios from minimal to comprehensive implementation

### Design & User Experience

- **Modern Design**: Bundu Brand System with Five African Minerals palette
- **Dark Mode**: Slate-based dark theme with Cobalt (education) as primary color
- **Mobile-First**: Fully optimized for smartphones and tablets
- **Responsive Navigation**: Touch-friendly mobile menu with auto-hide header
- **WCAG AAA Compliant**: 7:1+ color contrast ratios throughout
- **Minerals Strip**: Signature 5-color vertical strip (desktop only)

### Technical Excellence

- **Fast & Performant**: Built with Astro for optimal speed
- **Tailwind CSS v4**: Utility-first CSS with design tokens
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards
- **AI-Friendly**: Allows GPTBot, Claude-Web, CCBot, PerplexityBot
- **Automatic Sitemap**: Generated via @astrojs/sitemap
- **Google Analytics**: Integrated tracking (G-BNHM29F8W5)
- **Structured Data**: JSON-LD for educational organizations and resources

### Accessibility

- **WCAG 2.1 AAA Compliant**: Color contrast (7:1+), keyboard navigation, screen reader support
- **Mobile Optimized**: Horizontal scrolling for tables, single-column layouts
- **Touch-Friendly**: 48px button heights, 44x44px minimum touch targets
- **Reduced Motion**: Respects prefers-reduced-motion preference
- **Multilingual Support**: Designed for African languages, English, French, Chinese

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro 4.15+** | Static site generator, optimal performance |
| **Tailwind CSS v4** | Utility-first CSS with design tokens |
| **TypeScript** | Type safety and better developer experience |
| **Lucide Icons** | Beautiful, consistent icon system (no emojis) |
| **Google Fonts** | Noto Serif (H1) & Plus Jakarta Sans (H2-H6, body) |
| **@astrojs/sitemap** | Automatic sitemap generation |
| **Vercel** | Deployment and hosting |
| **Google Analytics** | Usage tracking and insights |

---

## Project Structure

```
/
├── public/                     # Static assets
│   ├── nyuchi-learning-logo-*.svg  # Logo variants
│   ├── favicon.svg            # Brand favicon
│   ├── frameworks/            # Framework documentation (Markdown)
│   └── robots.txt             # SEO & AI crawler configuration
├── src/
│   ├── components/
│   │   ├── Logo.astro         # Nyuchi Learning logo component
│   │   └── SEO.astro          # Reusable SEO component
│   ├── layouts/
│   │   └── BaseLayout.astro   # Global layout (header, footer, Minerals Strip)
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── frameworks.astro   # Frameworks overview
│   │   ├── framework.astro    # K-12 Digital Campus Framework
│   │   ├── digital-literacy-framework.astro  # Digital Literacy Framework
│   │   ├── support-framework.astro  # K-12 Support Process Framework
│   │   ├── pricing.astro      # Budget planning guide
│   │   ├── resources.astro    # Resources hub (coming soon)
│   │   ├── about.astro        # Mission & Impact
│   │   ├── global-reach.astro # Geographic scope
│   │   ├── team.astro         # Team page
│   │   ├── community.astro    # Community & GitHub
│   │   ├── consultation.astro # Book a consultation
│   │   └── blog/              # Blog posts and insights
│   └── env.d.ts               # TypeScript environment definitions
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── CLAUDE.md                  # Design guidelines and technical docs
├── BRANDING.md                # Nyuchi Learning brand guidelines
├── DEPLOYMENT.md              # Deployment instructions
├── CONTRIBUTING.md            # Contribution guidelines
├── CHANGELOG.md               # Version history
├── SECURITY.md                # Security policy
└── README.md                  # This file
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
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
```

---

## Development Guidelines

### Design System

**For comprehensive design guidelines, see [CLAUDE.md](CLAUDE.md)**

Key principles:
- **Bundu Brand System**: Five African Minerals palette (Cobalt, Tanzanite, Malachite, Gold, Terracotta)
- **Education Theme**: Cobalt (#00B0FF) as primary color on Slate dark surfaces
- **Typography**: Noto Serif for H1 headings, Plus Jakarta Sans for H2-H6 and body
- **Buttons**: 12px border-radius (NOT pill-shaped)
- **Cards**: 16px border-radius with soft shadows
- **Lucide icons only**: No emojis allowed
- **Minerals Strip**: 4px vertical strip on left edge (hidden on mobile <480px)
- **Mobile-first**: Touch targets 44x44px minimum, buttons 48px height
- **Lowercase wordmarks**: Brand names always lowercase (nyuchi, bundu)

### Branding

**For brand guidelines, see [BRANDING.md](BRANDING.md)**

Key elements:
- **Company**: nyuchi learning, a division of nyuchi africa (lowercase)
- **Philosophy**: Ubuntu - "I am because we are" (Shona: "Ndiri nekuti tiri")
- **Mission**: Open, shareable frameworks for digital campus transformation
- **Values**: Education-first, community-driven, Africa-tested

### Accessibility Standards

- **WCAG 2.1 AAA compliance** (7:1+ contrast ratios)
- **Touch targets**: 44x44px minimum, 48px for buttons
- **Keyboard navigation**: Full keyboard support required
- **Screen reader**: Compatible with all major screen readers
- **Reduced motion**: Respects prefers-reduced-motion preference
- **Responsive text**: Minimum 16px/1rem for body text

---

## Deployment

### Vercel (Recommended)

This site is optimized for Vercel deployment:

1. **Push code to GitHub**
2. **Import repository in Vercel**
3. **Vercel auto-detects Astro** and configures build settings
4. **Deploy!**

**Production URL:** [learning.nyuchi.com](https://learning.nyuchi.com)

### Manual Deployment

For other static hosting providers:

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

Supported platforms:
- Netlify
- Cloudflare Pages
- GitHub Pages
- Any static file host

---

## Framework Principles

### Core Values

1. **Universal Access**
   - Digital tools available to all students
   - Regardless of socioeconomic status
   - Mobile-first approach

2. **Digital Literacy**
   - Technology skills + critical thinking
   - Safe, responsible digital citizenship
   - K-12 progression pathway

3. **Mobile-First**
   - Smartphones as primary devices
   - Low-bandwidth considerations
   - Touch-optimized interfaces

4. **Cost Efficient**
   - Open-source solutions prioritized
   - Budget scenarios from minimal to comprehensive
   - Maximum value from limited budgets

5. **Data-Driven**
   - Analytics inform instruction and strategy
   - Early warning systems
   - Personalized learning pathways

6. **Community-Centered**
   - Seamless experience for students, staff, parents
   - Ubuntu philosophy throughout
   - Collaborative improvement

### Multilingual Support

Designed to support diverse African communities:
- **African languages** (based on country/region)
- **English**
- **French**
- **Chinese**

Implementation is community-driven and adaptable to local needs.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Framework Evolution

These frameworks are designed to evolve through community feedback and contributions:

- **Use the frameworks** in your school and share your experiences
- **Adapt the frameworks** to fit your local context
- **Share improvements** back with the community
- **Translate content** into local languages
- **Report issues** or suggest enhancements

### Code Contributions

While the frameworks are open and shareable, code contributions to the website follow standard practices:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

**Please follow:**
- Design guidelines in [CLAUDE.md](CLAUDE.md)
- Brand guidelines in [BRANDING.md](BRANDING.md)
- Accessibility standards (WCAG 2.1 AAA)
- Mobile-first approach

---

## Roadmap

### Current (v4.0 - December 2025)

- K-12 Digital Campus Framework
- Digital Literacy Framework
- K-12 Support Process Framework
- Bundu Brand System with Five African Minerals
- Tailwind CSS v4 integration
- Dark mode with Slate theme
- Budget planning guide (replaces pricing)
- SEO and AI optimization
- Google Analytics integration

### Planned

- Additional frameworks (TBD)
- Framework PDF generation automation
- Multilingual content support
- Community showcase section
- Implementation case studies
- Interactive implementation tools

---

## Documentation

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Comprehensive design and technical guidelines |
| [BRANDING.md](BRANDING.md) | Nyuchi Learning brand guidelines |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment instructions and configuration |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [CHANGELOG.md](CHANGELOG.md) | Version history and changes |
| [SECURITY.md](SECURITY.md) | Security policy |
| [README.md](README.md) | This file - Project overview and quickstart |

---

## About Nyuchi

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
- Completely free frameworks—no paid services

---

## License

**Frameworks:** Open and freely shareable under open framework license. Copy, adapt, improve, and share freely.

**Website Code:** See [LICENSE](LICENSE) file for details.

---

## Contact & Links

- **Website:** [learning.nyuchi.com](https://learning.nyuchi.com)
- **Frameworks:** [learning.nyuchi.com/frameworks](https://learning.nyuchi.com/frameworks)
- **GitHub:** [github.com/nyuchitech/learning](https://github.com/nyuchitech/learning)

---

## Acknowledgments

Built with gratitude for:
- The African education community
- Open-source contributors worldwide
- Educators sharing their experiences
- Schools implementing these frameworks

**Ubuntu:** I am because we are. We grow together, we succeed together.

---

**Last Updated:** December 2025
**Version:** 4.0 (Bundu Brand System, Five African Minerals, Tailwind CSS v4)
**Maintained By:** nyuchi learning Development Team
