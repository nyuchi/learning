# Contributing to Nyuchi Learning

Thank you for your interest in contributing to Nyuchi Learning! This project is built on the Ubuntu philosophy: "I am because we are." We welcome contributions from educators, developers, and community members worldwide.

## Table of Contents

- [Types of Contributions](#types-of-contributions)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Framework Contributions](#framework-contributions)
- [Community Guidelines](#community-guidelines)

## Types of Contributions

### Framework Contributions

The educational frameworks are the heart of this project. You can contribute by:

- **Using the frameworks** and sharing your implementation experiences
- **Adapting frameworks** to your local context and sharing adaptations
- **Translating content** into local languages (African languages, French, Chinese, etc.)
- **Suggesting improvements** based on real-world use
- **Contributing case studies** from schools using the frameworks

### Code Contributions

For the website codebase:

- **Bug fixes**: Fixing issues with the website
- **Feature additions**: New functionality aligned with project goals
- **Accessibility improvements**: Enhancing WCAG compliance
- **Performance optimizations**: Improving site speed and efficiency
- **Documentation**: Improving README, CLAUDE.md, or inline comments

### Content Contributions

- **Blog posts**: Educational insights, implementation guides, case studies
- **Framework documentation**: Clarifications, examples, best practices
- **Translations**: Making content accessible in more languages

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)
- **Git** for version control
- Basic familiarity with:
  - Astro 5.x framework
  - Tailwind CSS 4.x
  - TypeScript (strict mode)
  - React (for interactive components)

### Local Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/learning.git
   cd learning
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:4321`

### Project Structure

```
src/
├── components/     # Reusable components (Logo, SEO, ThemeToggle, PageBreadcrumb, etc.)
├── layouts/        # Page layouts (BaseLayout.astro - master layout)
├── lib/            # Utility functions
├── pages/          # File-based routing
│   └── blog/       # Blog posts
├── styles/
│   └── global.css  # Tailwind theme, design tokens, component & accessibility layers
public/
├── frameworks/     # Framework documentation (Markdown)
├── llms.txt        # AI crawler directives
└── *.svg           # Logo and brand assets
```

## Development Workflow

### Branch Naming

Use descriptive branch names:

```bash
# Features
git checkout -b feature/add-swahili-translation
git checkout -b feature/improve-mobile-nav

# Bug fixes
git checkout -b fix/broken-link-about-page
git checkout -b fix/accessibility-contrast

# Documentation
git checkout -b docs/update-framework-guide
git checkout -b docs/add-case-study
```

### Making Changes

1. **Create a branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**
   ```bash
   npm run build    # Ensure build passes
   npm run preview  # Test production build
   ```

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add Swahili translation for homepage"
   git commit -m "fix: correct contrast ratio on pricing cards"
   git commit -m "docs: update budget planning section"
   ```

### Commit Message Format

We use conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, not CSS)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add Digital Literacy Framework page
fix: resolve mobile menu toggle on Safari
docs: update README with new budget scenarios
style: format Astro components with Prettier
refactor: migrate pricing page to Tailwind CSS
```

## Coding Standards

### Design System

Follow the Bundu Brand System as documented in [CLAUDE.md](CLAUDE.md):

- **Colors**: Five African Minerals palette (Cobalt primary for education)
- **Typography**: Noto Serif for H1, Plus Jakarta Sans for body
- **Buttons**: 12px border-radius, NOT pill-shaped
- **Cards**: 16px border-radius with soft shadows
- **Icons**: Lucide icons only, no emojis

### Accessibility Requirements

All contributions must maintain WCAG 2.2 AAA compliance and should be tested against APCA (WCAG 3.0 draft):

- **Color contrast**: WCAG 2.2 AAA (7:1+) for normal text, plus APCA Lc 60+ for body text
- **Touch targets**: 44x44px minimum, 48px for primary buttons
- **Keyboard navigation**: All interactive elements accessible with visible focus indicators
- **Screen reader**: Proper ARIA labels, semantic HTML, landmarks
- **Reduced motion**: Respect `prefers-reduced-motion`
- **Theme support**: Changes must work in both light and dark modes
- **Breadcrumbs**: All interior pages must include PageBreadcrumb component

### Mobile-First Development

- Design for mobile first, then enhance for desktop
- Test on mobile viewports (375px, 390px, 414px)
- Ensure touch targets are 48px minimum for buttons
- Use responsive typography with `clamp()`

### Tailwind CSS Guidelines

```astro
<!-- Use design tokens via CSS variables -->
<div class="bg-[var(--bg-surface)] text-[var(--text)]">

<!-- Use Tailwind utilities for spacing and layout -->
<div class="p-6 md:p-8 rounded-2xl">

<!-- Combine as needed -->
<button class="bg-[var(--primary)] text-white px-6 py-3 rounded-xl">
```

### Component Structure

```astro
---
// 1. Imports
import BaseLayout from '../layouts/BaseLayout.astro';
import { BookOpen } from 'lucide-astro';

// 2. TypeScript types
interface Props {
  title: string;
}

// 3. Props extraction
const { title } = Astro.props;
---

<!-- 4. Template -->
<BaseLayout title={title}>
  <section class="py-16 px-6">
    <h1 class="font-display text-4xl">{title}</h1>
  </section>
</BaseLayout>
```

## Submitting Changes

### Pull Request Process

1. **Update your branch** with latest main
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what and why
   - Screenshots for visual changes
   - Reference to related issues

### Pull Request Template

```markdown
## Summary
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Framework content update

## Checklist
- [ ] `npm run build` passes
- [ ] Tested on mobile viewport (375px, 393px)
- [ ] Breadcrumbs present on interior pages
- [ ] Both light and dark themes work
- [ ] Accessibility verified (WCAG 2.2 AAA contrast, keyboard nav, touch targets)
- [ ] No emojis used (Lucide icons only)
- [ ] No decorative images (typography and whitespace for visual interest)
- [ ] Follows design guidelines in CLAUDE.md

## Screenshots (if applicable)
```

### Review Process

- Maintainers will review within 3-5 business days
- We may request changes or clarification
- Once approved, we will merge your contribution
- You will be credited in the changelog

## Framework Contributions

### Adapting Frameworks

When adapting frameworks for your context:

1. **Document your adaptations** - What did you change and why?
2. **Share results** - How did it work in practice?
3. **Consider generalization** - Could your adaptation help others?

### Suggesting Framework Changes

For framework content changes:

1. Open an issue first to discuss the change
2. Explain the rationale based on real-world experience
3. Provide evidence or case studies if available
4. Be patient - framework changes require careful review

### Translations

To contribute a translation:

1. Open an issue to claim a language
2. We'll provide translation guidelines
3. Submit translations via pull request
4. Native speaker review required before merge

## Community Guidelines

### Ubuntu Philosophy

Remember: "I am because we are"

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Share knowledge freely
- Credit others' contributions
- Assume good intentions

### Code of Conduct

- Be kind and respectful
- No harassment or discrimination
- Constructive feedback only
- Support fellow contributors
- Focus on what's best for the community

### Getting Help

- **Questions**: Open a GitHub discussion
- **Bugs**: Open an issue with reproduction steps
- **Ideas**: Open an issue for discussion
- **Security**: Email security@nyuchi.com (see [SECURITY.md](SECURITY.md))

## Recognition

All contributors are recognized:

- Listed in pull request acknowledgments
- Credited in CHANGELOG.md
- Mentioned in release notes

## Thank You

Your contributions help improve education across Africa and the developing world. Every improvement, no matter how small, makes a difference.

**Ubuntu: I am because we are. We build together, we grow together.**

---

Questions? Open an issue or reach out via GitHub discussions.
