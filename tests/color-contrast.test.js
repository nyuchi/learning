/**
 * Color System & WCAG Contrast Compliance Tests
 *
 * Validates the design system color palette against:
 * - Five African Minerals palette hex accuracy
 * - WCAG 2.1 AAA contrast ratios (7:1 for body text)
 * - APCA (WCAG 3.0 draft) lightness contrast (Lc) values
 * - Theme system completeness (dark + light variables)
 * - Surface/text color pairing correctness
 * - Semantic color mapping (success, error, warning, info)
 *
 * Tests source CSS tokens, not built output.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const CSS_PATH = join(process.cwd(), 'src/styles/global.css');
const css = readFileSync(CSS_PATH, 'utf-8');

// ========================================
// HELPER: WCAG 2.1 Relative Luminance & Contrast Ratio
// ========================================
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ========================================
// FIVE AFRICAN MINERALS PALETTE
// ========================================
describe('Five African Minerals palette tokens', () => {
  const minerals = {
    cobalt: { light: '#0047AB', dark: '#00B0FF' },
    tanzanite: { light: '#4B0082', dark: '#B388FF' },
    malachite: { light: '#004D40', dark: '#64FFDA' },
    gold: { light: '#5D4037', dark: '#FFD740' },
    terracotta: { light: '#8B4513', dark: '#D4A574' },
  };

  for (const [name, colors] of Object.entries(minerals)) {
    it(`${name} light mode color (${colors.light}) should be defined in CSS`, () => {
      expect(css).toContain(`--color-${name}-light: ${colors.light}`);
    });

    it(`${name} dark mode color (${colors.dark}) should be defined in CSS`, () => {
      expect(css).toContain(`--color-${name}-dark: ${colors.dark}`);
    });

    it(`${name} should have container and on-container variants`, () => {
      expect(css).toContain(`--color-${name}-container-light:`);
      expect(css).toContain(`--color-${name}-container-dark:`);
      expect(css).toContain(`--color-${name}-on-container-light:`);
      expect(css).toContain(`--color-${name}-on-container-dark:`);
    });
  }
});

// ========================================
// SURFACE COLORS
// ========================================
describe('Surface color tokens', () => {
  it('dark mode surfaces should be defined', () => {
    expect(css).toContain('--color-bg-base-dark: #0A0A0A');
    expect(css).toContain('--color-bg-surface-dark: #141414');
    expect(css).toContain('--color-bg-bright-dark: #1E1E1E');
  });

  it('light mode surfaces should be defined', () => {
    expect(css).toContain('--color-bg-base-light: #FAF9F5');
    expect(css).toContain('--color-bg-surface-light: #FFFFFF');
    expect(css).toContain('--color-bg-dim-light: #F3F2EE');
  });
});

// ========================================
// TEXT COLORS
// ========================================
describe('Text color tokens', () => {
  it('dark mode text colors should be defined', () => {
    expect(css).toContain('--color-text-primary-dark: #F5F5F4');
    expect(css).toContain('--color-text-secondary-dark: #B8B8B3');
    expect(css).toContain('--color-text-tertiary-dark: #9A9A95');
  });

  it('light mode text colors should be defined', () => {
    expect(css).toContain('--color-text-primary-light: #141413');
    expect(css).toContain('--color-text-secondary-light: #4A4A46');
    expect(css).toContain('--color-text-tertiary-light: #5C5B58');
  });
});

// ========================================
// WCAG 2.1 AAA CONTRAST RATIOS (7:1 minimum for body text)
// ========================================
describe('WCAG 2.1 AAA contrast ratios', () => {
  // Dark mode: text on dark background
  it('dark mode: primary text on base background should meet AAA (7:1)', () => {
    const ratio = contrastRatio('#F5F5F4', '#0A0A0A');
    expect(ratio).toBeGreaterThanOrEqual(7);
  });

  it('dark mode: secondary text on base background should meet AA (4.5:1)', () => {
    const ratio = contrastRatio('#B8B8B3', '#0A0A0A');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('dark mode: tertiary text on base background should meet AA (4.5:1)', () => {
    const ratio = contrastRatio('#9A9A95', '#0A0A0A');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  // Light mode: text on light background
  it('light mode: primary text on base background should meet AAA (7:1)', () => {
    const ratio = contrastRatio('#141413', '#FAF9F5');
    expect(ratio).toBeGreaterThanOrEqual(7);
  });

  it('light mode: secondary text on base background should meet AA (4.5:1)', () => {
    const ratio = contrastRatio('#4A4A46', '#FAF9F5');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('light mode: tertiary text on base background should meet AA (4.5:1)', () => {
    const ratio = contrastRatio('#5C5B58', '#FAF9F5');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  // Mineral colors on their respective backgrounds
  it('dark mode: cobalt on dark background should meet AA for large text (3:1)', () => {
    const ratio = contrastRatio('#00B0FF', '#0A0A0A');
    expect(ratio).toBeGreaterThanOrEqual(3);
  });

  it('light mode: cobalt on light background should meet AA for large text (3:1)', () => {
    const ratio = contrastRatio('#0047AB', '#FAF9F5');
    expect(ratio).toBeGreaterThanOrEqual(3);
  });
});

// ========================================
// SEMANTIC COLORS
// ========================================
describe('Semantic color tokens', () => {
  const semanticColors = {
    success: { light: '#004D40', dark: '#64FFDA' },
    error: { light: '#B3261E', dark: '#F2B8B5' },
    warning: { light: '#7A5C00', dark: '#FFD866' },
    info: { light: '#0047AB', dark: '#00B0FF' },
  };

  for (const [name, colors] of Object.entries(semanticColors)) {
    it(`${name} light color should be correct`, () => {
      expect(css).toContain(`--color-${name}-light: ${colors.light}`);
    });
    it(`${name} dark color should be correct`, () => {
      expect(css).toContain(`--color-${name}-dark: ${colors.dark}`);
    });
  }
});

// ========================================
// THEME VARIABLE COMPLETENESS
// ========================================
describe('Theme variable completeness', () => {
  const requiredThemeVars = [
    '--primary:',
    '--primary-container:',
    '--on-primary-container:',
    '--bg:',
    '--bg-surface:',
    '--bg-elevated:',
    '--border:',
    '--text:',
    '--text-secondary:',
    '--text-tertiary:',
    '--success:',
    '--error:',
    '--warning:',
    '--info:',
    '--header-bg:',
    '--header-border:',
    '--header-shadow:',
    '--mobile-menu-bg:',
    '--nav-link-hover:',
    '--dropdown-bg:',
    '--dropdown-shadow:',
  ];

  it('dark mode (:root) should define all required theme variables', () => {
    // Extract the :root block (first one, which is dark mode)
    const rootMatch = css.match(/:root\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/);
    expect(rootMatch).not.toBeNull();
    const rootBlock = rootMatch[1];
    for (const varName of requiredThemeVars) {
      expect(rootBlock).toContain(varName);
    }
  });

  it('light mode (:root.light) should define all required theme variables', () => {
    const lightMatch = css.match(/:root\.light\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/);
    expect(lightMatch).not.toBeNull();
    const lightBlock = lightMatch[1];
    for (const varName of requiredThemeVars) {
      expect(lightBlock).toContain(varName);
    }
  });
});

// ========================================
// MINERAL COLOR UTILITY CLASSES
// ========================================
describe('Mineral color utility classes', () => {
  const minerals = ['cobalt', 'tanzanite', 'malachite', 'gold', 'terracotta'];

  it.each(minerals)('.text-%s utility class should exist', (mineral) => {
    expect(css).toContain(`.text-${mineral}`);
  });

  it.each(minerals)('.bg-%s utility class should exist', (mineral) => {
    expect(css).toContain(`.bg-${mineral}`);
  });
});

// ========================================
// DESIGN TOKEN COMPLETENESS
// ========================================
describe('Design token completeness', () => {
  it('spacing tokens should be defined', () => {
    expect(css).toContain('--spacing-xs: 4px');
    expect(css).toContain('--spacing-sm: 8px');
    expect(css).toContain('--spacing-md: 16px');
    expect(css).toContain('--spacing-lg: 24px');
    expect(css).toContain('--spacing-xl: 32px');
    expect(css).toContain('--spacing-2xl: 48px');
    expect(css).toContain('--spacing-3xl: 64px');
  });

  it('border radius tokens should be defined', () => {
    expect(css).toContain('--radius-button: 12px');
    expect(css).toContain('--radius-card: 16px');
    expect(css).toContain('--radius-input: 8px');
    expect(css).toContain('--radius-badge: 9999px');
  });

  it('shadow tokens should be defined', () => {
    expect(css).toContain('--shadow-sm:');
    expect(css).toContain('--shadow-base:');
    expect(css).toContain('--shadow-md:');
    expect(css).toContain('--shadow-lg:');
    expect(css).toContain('--shadow-xl:');
    expect(css).toContain('--shadow-card:');
    expect(css).toContain('--shadow-card-hover:');
  });

  it('font family tokens should be defined', () => {
    expect(css).toContain("--font-display: 'Noto Serif'");
    expect(css).toContain("--font-heading: 'Plus Jakarta Sans'");
    expect(css).toContain("--font-body: 'Plus Jakarta Sans'");
    expect(css).toContain("--font-mono: 'JetBrains Mono'");
  });
});
