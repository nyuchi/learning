# K-12 Digital Campus Framework - Design Guidelines

**Last Updated**: October 2024
**Version**: 2.0 (Bold & Mobile-Optimized)
**Maintained By**: Nyuchi Learning Development Team

## Brand Identity

### Nyuchi Learning - Parent Brand

**Nyuchi Learning** is a division of Nyuchi Africa focused on educational frameworks and digital transformation for schools. Nyuchi Learning will release multiple frameworks for education across Africa.

**Company Background:**
- **Nyuchi Africa**: Zimbabwe-registered company (2019)
- **Mission**: Education-first, built by educators for education
- **Values**: Commitment to local economy reinvestment, Africa-tested solutions
- **DNA**: Remote-first, built on dusty African roads, not just theory

### K-12 Digital Campus Framework

The **K-12 Digital Campus Framework** is the first framework released by Nyuchi Learning. It provides a comprehensive blueprint for digital transformation in K-12 schools across Africa. While Nyuchi Learning provides credibility and context, the framework itself is the hero—not the company.

**Additional Frameworks:**
- **K-12 Support Process Framework**: Three-tier support system (AI chatbot, EdTech team, IT Operations)
- More frameworks coming soon

### Open & Shareable Framework

**CRITICAL MISSION**: This framework is designed to be:
- **Open** - Free to use and access
- **Shareable** - Copy and distribute to other schools
- **Adaptable** - Modify to fit your school's unique needs
- **Community-driven** - Improve it and share your innovations back

The goal is to promote digital learning so that students and communities across Africa can adapt, copy, and improve this framework to fit into their schools.

---

## Visual Brand Elements

### Zimbabwe Flag Strip - CRITICAL Brand Element

**REQUIRED on all pages:**
- 8px vertical strip on the left edge of viewport (desktop)
- 6px vertical strip on mobile (<768px)
- Fixed position (z-index: 9999)
- Four equal sections with Zimbabwe flag colors:
  - Green: `#00A651`
  - Yellow: `#FDD116`
  - Red: `#EF3340`
  - Black: `#000000`

**This element is NON-NEGOTIABLE and must appear on every page.**

```css
.zimbabwe-flag-strip {
  position: fixed;
  left: 0;
  top: 0;
  width: 8px; /* 6px on mobile */
  height: 100vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.flag-green  { flex: 1; background: #00A651; }
.flag-yellow { flex: 1; background: #FDD116; }
.flag-red    { flex: 1; background: #EF3340; }
.flag-black  { flex: 1; background: #000000; }
```

### Logo System

**Nyuchi Learning Logo**

The Nyuchi Learning logo features a stylized open book symbol representing education and learning, with Africa-inspired accent elements.

**Logo Variants:**
1. **Main (Vertical)**: Stacked layout with icon and "Nyuchi Learning" text
2. **Horizontal**: Side-by-side layout for headers and wide spaces
3. **Compact**: Icon with "N" initial for small spaces (favicons, mobile)

**Logo Files:**
- `/public/nyuchi-learning-logo-main.svg`
- `/public/nyuchi-learning-logo-horizontal.svg`
- `/public/nyuchi-learning-logo-compact.svg`
- `/public/favicon.svg` - Monochrome open book icon

**Logo Colors:**
- Icon: `#2C2C2C` (Primary Charcoal)
- "Nyuchi" text: `#2C2C2C` (Playfair Display, Bold)
- "Learning" text: `#6B7280` (Roboto, Medium)

**Usage:**
```astro
---
import Logo from '../components/Logo.astro';
---

<!-- Main logo (default: medium size) -->
<Logo />

<!-- Horizontal logo, large size -->
<Logo variant="horizontal" size="lg" />

<!-- Compact logo, small size -->
<Logo variant="compact" size="sm" />
```

---

## Color Scheme - MONOCHROME ONLY

### Primary Palette (For Content)

**CRITICAL RULE: Green is ONLY for the Zimbabwe flag strip. DO NOT use green in titles, headings, content, or UI elements.**

- **Primary (Charcoal)**: `#2C2C2C` - Primary text, headings, buttons, icons
- **Primary Dark**: `#1A1A1A` - Hover states, darker elements, CTA backgrounds
- **Text**: `#2C2C2C` - Body text color
- **Text Light**: `#6B7280` - Secondary text, captions
- **Background**: `#FAFAFA` - Off-white page background (not harsh white)
- **Background Gray**: `#F5F5F5` - Section backgrounds
- **Background Dark**: `#2C2C2C` - Footer and dark sections
- **Border**: `#E5E7EB` - Borders and dividers

### Zimbabwe Flag Colors (Flag Strip ONLY)

These colors are ONLY used in the Zimbabwe flag strip visual element:
- Green: `#00A651`
- Yellow: `#FDD116`
- Red: `#EF3340`
- Black: `#000000`
- White: `#FFFFFF`

**DO NOT use these colors elsewhere in the UI.**

---

## Typography

### Font Families

- **Headings (h1-h6)**: Playfair Display (serif)
  - Weights: 400, 600, 700, 800, 900
  - Google Fonts: `Playfair Display:wght@400;600;700;800;900`
  - Professional, elegant, educational feel
  - **Bold Design**: Use weight 800-900 for maximum impact

- **Body Text**: Roboto (sans-serif)
  - Weights: 300, 400, 500, 700
  - Google Fonts: `Roboto:wght@300;400;500;700`
  - Clean, readable, modern

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Typography Scale - BOLD DESIGN

**Hero Titles:**
```css
.hero-title {
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
```

**Section Titles:**
```css
.section-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 1;
  position: relative;
  padding-bottom: 2rem;
}

/* Underline accent */
.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px; /* 80px mobile, 60px extra-small */
  height: 6px; /* 4px mobile */
  background: var(--primary);
}
```

**Card/Feature Titles:**
```css
.feature-card h3 {
  font-size: 1.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
```

**Responsive Typography:**
- Use `clamp()` for fluid sizing across breakpoints
- Example: `clamp(1.5rem, 6vw, 2rem)` scales from 1.5rem to 2rem based on viewport width

---

## Buttons - CRITICAL Requirements

### Pill-Shaped Buttons (NON-NEGOTIABLE)

**ALL buttons MUST be pill-shaped:**
```css
border-radius: 9999px; /* REQUIRED - Creates perfect pill shape */
```

**NEVER use:**
- Square buttons
- Sharp corners
- Small border-radius values (like 0.5rem, 8px, etc.)

### Button Styles - BOLD DESIGN

**Primary Button:**
```css
.btn-primary {
  background: var(--primary);      /* Charcoal (or white on dark backgrounds) */
  color: white;                    /* (or charcoal on light backgrounds) */
  border-radius: 9999px;           /* CRITICAL */
  padding: 1.25rem 3rem;           /* Larger for bold design */
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3); /* For white buttons */
  min-height: 48px;                /* Touch accessibility */
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.5);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  color: var(--primary);            /* Charcoal (or white on dark backgrounds) */
  border: 3px solid var(--primary); /* Thicker border for bold design */
  border-radius: 9999px;            /* CRITICAL */
  padding: 1.25rem 3rem;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-height: 48px;
}

.btn-secondary:hover {
  background: var(--primary);       /* Fill on hover */
  color: white;
  border-color: var(--primary);
}
```

### Mobile Button Sizing

```css
@media (max-width: 768px) {
  .btn {
    padding: 1rem 2rem;
    font-size: 0.95rem;
    width: 100%; /* Full width on mobile */
  }
}

@media (max-width: 480px) {
  .btn {
    padding: 0.875rem 1.75rem;
    font-size: 0.9rem;
  }
}
```

---

## Icons - CRITICAL Rule

### NO EMOJIS - Use Lucide Icons ONLY

**ABSOLUTE RULE: NEVER use emojis anywhere in the codebase.**

**Required:**
- Use **Lucide icons** from `lucide-astro` package
- Icon size: 24-48px desktop, 40px mobile, 32-56px for feature icons
- Stroke width: 1.5-2 for consistency
- Color: `var(--primary)` (charcoal) for content icons

**Example Usage:**
```astro
---
import { BookOpen, Globe, Users, Menu, X } from 'lucide-astro';
---

<BookOpen class="icon" size={48} strokeWidth={1.5} />
<Menu class="mobile-menu-icon" size={28} strokeWidth={2} />
```

**Common Icons:**
- BookOpen - Education, learning
- Globe - Universal access, worldwide
- Smartphone - Mobile-first
- Users - Community, collaboration
- Settings - Technology, configuration
- BarChart - Analytics, data
- TrendingUp - Growth, improvement
- Lightbulb - Ideas, innovation
- DollarSign - Cost, budget
- Monitor - Technology
- GraduationCap - Education
- Target - Goals, mission
- Accessibility - Equity, inclusion
- Menu - Mobile hamburger menu
- X - Close mobile menu
- Download - Framework downloads
- Bot - AI chatbot
- Wrench - IT Operations

---

## Navigation

### Desktop Navigation

Standard horizontal navigation with pill-shaped hover states.

### Mobile Navigation - CRITICAL

**Hamburger Menu (Required for mobile <768px):**

```astro
<!-- Mobile Menu Button -->
<button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
  <Menu id="menuIcon" size={28} strokeWidth={2} />
  <X id="closeIcon" size={28} strokeWidth={2} style="display: none;" />
</button>

<!-- Mobile Navigation -->
<div class="nav-mobile" id="mobileMenu">
  <ul class="nav-mobile-links">
    <li><a href="/">Home</a></li>
    <li><a href="/frameworks">Frameworks</a></li>
    <li><a href="/pricing">Pricing</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</div>
```

**Mobile Menu Styles:**
```css
.mobile-menu-btn {
  display: none; /* Show only on mobile */
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  padding: 0.5rem;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}

.nav-mobile {
  display: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
}

.nav-mobile.active {
  display: block;
  max-height: 400px;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.nav-mobile-links a {
  display: block;
  padding: 1rem 1.5rem;
  min-height: 48px; /* Touch target */
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none !important;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
```

---

## Ubuntu Philosophy

### Core Message

**Ubuntu: "I am because we are"**

This philosophy should be woven throughout the content:
- Community-centered language
- Collective success over individual achievement
- "We" and "our" instead of "I" and "my"
- Emphasis on collaboration and mutual support

### Usage

- Include subtly in headers/footers
- Use in mission statements
- Emphasize in founder story
- Apply in content tone and voice
- Display prominently in hero sections and CTAs

---

## Page Layout Principles

### Framework-First Approach

**CRITICAL: This is an open, shareable educational resource, not a marketing site.**

- **Primary focus**: The framework and its practical value for schools
- **Secondary focus**: Nyuchi Learning branding for credibility
- **Content hierarchy**: Implementation guides > Features > Brand story
- **Open framework messaging**: Emphasize that it's free to copy, adapt, and improve

### Content Placement

**Homepage:**
- Hero: Bold framework value proposition + open/shareable messaging
- Features: Practical benefits for schools (6 core principles)
- Stats: Impact and data (inverted charcoal background)
- Benefits: What schools get (6 benefit cards)
- Implementation: 3-year roadmap
- CTA: Dramatic finale with Ubuntu messaging
- Credit: "Created by Nyuchi Learning, a division of Nyuchi Africa • Built by educators, for education"

**Frameworks Overview Page:**
- Hero: Introduction to all frameworks
- Framework cards: K-12 Digital Campus, Support Process
- Coming soon section

**Framework Detail Pages:**
- Header with download button
- Quick navigation (horizontal scroll on mobile)
- Comprehensive documentation sections
- Download CTA

**Pricing Page:**
- 4 pricing tiers (Free, Basic, Standard, Premium)
- Detailed cost breakdowns
- Savings strategies

**About Page:**
- Framework mission
- Founder journey and company story
- Nyuchi commitment to Zimbabwe and Africa

**Blog:**
- Blog index with post cards
- Individual blog posts

---

## Responsive Design - COMPREHENSIVE MOBILE OPTIMIZATION

### Mobile-First Philosophy

Given Africa's mobile-first reality:
- Design for mobile first, scale up
- **Touch-friendly targets: 44x44px minimum (WCAG 2.1 AA)**
- **Buttons: 48px height minimum**
- Readable font sizes (16px/1rem minimum for body)
- Simplified, hamburger navigation for small screens
- Horizontal scrolling for wide content (tables, long nav)

### Breakpoints

```css
/* Desktop/Tablet */
@media (max-width: 768px) {
  /* Mobile/tablet styles */
  /* Single-column grids */
  /* Full-width buttons */
  /* Horizontal scrolling tables */
}

/* Small phones */
@media (max-width: 480px) {
  /* Extra small screen styles */
  /* Further reduced padding */
  /* Smaller typography */
}
```

### Mobile Optimizations Applied

**Header:**
- Hamburger menu with Menu/X icon toggle
- Full-screen mobile navigation
- Auto-close menu on link click
- Logo size reduction (24px icon, hide subtext)
- 6px flag strip (from 8px desktop)

**Typography:**
- Hero titles: clamp(2rem, 10vw, 3rem) mobile
- Section titles: clamp(2rem, 8vw, 3rem) mobile
- Underlines: 4px mobile (from 6px desktop)
- All uppercase preserved on mobile

**Layouts:**
- All grids: single column below 768px
- Full-width buttons in column layout
- Cards: reduced padding (1.5-1.75rem mobile)
- Icons: 40px mobile (from 48-56px desktop)

**Navigation:**
- Framework page nav: horizontal scroll (prevents wrapping)
- Tables: horizontal scroll with min-width 600px
- Touch-friendly scroll with -webkit-overflow-scrolling

**Spacing:**
- Section padding: 4rem mobile, 3rem extra-small (from 6-7rem desktop)
- Card gaps: 1.5-2rem mobile (from 2.5-3rem desktop)
- Border widths: 5px mobile (from 6-8px desktop)

**Performance:**
- background-attachment: scroll on mobile (better performance)
- Optimized image heights (200-250px mobile)

---

## File Structure

```
/
├── public/
│   ├── nyuchi-learning-logo-main.svg
│   ├── nyuchi-learning-logo-horizontal.svg
│   ├── nyuchi-learning-logo-compact.svg
│   ├── favicon.svg
│   ├── frameworks/
│   │   ├── README.md
│   │   ├── k12-digital-campus-framework.pdf (to be generated)
│   │   └── k12-support-process-framework.pdf (to be generated)
│   └── OG-IMAGE-README.md
├── src/
│   ├── components/
│   │   ├── Logo.astro
│   │   └── SEO.astro
│   ├── layouts/
│   │   └── BaseLayout.astro       # Zimbabwe flag strip, navigation, footer
│   ├── pages/
│   │   ├── index.astro            # Homepage (bold design)
│   │   ├── frameworks.astro       # Frameworks overview
│   │   ├── framework.astro        # K-12 Digital Campus Framework
│   │   ├── support-framework.astro # K-12 Support Process Framework
│   │   ├── pricing.astro          # Pricing tiers & breakdowns
│   │   ├── about.astro            # Mission & founder story
│   │   └── blog/
│   │       ├── index.astro
│   │       ├── digital-literacy-importance.astro
│   │       ├── launching-the-framework.astro
│   │       └── why-open-source.astro
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                       # This file - Design guidelines
├── BRANDING.md                     # Nyuchi branding guidelines
├── README.md                       # Project documentation
├── DEPLOYMENT.md                   # Deployment instructions
└── robots.txt                      # SEO & AI crawler access
```

---

## Do's and Don'ts

### DO:
✅ Use Zimbabwe flag strip on every page (8px desktop, 6px mobile)
✅ Use pill-shaped buttons exclusively (border-radius: 9999px)
✅ Use Lucide icons for all visual icons
✅ Use monochrome color scheme (charcoal & off-white)
✅ Use Playfair Display for headings (weight 800-900 for bold design)
✅ Use Roboto for body text
✅ Use uppercase for hero titles and section headings (bold design)
✅ Use clamp() for responsive typography
✅ Use hamburger menu on mobile (<768px)
✅ Use horizontal scrolling for wide content on mobile
✅ Use full-width buttons on mobile
✅ Ensure 44x44px minimum touch targets (48px for buttons)
✅ Use single-column layouts on mobile
✅ Focus on framework value for schools
✅ Include Nyuchi Learning branding for credibility
✅ Emphasize open, shareable, adaptable framework nature
✅ Mention multilingual support (African languages + English, French, Chinese)
✅ Emphasize Ubuntu philosophy
✅ Design mobile-first

### DON'T:
❌ Use green/yellow/red colors outside flag strip
❌ Use square or rounded (non-pill) buttons
❌ Use emojis anywhere
❌ Use harsh black (#000) or pure white (#FFF) for content
❌ Make Nyuchi branding the hero (framework is the hero)
❌ Hide that the framework is open and shareable
❌ Use "Ubuntu" as a brand name (philosophy only)
❌ Ignore mobile experience
❌ Use fonts other than Playfair Display and Roboto
❌ Use small touch targets (<44px)
❌ Allow content to wrap/overflow on mobile (use horizontal scroll)
❌ Use font weights below 700 for bold headings
❌ Forget uppercase styling for major headings

---

## Technical Stack

- **Framework**: Astro 4.15+
- **Icons**: lucide-astro
- **Typography**: Google Fonts (Playfair Display, Roboto)
- **Deployment**: Vercel
- **Analytics**: Google Analytics (G-BNHM29F8W5)
- **Sitemap**: @astrojs/sitemap (automatic generation)
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **AI Crawlers**: Allowed (GPTBot, Claude-Web, CCBot, PerplexityBot)

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch targets**: 44x44px minimum, 48px for primary buttons
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA labels**: Where appropriate (e.g., mobile menu button)
- **Keyboard navigation**: Full keyboard support
- **Screen reader**: Compatible with screen readers
- **Focus indicators**: Visible focus states for all interactive elements
- **Responsive text**: Readable at all sizes (minimum 16px/1rem)

### Multilingual Support

The framework is designed to support multiple languages to serve diverse African communities:

**Supported Languages:**
- African languages (based on country/region)
- English
- French
- Chinese

**Implementation Approach:**
- Content adaptable to local languages
- Culturally responsive design
- Community-driven translation efforts
- Language selection based on school/region needs

---

## Content Tone & Voice

### Tone
- **Professional but accessible**: Educational authority without being intimidating
- **Educational, not promotional**: Focus on value and implementation
- **Practical and actionable**: Concrete steps, not vague promises
- **Community-centered**: Ubuntu philosophy throughout
- **Encouraging and empowering**: Positive, optimistic, realistic

### Voice
- **First-person plural** ("we", "our") - Ubuntu philosophy
- **Direct and clear**: No jargon unless necessary
- **Evidence-based**: Data, examples, case studies
- **Solutions-oriented**: Focus on what works
- **Realistic about challenges, optimistic about outcomes**
- **Bold and confident**: Matches the visual design

### Writing Guidelines
- Use active voice
- Keep sentences concise
- Break up long paragraphs
- Use bullet points and lists
- Include specific examples
- Cite sources when making claims
- Emphasize community and collaboration

---

## SEO & Discoverability

### Meta Tags (SEO.astro component)

```astro
<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />
<meta name="keywords" content={keywords} />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />

<!-- AI Crawlers -->
<meta name="robots" content="index, follow, max-image-preview:large" />
```

### Structured Data

```javascript
// Organization
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Nyuchi Learning",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Nyuchi Africa"
  }
}

// Learning Resource
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "K-12 Digital Campus Framework",
  "educationalLevel": "K-12",
  "isAccessibleForFree": true
}
```

### robots.txt

```
User-agent: *
Allow: /

# AI Crawlers (AIO - AI Optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://learning.nyuchi.com/sitemap.xml
```

---

## Updates and Maintenance

This document should be updated whenever:
- Brand guidelines change
- New design patterns are established
- Technical requirements evolve
- User feedback indicates needed clarifications
- New frameworks are added
- Mobile optimization improvements are made

### Version History

**Version 2.0** (October 2024) - Current
- Bold design with dramatic typography
- Comprehensive mobile optimization
- Hamburger menu navigation
- Multiple frameworks support
- Enhanced accessibility (WCAG 2.1 AA)
- Horizontal scrolling for wide content
- Uppercase styling for major headings
- Larger, more impactful buttons
- Section title underlines

**Version 1.0** (October 2024)
- Initial design guidelines
- Monochrome color scheme
- Zimbabwe flag strip
- Basic responsive design

---

**For specific branding guidelines, see [BRANDING.md](BRANDING.md)**
