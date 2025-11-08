## Summary

This PR migrates the design system from v2.0 (bold, dramatic) to v4.1 (Claude-aligned: warm, editorial, sophisticated).

### Key Changes

**Typography Migration:**
- ❌ Old: Playfair Display + Roboto → ✅ New: Newsreader (H1/H2) + Inter (H3-H6/body/UI)
- Editorial serif for major titles, clean sans-serif for body and UI

**Color System Migration:**
- ❌ Old: Charcoal (#2C2C2C) as primary → ✅ New: Warm purple (#8B80E8) as primary UI color
- ✅ New: Charcoal (#2B2B2B) ONLY for backgrounds and dark sections
- ✅ New: Warm emerald (#18A877), warm brown (#A67557) for accents

**Button Style Migration:**
- ❌ Old: Pill-shaped (border-radius: 9999px) → ✅ New: Claude-style rounded (border-radius: 10px)
- Subtle hover effects with soft shadows

**Hero Section Redesign:**
- ❌ Removed: Background images, water trail animations, scroll indicators
- ✅ New: Minimalist design with clean gradient background
- ✅ Optimized spacing for 13" laptop screens

**Logo System Updates:**
- Updated all logo files (favicon, main, horizontal, compact) to use new branding
- Icon colors: \`#2C2C2C\` → \`#2B2B2B\` (warm charcoal)
- "Nyuchi" text font: \`Playfair Display\` → \`Newsreader\`
- "Learning" text font: \`Roboto\` → \`Inter\`
- All logos now consistently use the open book icon design

**Spacing & Layout Optimization:**
- Container max-width: 1200px → 1100px (optimized for 13" screens)
- Section padding: 8rem → 5rem (better spacing for smaller screens)
- Hero title size: reduced for better readability
- Fixed header padding issues (added 120px top padding to hero)

### Files Changed

**Design Guidelines:**
- **CLAUDE.md**: Updated to v3.0 design guidelines with comprehensive migration guide

**Layout & Components:**
- **BaseLayout.astro**: New fonts, color variables, rounded buttons, warm flag colors
- **index.astro**: Minimalist hero, optimized spacing, updated buttons

**Logo System:**
- **public/favicon.svg**: Updated to warm charcoal (#2B2B2B)
- **public/nyuchi-learning-logo-main.svg**: New fonts (Newsreader/Inter) and colors
- **public/nyuchi-learning-logo-horizontal.svg**: New fonts and colors
- **public/nyuchi-learning-logo-compact.svg**: New fonts and colors

### Design Philosophy

The new design is:
- **Editorial & Sophisticated**: Uses serif titles for trust and authority
- **Warm & Approachable**: Earth tones create a friendly, inviting feel
- **Modern & Accessible**: Clean sans-serif for readability
- **Professional**: Soft shadows, generous spacing, thoughtful hierarchy

### Commits

1. \`Update branding to v4.1 (Claude-Aligned Design)\` - Main design system migration
2. \`Update logo system with v4.1 branding\` - Logo updates with new fonts and colors

## Test Plan

**Typography:**
- [ ] Verify Newsreader font loads correctly for H1/H2 titles
- [ ] Verify Inter font loads correctly for H3-H6/body/UI
- [ ] Check logos display correctly with new fonts

**Colors:**
- [ ] Check warm purple (#8B80E8) is used for headings, text, links, buttons, icons
- [ ] Check charcoal (#2B2B2B) is only used for backgrounds/footer
- [ ] Verify Zimbabwe flag strip uses warm colors
- [ ] Verify all logos use warm charcoal (#2B2B2B)

**Layout:**
- [ ] Verify all buttons have 10px border-radius (not pill-shaped)
- [ ] Test hero section is minimalist without images
- [ ] Verify spacing works well on 13" laptop screens (1280-1440px width)
- [ ] Test responsive design on mobile (<768px)
- [ ] Verify all touch targets are 44x44px minimum
- [ ] Test button hover states (subtle lift + shadow)

**Logo System:**
- [ ] Verify favicon displays correctly in browser tab
- [ ] Check main logo (vertical layout) renders properly
- [ ] Check horizontal logo displays correctly in header
- [ ] Check compact logo works for small spaces
- [ ] Verify all logo variants use open book icon consistently
