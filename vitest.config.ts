import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Unit tests run against plain TS/Pinia — no Nuxt runtime needed, so this is a
// stock vitest config rather than @nuxt/test-utils. Component tests would need
// the Nuxt environment; keep that a separate step.
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
})
