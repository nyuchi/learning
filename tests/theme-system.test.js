/**
 * Theme System Validation Tests
 *
 * Validates the light/dark/system theme architecture:
 * - CSS custom property definitions for both modes
 * - System preference media query fallback
 * - Theme toggle component existence and features
 * - Color-scheme CSS property
 * - Minerals Strip visibility across themes
 * - Header theme token usage
 * - Component layer token references
 *
 * Tests source files (global.css, BaseLayout, ThemeToggle).
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CSS_PATH = join(process.cwd(), 'src/styles/global.css');
const LAYOUT_PATH = join(process.cwd(), 'src/layouts/BaseLayout.astro');
const THEME_TOGGLE_PATH = join(process.cwd(), 'src/components/ThemeToggle.astro');
const css = readFileSync(CSS_PATH, 'utf-8');
const layout = readFileSync(LAYOUT_PATH, 'utf-8');

// ========================================
// THEME MODE DECLARATIONS
// ========================================
describe('Theme mode declarations', () => {
  it('should define dark mode as default (:root)', () => {
    expect(css).toMatch(/:root\s*\{/);
    // Dark mode should set color-scheme
    expect(css).toMatch(/color-scheme:\s*dark/);
  });

  it('should define light mode via class (:root.light)', () => {
    expect(css).toMatch(/:root\.light\s*\{/);
  });

  it('should define system preference fallback (@media prefers-color-scheme: light)', () => {
    expect(css).toMatch(/@media\s*\(prefers-color-scheme:\s*light\)/);
    // System preference should use :root:not(.dark) selector
    expect(css).toMatch(/:root:not\(\.dark\)/);
  });

  it('light mode should set color-scheme: light', () => {
    const lightBlock = css.match(/:root\.light\s*\{[\s\S]*?color-scheme:\s*(\w+)/);
    expect(lightBlock).not.toBeNull();
    expect(lightBlock[1]).toBe('light');
  });
});

// ========================================
// THEME TOGGLE COMPONENT
// ========================================
describe('ThemeToggle component', () => {
  it('ThemeToggle.astro should exist', () => {
    expect(existsSync(THEME_TOGGLE_PATH)).toBe(true);
  });

  it('should support three theme modes', () => {
    const toggle = readFileSync(THEME_TOGGLE_PATH, 'utf-8');
    // Should reference light, dark, and system modes
    expect(toggle).toMatch(/light/i);
    expect(toggle).toMatch(/dark/i);
    expect(toggle).toMatch(/system/i);
  });

  it('should persist theme to localStorage', () => {
    const toggle = readFileSync(THEME_TOGGLE_PATH, 'utf-8');
    expect(toggle).toContain('localStorage');
  });

  it('should be included in BaseLayout', () => {
    expect(layout).toContain('ThemeToggle');
  });
});

// ========================================
// HEADER THEME TOKENS
// ========================================
describe('Header theme tokens', () => {
  it('dark mode should define header tokens', () => {
    expect(css).toContain('--header-bg:');
    expect(css).toContain('--header-border:');
    expect(css).toContain('--header-shadow:');
    expect(css).toContain('--dropdown-bg:');
    expect(css).toContain('--dropdown-shadow:');
    expect(css).toContain('--mobile-menu-bg:');
    expect(css).toContain('--nav-link-hover:');
  });

  it('BaseLayout header should use CSS variable tokens, not hardcoded values', () => {
    // Header styles should reference var() tokens
    expect(layout).toMatch(/var\(--header-bg\)/);
  });
});

// ========================================
// COMPONENT LAYER TOKEN USAGE
// ========================================
describe('Component layer uses design tokens', () => {
  it('.card should use var(--bg-surface) for background', () => {
    expect(css).toMatch(/\.card\s*\{[^}]*background:\s*var\(--bg-surface\)/);
  });

  it('.card should use var(--radius-card) for border-radius', () => {
    expect(css).toMatch(/\.card\s*\{[^}]*border-radius:\s*var\(--radius-card\)/);
  });

  it('.btn-primary should use var(--primary) for background', () => {
    expect(css).toMatch(/\.btn-primary\s*\{[^}]*background:\s*var\(--primary\)/);
  });

  it('.btn-primary should use var(--radius-button) for border-radius', () => {
    expect(css).toMatch(/\.btn-primary\s*\{[^}]*border-radius:\s*var\(--radius-button\)/);
  });

  it('.btn-primary should use design token for font-size', () => {
    expect(css).toMatch(/\.btn-primary\s*\{[^}]*font-size:\s*var\(--btn-default-font\)/);
  });

  it('.btn-primary should use design token for height', () => {
    expect(css).toMatch(/\.btn-primary\s*\{[^}]*height:\s*var\(--btn-default-height\)/);
  });

  it('.input should use design tokens', () => {
    expect(css).toMatch(/\.input\s*\{[^}]*height:\s*var\(--input-height\)/);
    expect(css).toMatch(/\.input\s*\{[^}]*font-size:\s*var\(--input-font\)/);
    expect(css).toMatch(/\.input\s*\{[^}]*border-radius:\s*var\(--radius-input\)/);
  });
});

// ========================================
// MINERALS STRIP
// ========================================
describe('Minerals Strip', () => {
  it('should be defined in CSS utilities', () => {
    expect(css).toContain('.minerals-strip');
  });

  it('should be 4px wide', () => {
    expect(css).toMatch(/\.minerals-strip\s*\{[^}]*width:\s*4px/);
  });

  it('should be fixed position', () => {
    expect(css).toMatch(/\.minerals-strip\s*\{[^}]*position:\s*fixed/);
  });

  it('should have z-index 9999', () => {
    expect(css).toMatch(/\.minerals-strip\s*\{[^}]*z-index:\s*9999/);
  });

  it('should be hidden on mobile (<480px)', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*480px\)[\s\S]*?\.minerals-strip[\s\S]*?display:\s*none/);
  });

  it('should be rendered in BaseLayout', () => {
    expect(layout).toContain('minerals-strip');
  });
});

// ========================================
// ANIMATION SYSTEM
// ========================================
describe('Animation system', () => {
  it('BaseLayout should have Intersection Observer for animations', () => {
    expect(layout).toContain('IntersectionObserver');
  });

  it('should support animate-fade-in class', () => {
    expect(layout).toContain('animate-fade-in');
  });

  it('should support animate-slide-up class', () => {
    expect(layout).toContain('animate-slide-up');
  });

  it('should add .animated class when element enters viewport', () => {
    expect(layout).toContain('.animated');
  });
});
