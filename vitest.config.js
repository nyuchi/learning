import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{js,ts}'],
    globals: false,
    reporters: ['default'],
    testTimeout: 30000,
  },
});
