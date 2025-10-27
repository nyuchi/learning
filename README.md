# Nyuchi Learning - Educational Frameworks for Africa

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

> **Open, shareable frameworks for digital transformation in African education.**
>
> Built by educators, for education. Copy it. Adapt it. Improve it. Share it.

## Overview

**Nyuchi Learning** is a division of Nyuchi Africa focused on creating comprehensive, open-source frameworks for digital transformation in K-12 schools across Africa. Our frameworks are designed to be freely accessible, adaptable to local contexts, and community-driven.

**Live Site:** [learning.nyuchi.com](https://learning.nyuchi.com)

### Our Frameworks

1. **K-12 Digital Campus Framework**
   - Comprehensive blueprint for digital transformation
   - Infrastructure, software, pedagogy, professional development
   - 3-year implementation roadmap
   - Free to premium pricing tiers ($0-$180K)

2. **K-12 Support Process Framework**
   - Three-tier support system (AI chatbot, EdTech team, IT Operations)
   - SLA recommendations and routing criteria
   - Implementation checklist and budget estimates

3. **More frameworks coming soon...**

### Philosophy: Ubuntu

**"I am because we are"**

This African philosophy guides everything we create:
- Community success over individual achievement
- Open and shareable resources
- Collaborative improvement
- Mutual support and growth

---

## Features

### Frameworks & Documentation

- ✅ **Multiple Frameworks**: K-12 Digital Campus and Support Process frameworks with more coming
- ✅ **Comprehensive Documentation**: Detailed implementation guides, cost breakdowns, technical specifications
- ✅ **Download Options**: PDF downloads for offline access and sharing
- ✅ **Pricing Tiers**: Free/open-source to premium options ($0-$180K range)

### Design & User Experience

- ✅ **Bold, Modern Design**: Dramatic typography with maximum visual impact
- ✅ **Mobile-First**: Fully optimized for smartphones and tablets
- ✅ **Hamburger Navigation**: Touch-friendly mobile menu
- ✅ **Responsive Typography**: Fluid sizing using clamp() functions
- ✅ **Touch Accessibility**: 44x44px minimum touch targets (WCAG 2.1 AA compliant)
- ✅ **Zimbabwe Brand Element**: Signature flag strip on all pages

### Technical Excellence

- ✅ **Fast & Performant**: Built with Astro for optimal speed
- ✅ **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards
- ✅ **AI-Friendly**: Allows GPTBot, Claude-Web, CCBot, PerplexityBot
- ✅ **Automatic Sitemap**: Generated via @astrojs/sitemap
- ✅ **Google Analytics**: Integrated tracking (G-BNHM29F8W5)
- ✅ **Structured Data**: JSON-LD for educational organizations and resources

### Accessibility

- ✅ **WCAG 2.1 AA Compliant**: Color contrast, keyboard navigation, screen reader support
- ✅ **Mobile Optimized**: Horizontal scrolling for tables, single-column layouts
- ✅ **Touch-Friendly**: 48px button heights, large tap zones
- ✅ **Multilingual Support**: Designed for African languages, English, French, Chinese

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro 4.15+** | Static site generator, optimal performance |
| **TypeScript** | Type safety and better developer experience |
| **Lucide Icons** | Beautiful, consistent icon system (no emojis) |
| **Google Fonts** | Playfair Display (headings) & Roboto (body) |
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
│   ├── frameworks/            # Framework PDF downloads (to be generated)
│   └── robots.txt             # SEO & AI crawler configuration
├── src/
│   ├── components/
│   │   ├── Logo.astro         # Nyuchi Learning logo component
│   │   └── SEO.astro          # Reusable SEO component
│   ├── layouts/
│   │   └── BaseLayout.astro   # Global layout (header, footer, flag strip)
│   ├── pages/
│   │   ├── index.astro        # Homepage (bold design)
│   │   ├── frameworks.astro   # Frameworks overview
│   │   ├── framework.astro    # K-12 Digital Campus Framework
│   │   ├── support-framework.astro  # K-12 Support Process Framework
│   │   ├── pricing.astro      # Pricing tiers and cost breakdowns
│   │   ├── about.astro        # Mission, story, and team
│   │   └── blog/              # Blog posts and insights
│   └── env.d.ts               # TypeScript environment definitions
├── astro.config.mjs           # Astro configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── CLAUDE.md                  # Design guidelines and technical docs
├── BRANDING.md                # Nyuchi Learning brand guidelines
├── DEPLOYMENT.md              # Deployment instructions
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
- **Monochrome color scheme**: Charcoal (#2C2C2C) and off-white (#FAFAFA)
- **Bold typography**: Playfair Display (800-900 weight) for headings, Roboto for body
- **Pill-shaped buttons**: border-radius: 9999px (NON-NEGOTIABLE)
- **Lucide icons only**: No emojis allowed
- **Zimbabwe flag strip**: 8px vertical strip on left edge (6px on mobile)
- **Mobile-first**: Touch targets 44x44px minimum, buttons 48px height
- **Uppercase headings**: Bold design aesthetic for major titles

### Branding

**For brand guidelines, see [BRANDING.md](BRANDING.md)**

Key elements:
- **Company**: Nyuchi Learning, a division of Nyuchi Africa
- **Philosophy**: Ubuntu - "I am because we are"
- **Mission**: Open, shareable frameworks for African education
- **Values**: Education-first, community-driven, Africa-tested

### Accessibility Standards

- **WCAG 2.1 AA compliance** minimum
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch targets**: 44x44px minimum, 48px for buttons
- **Keyboard navigation**: Full keyboard support required
- **Screen reader**: Compatible with all major screen readers
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
   - Free to premium options ($0-$180K)
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
- Accessibility standards (WCAG 2.1 AA)
- Mobile-first approach

---

## Roadmap

### Current (v2.0 - October 2024)

- ✅ K-12 Digital Campus Framework
- ✅ K-12 Support Process Framework
- ✅ Bold, mobile-optimized design
- ✅ Comprehensive pricing tiers
- ✅ SEO and AI optimization
- ✅ Google Analytics integration

### Planned

- 📋 Additional frameworks (TBD)
- 📋 Framework PDF generation automation
- 📋 Multilingual content support
- 📋 Community showcase section
- 📋 Implementation case studies
- 📋 Interactive implementation tools

---

## Documentation

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Comprehensive design and technical guidelines |
| [BRANDING.md](BRANDING.md) | Nyuchi Learning brand guidelines |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment instructions and configuration |
| [README.md](README.md) | This file - Project overview and quickstart |

---

## About Nyuchi

### Nyuchi Africa

Parent company, Zimbabwe-registered (2019):
- Commitment to local economy reinvestment
- Education-first mission (founder is an educator)
- Remote-first organization
- Africa-tested solutions

### Nyuchi Learning (This Division)

Focused on educational frameworks and digital transformation:
- Creates open, shareable implementation guides
- Serves K-12 schools across Africa
- Community-driven improvement model
- Free to premium solution options

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

**Last Updated:** October 2024
**Version:** 2.0 (Bold & Mobile-Optimized)
**Maintained By:** Nyuchi Learning Development Team
