# African Education Framework - Design Guidelines

## Brand Identity

### Nyuchi Africa - Visual Identity

The African Education Framework is a **Nyuchi Africa** initiative. While Nyuchi branding provides credibility and context, the framework itself is the hero—not the company.

### Zimbabwe Flag Strip - CRITICAL Brand Element

**REQUIRED on all pages:**
- 8px vertical strip on the left edge of viewport
- Fixed position (z-index: 9999)
- Four equal sections with Zimbabwe flag colors:
  - Green: `#00A651`
  - Yellow: `#FDD116`
  - Red: `#EF3340`
  - Black: `#000000`

**This element is NON-NEGOTIABLE and must appear on every page.**

## Color Scheme - MONOCHROME ONLY

### Primary Palette (For Content)

**CRITICAL RULE: Green is ONLY for the Zimbabwe flag strip. DO NOT use green in titles, headings, content, or UI elements.**

- **Primary (Charcoal)**: `#2C2C2C` - Used for primary text, headings, buttons, icons
- **Primary Dark**: `#1A1A1A` - Used for hover states and darker elements
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

## Typography

### Font Families

- **Headings (h1-h6)**: Playfair Display (serif, weight: 700)
  - Google Fonts: `Playfair Display:wght@400;600;700`
  - Professional, elegant, educational feel

- **Body Text**: Roboto (sans-serif, weights: 300, 400, 500, 700)
  - Google Fonts: `Roboto:wght@300;400;500;700`
  - Clean, readable, modern

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

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

### Button Styles

**Primary Button:**
```css
.btn-primary {
  background: var(--primary);      /* Charcoal */
  color: white;
  border-radius: 9999px;           /* CRITICAL */
  padding: 0.75rem 2rem;
  font-weight: 600;
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  color: var(--primary);            /* Charcoal */
  border: 2px solid var(--primary);
  border-radius: 9999px;            /* CRITICAL */
  padding: 0.75rem 2rem;
  font-weight: 600;
}
```

## Icons - CRITICAL Rule

### NO EMOJIS - Use Lucide Icons ONLY

**ABSOLUTE RULE: NEVER use emojis anywhere in the codebase.**

**Required:**
- Use **Lucide icons** from `lucide-astro` package
- Icon size: Typically 24-48px depending on context
- Stroke width: 1.5-2 for consistency
- Color: `var(--primary)` (charcoal) for content icons

**Example Usage:**
```astro
---
import { BookOpen, Globe, Users } from 'lucide-astro';
---

<BookOpen class="icon" size={48} strokeWidth={1.5} />
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

## Page Layout Principles

### Framework-First Approach

**CRITICAL: This is an educational resource, not a marketing site.**

- **Primary focus**: The framework and its practical value for schools
- **Secondary focus**: Nyuchi branding for credibility
- **Content hierarchy**: Implementation guides > Features > Brand story

### Zimbabwe Branding Context

Nyuchi Africa is a **Zimbabwe-registered company (2019)** with:
- Commitment to local economy reinvestment
- Education-first mission (founder is educator)
- Remote-first DNA (built on dusty African roads)
- Africa-tested solutions (not just theory)

### Content Placement

**Homepage:**
- Hero: Framework value proposition
- Features: Practical benefits for schools
- Implementation: Clear roadmap
- Credit: "Created by Nyuchi Africa • Built by educators, for education"

**About Page:**
- Framework mission
- Founder journey and company story
- Nyuchi commitment to Zimbabwe and Africa

**Framework Page:**
- Comprehensive technical documentation
- Implementation guides
- No heavy branding

## Responsive Design

### Mobile-First Philosophy

Given Africa's mobile-first reality:
- Design for mobile first, scale up
- Touch-friendly targets (44x44px minimum)
- Readable font sizes (16px minimum for body)
- Simplified navigation for small screens

### Breakpoints

```css
@media (max-width: 768px) {
  /* Mobile/tablet styles */
}
```

## File Structure

```
src/
├── layouts/
│   └── BaseLayout.astro       # Zimbabwe flag strip, global styles
├── pages/
│   ├── index.astro            # Homepage (framework-focused)
│   ├── framework.astro        # Full framework documentation
│   ├── about.astro            # Mission & founder story
│   └── blog/
│       ├── index.astro
│       └── [articles].astro
└── components/
    └── [shared components]
```

## Do's and Don'ts

### DO:
✅ Use Zimbabwe flag strip on every page
✅ Use pill-shaped buttons exclusively
✅ Use Lucide icons for all visual icons
✅ Use monochrome color scheme (charcoal & off-white)
✅ Use Playfair Display for headings
✅ Use Roboto for body text
✅ Focus on framework value for schools
✅ Include Nyuchi branding for credibility
✅ Emphasize Ubuntu philosophy
✅ Design mobile-first

### DON'T:
❌ Use green/yellow colors outside flag strip
❌ Use square or rounded (non-pill) buttons
❌ Use emojis anywhere
❌ Use harsh black (#000) or pure white (#FFF) for content
❌ Make Nyuchi branding the hero (framework is the hero)
❌ Use "Ubuntu" as a brand name (philosophy only)
❌ Ignore mobile experience
❌ Use fonts other than Playfair Display and Roboto

## Technical Stack

- **Framework**: Astro 4.15+
- **Icons**: lucide-astro
- **Typography**: Google Fonts (Playfair Display, Roboto)
- **Deployment**: Vercel
- **Analytics**: (Optional) Vercel Analytics

## Accessibility

- WCAG 2.1 AA compliance minimum
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader compatibility

## Content Tone & Voice

### Tone
- Professional but accessible
- Educational, not promotional
- Practical and actionable
- Community-centered
- Encouraging and empowering

### Voice
- First-person plural ("we", "our") - Ubuntu philosophy
- Direct and clear
- Evidence-based
- Solutions-oriented
- Realistic about challenges, optimistic about outcomes

## Updates and Maintenance

This document should be updated whenever:
- Brand guidelines change
- New design patterns are established
- Technical requirements evolve
- User feedback indicates needed clarifications

**Last Updated**: October 2024
**Maintained By**: Nyuchi Africa Development Team
