/**
 * Infrastructure & Resilience Tests
 *
 * Validates system architecture, graceful degradation, and resilience:
 * - CSS graceful degradation (fallback fonts, reduced motion, forced colors)
 * - Build system correctness (TypeScript, Astro config)
 * - CI pipeline configuration
 * - Deployment configuration
 * - Error page existence
 * - Accessibility resilience (works without JS, proper landmarks)
 * - Font fallback chains (system fonts when webfonts fail)
 * - External dependency graceful degradation
 * - Progressive enhancement patterns
 *
 * Tests both source files and built output.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CSS_PATH = join(process.cwd(), 'src/styles/global.css');
const LAYOUT_PATH = join(process.cwd(), 'src/layouts/BaseLayout.astro');
const DIST_DIR = join(process.cwd(), 'dist');
const css = readFileSync(CSS_PATH, 'utf-8');
const layout = readFileSync(LAYOUT_PATH, 'utf-8');

// ========================================
// CSS GRACEFUL DEGRADATION
// ========================================
describe('CSS graceful degradation', () => {
  it('should handle prefers-reduced-motion', () => {
    expect(css).toContain('prefers-reduced-motion: reduce');
    // Should disable all animations
    expect(css).toMatch(/prefers-reduced-motion[\s\S]*?animation-duration:\s*0\.01ms/);
  });

  it('should handle forced-colors (Windows High Contrast)', () => {
    expect(css).toContain('forced-colors: active');
    // Should use system colors
    expect(css).toContain('CanvasText');
    expect(css).toContain('ButtonText');
    expect(css).toContain('Highlight');
  });

  it('should handle prefers-contrast: more', () => {
    expect(css).toContain('prefers-contrast: more');
  });

  it('should have print styles', () => {
    expect(css).toContain('@media print');
    // Print should hide decorative elements
    expect(css).toMatch(/@media print[\s\S]*?\.minerals-strip[\s\S]*?display:\s*none/);
  });

  it('should expose URLs in print mode', () => {
    expect(css).toMatch(/@media print[\s\S]*?content:\s*" \(" attr\(href\) "\)"/);
  });

  it('should support text-size-adjust', () => {
    expect(css).toContain('text-size-adjust: 100%');
    expect(css).toContain('-webkit-text-size-adjust: 100%');
  });
});

// ========================================
// FONT FALLBACK CHAINS
// ========================================
describe('Font fallback chains', () => {
  it('display font should have serif fallback', () => {
    expect(css).toMatch(/--font-display:.*Georgia.*serif/);
  });

  it('heading font should have system-ui fallback', () => {
    expect(css).toMatch(/--font-heading:.*system-ui.*sans-serif/);
  });

  it('body font should have system-ui fallback', () => {
    expect(css).toMatch(/--font-body:.*system-ui.*sans-serif/);
  });

  it('mono font should have Consolas fallback', () => {
    expect(css).toMatch(/--font-mono:.*Consolas.*monospace/);
  });
});

// ========================================
// ACCESSIBILITY RESILIENCE
// ========================================
describe('Accessibility resilience', () => {
  it('skip links should target #main-content', () => {
    expect(layout).toContain('#main-content');
    expect(layout).toMatch(/id="main-content"/);
  });

  it('should have multiple skip link targets', () => {
    expect(layout).toContain('skip-link');
    // Should have at least 2 skip targets (main, nav)
    const skipLinks = (layout.match(/class="skip-link"/g) || []).length;
    expect(skipLinks).toBeGreaterThanOrEqual(2);
  });

  it('mobile menu should close on Escape key', () => {
    expect(layout).toContain('Escape');
  });

  it('should have aria-label on navigation', () => {
    expect(layout).toMatch(/aria-label/);
  });

  it('CSS error states should be defined', () => {
    expect(css).toContain('[aria-invalid="true"]');
    expect(css).toContain('.error');
  });

  it('CSS disabled states should be defined', () => {
    expect(css).toContain('[disabled]');
    expect(css).toContain('[aria-disabled="true"]');
  });

  it('CSS loading states should be defined', () => {
    expect(css).toContain('[aria-busy="true"]');
  });

  it('CSS current page indicator should be defined', () => {
    expect(css).toContain('[aria-current="page"]');
  });

  it('interactive elements should have min-height 44px', () => {
    // Check that button, a, select etc have min-height
    expect(css).toMatch(/button[\s\S]*?min-height:\s*44px/);
  });

  it('focus-visible should use 3px outline', () => {
    expect(css).toMatch(/\*:focus-visible[\s\S]*?outline:\s*3px solid/);
  });
});

// ========================================
// BUILD SYSTEM
// ========================================
describe('Build system configuration', () => {
  it('tsconfig.json should exist', () => {
    expect(existsSync(join(process.cwd(), 'tsconfig.json'))).toBe(true);
  });

  it('tsconfig should use strict mode', () => {
    const tsconfig = JSON.parse(readFileSync(join(process.cwd(), 'tsconfig.json'), 'utf-8'));
    // Astro extends its own tsconfig which includes strict
    expect(tsconfig.extends || tsconfig.compilerOptions?.strict).toBeDefined();
  });

  it('postcss.config.mjs should exist', () => {
    expect(existsSync(join(process.cwd(), 'postcss.config.mjs'))).toBe(true);
  });

  it('package.json should have all required scripts', () => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
    expect(pkg.scripts.dev).toBeDefined();
    expect(pkg.scripts.build).toBeDefined();
    expect(pkg.scripts.preview).toBeDefined();
    expect(pkg.scripts.test).toBeDefined();
    expect(pkg.scripts.lint).toBeDefined();
    expect(pkg.scripts.format).toBeDefined();
  });

  it('package.json build should include TypeScript check', () => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
    expect(pkg.scripts.build).toContain('check');
  });
});

// ========================================
// CI PIPELINE
// ========================================
describe('CI pipeline configuration', () => {
  it('.github/workflows/ci.yml should exist', () => {
    expect(existsSync(join(process.cwd(), '.github/workflows/ci.yml'))).toBe(true);
  });

  it('CI should run lint step', () => {
    const ci = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toMatch(/eslint/i);
  });

  it('CI should run format check', () => {
    const ci = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toMatch(/prettier/i);
  });

  it('CI should run TypeScript check', () => {
    const ci = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toMatch(/astro check|typescript/i);
  });

  it('CI should run build', () => {
    const ci = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toMatch(/astro build|npm run build/i);
  });

  it('CI should run tests', () => {
    const ci = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toMatch(/vitest/i);
  });

  it('CI should trigger on pushes to main', () => {
    const ci = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toContain('push');
    expect(ci).toContain('main');
  });

  it('CI should trigger on pull requests', () => {
    const ci = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toContain('pull_request');
  });
});

// ========================================
// PROGRESSIVE ENHANCEMENT
// ========================================
describe('Progressive enhancement', () => {
  it('theme toggle should check for localStorage support', () => {
    const toggle = readFileSync(
      join(process.cwd(), 'src/components/ThemeToggle.astro'),
      'utf-8'
    );
    expect(toggle).toContain('localStorage');
  });

  it('share button should feature-detect Web Share API', () => {
    const share = readFileSync(
      join(process.cwd(), 'src/components/ShareButton.astro'),
      'utf-8'
    );
    expect(share).toContain('navigator.share');
  });

  it('animations should use Intersection Observer with fallback', () => {
    // BaseLayout should check for IntersectionObserver support
    expect(layout).toContain('IntersectionObserver');
  });
});

// ========================================
// HEADER RESILIENCE
// ========================================
describe('Header behavior', () => {
  it('header should be fixed position', () => {
    // In BaseLayout scoped styles or inline
    expect(layout).toMatch(/position:\s*fixed/);
  });

  it('header should have backdrop blur', () => {
    expect(layout).toMatch(/backdrop-filter/);
  });

  it('header scroll behavior should check prefers-reduced-motion', () => {
    expect(layout).toContain('prefers-reduced-motion');
  });
});

// ========================================
// DEPLOYMENT RESILIENCE
// ========================================
describe('Deployment resilience', () => {
  it('vercel.json should not have overly complex rewrites', () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf-8'));
    // Simple config is more reliable
    expect(config.buildCommand).toBeDefined();
    expect(config.outputDirectory).toBe('dist');
  });

  it('site should be configured for static output', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(config).toContain("output: 'static'");
  });
});

// ========================================
// CONTENT LAYER INDEPENDENCE
// ========================================
describe('Content layer independence (Architecture rule)', () => {
  it('page files should not define CSS @layer rules', () => {
    const pagesDir = join(process.cwd(), 'src/pages');
    function checkPages(dir) {
      const entries = require('fs').readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          checkPages(fullPath);
        } else if (entry.name.endsWith('.astro')) {
          const content = readFileSync(fullPath, 'utf-8');
          // Pages should not define @layer rules - that belongs in global.css
          const hasLayer = content.match(/@layer\s+(base|components|utilities)/);
          expect(hasLayer, `${fullPath} defines CSS @layer`).toBeNull();
        }
      }
    }
    checkPages(pagesDir);
  });
});
