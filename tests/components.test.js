/**
 * Component Structure & Integrity Tests
 *
 * Validates that all required components:
 * - Exist with correct filenames
 * - Follow architecture rules (no hardcoded styling in components)
 * - Use correct imports and patterns
 * - React UI components follow shadcn/ui conventions
 * - Components use design tokens and semantic classes
 *
 * Tests source files, not built output.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const COMPONENTS_DIR = join(process.cwd(), 'src/components');
const UI_DIR = join(COMPONENTS_DIR, 'ui');
const LIB_DIR = join(process.cwd(), 'src/lib');

// ========================================
// REQUIRED ASTRO COMPONENTS
// ========================================
describe('Required Astro components exist', () => {
  const requiredAstroComponents = [
    'BaseLayout.astro',
    'Logo.astro',
    'SEO.astro',
    'ThemeToggle.astro',
    'PageBreadcrumb.astro',
    'PageHero.astro',
    'FeatureGrid.astro',
    'CTASection.astro',
    'MetricCard.astro',
    'MetricGroup.astro',
    'ShareButton.astro',
    'BuilderBox.astro',
    'InfoTooltip.astro',
    'UserAvatar.astro',
  ];

  // BaseLayout is in layouts/ dir
  it('BaseLayout.astro should exist in layouts/', () => {
    expect(existsSync(join(process.cwd(), 'src/layouts/BaseLayout.astro'))).toBe(true);
  });

  it.each(
    requiredAstroComponents
      .filter((c) => c !== 'BaseLayout.astro')
      .map((c) => [c])
  )('%s should exist in components/', (componentName) => {
    const filePath = join(COMPONENTS_DIR, componentName);
    expect(existsSync(filePath)).toBe(true);
  });
});

// ========================================
// REACT UI COMPONENTS (shadcn/ui)
// ========================================
describe('React UI components', () => {
  const expectedUiComponents = [
    'accordion.tsx',
    'avatar.tsx',
    'badge.tsx',
    'breadcrumb.tsx',
    'button.tsx',
    'card.tsx',
    'dialog.tsx',
    'dropdown-menu.tsx',
    'input.tsx',
    'label.tsx',
    'navigation-menu.tsx',
    'scroll-area.tsx',
    'separator.tsx',
    'tabs.tsx',
    'tooltip.tsx',
  ];

  it('ui/ directory should exist', () => {
    expect(existsSync(UI_DIR)).toBe(true);
  });

  it.each(
    expectedUiComponents.map((c) => [c])
  )('ui/%s should exist', (componentName) => {
    const filePath = join(UI_DIR, componentName);
    expect(existsSync(filePath)).toBe(true);
  });

  it('ui/index.ts barrel export should exist', () => {
    expect(existsSync(join(UI_DIR, 'index.ts'))).toBe(true);
  });
});

// ========================================
// cn() UTILITY
// ========================================
describe('cn() utility function', () => {
  it('lib/utils.ts should exist', () => {
    expect(existsSync(join(LIB_DIR, 'utils.ts'))).toBe(true);
  });

  it('should export cn function', () => {
    const utils = readFileSync(join(LIB_DIR, 'utils.ts'), 'utf-8');
    expect(utils).toContain('export function cn');
  });

  it('should use clsx and tailwind-merge', () => {
    const utils = readFileSync(join(LIB_DIR, 'utils.ts'), 'utf-8');
    expect(utils).toContain('clsx');
    expect(utils).toContain('twMerge');
  });
});

// ========================================
// COMPONENT PATTERNS & ARCHITECTURE
// ========================================
describe('Component architecture compliance', () => {
  it('SEO.astro should accept pageType prop', () => {
    const seo = readFileSync(join(COMPONENTS_DIR, 'SEO.astro'), 'utf-8');
    expect(seo).toContain('pageType');
  });

  it('SEO.astro should generate Organization schema', () => {
    const seo = readFileSync(join(COMPONENTS_DIR, 'SEO.astro'), 'utf-8');
    expect(seo).toContain('EducationalOrganization');
  });

  it('SEO.astro should generate WebSite schema', () => {
    const seo = readFileSync(join(COMPONENTS_DIR, 'SEO.astro'), 'utf-8');
    expect(seo).toContain('"WebSite"');
  });

  it('SEO.astro should generate BreadcrumbList schema', () => {
    const seo = readFileSync(join(COMPONENTS_DIR, 'SEO.astro'), 'utf-8');
    expect(seo).toContain('"BreadcrumbList"');
  });

  it('SEO.astro should conditionally render LearningResource schema', () => {
    const seo = readFileSync(join(COMPONENTS_DIR, 'SEO.astro'), 'utf-8');
    expect(seo).toContain('LearningResource');
    // Should be conditional on pageType
    expect(seo).toMatch(/pageType\s*===\s*['"]framework['"]/);
  });

  it('SEO.astro should conditionally render Article schema', () => {
    const seo = readFileSync(join(COMPONENTS_DIR, 'SEO.astro'), 'utf-8');
    expect(seo).toContain('articleSchema');
  });

  it('PageHero.astro should accept share prop', () => {
    const hero = readFileSync(join(COMPONENTS_DIR, 'PageHero.astro'), 'utf-8');
    expect(hero).toContain('share');
  });

  it('FeatureGrid.astro should support configurable columns', () => {
    const grid = readFileSync(join(COMPONENTS_DIR, 'FeatureGrid.astro'), 'utf-8');
    expect(grid).toContain('columns');
  });

  it('ShareButton.astro should support Web Share API', () => {
    const share = readFileSync(join(COMPONENTS_DIR, 'ShareButton.astro'), 'utf-8');
    expect(share).toContain('navigator.share');
  });

  it('ShareButton.astro should have fallback for unsupported browsers', () => {
    const share = readFileSync(join(COMPONENTS_DIR, 'ShareButton.astro'), 'utf-8');
    // Should have dropdown fallback
    expect(share).toMatch(/dropdown|fallback|copy/i);
  });

  it('Logo.astro should support multiple variants', () => {
    const logo = readFileSync(join(COMPONENTS_DIR, 'Logo.astro'), 'utf-8');
    expect(logo).toContain('main');
    expect(logo).toContain('horizontal');
    expect(logo).toContain('compact');
  });

  it('Logo.astro should support multiple sizes', () => {
    const logo = readFileSync(join(COMPONENTS_DIR, 'Logo.astro'), 'utf-8');
    expect(logo).toMatch(/sm|md|lg/);
  });
});

// ========================================
// NO HARDCODED COLORS IN COMPONENTS
// ========================================
describe('Components use theme-aware colors', () => {
  // Get all Astro components
  const astroComponents = readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith('.astro'))
    .map((f) => join(COMPONENTS_DIR, f));

  it.each(
    astroComponents.map((f) => [f.replace(process.cwd() + '/', ''), f])
  )('%s should not use raw hex colors in template (except via var())', (name, filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const violations = [];

    lines.forEach((line, i) => {
      // Skip frontmatter (between --- delimiters)
      // Skip style blocks
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('<!--') || line.trim().startsWith('*')) return;
      if (line.includes('import ') || line.includes('const ') || line.includes('let ') || line.includes('interface ')) return;
      // Skip data declarations and schema objects
      if (line.includes('"#') || line.includes("'#")) return;

      // Look for inline style hex colors not wrapped in var()
      const hexInStyle = line.match(/style="[^"]*#[0-9A-Fa-f]{3,8}[^"]*"/);
      if (hexInStyle) {
        violations.push({ line: i + 1, content: line.trim() });
      }
    });
    // This is a best-effort check - some hex values in Tailwind classes like bg-[#xxx] are caught by design-guidelines tests
    // We just check inline styles here
    expect(violations).toEqual([]);
  });
});
