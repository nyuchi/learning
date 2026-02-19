import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  // Astro recommended config
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // Enforce no-var for modern JS
      'no-var': 'error',
      // Prefer const over let when variable is not reassigned
      'prefer-const': 'warn',
      // No unused variables (warning, not error - Astro has some patterns)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // No console.log in production code (warn)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // Ignore generated and config files
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '*.config.*',
      'tests/**',
    ],
  },
];
