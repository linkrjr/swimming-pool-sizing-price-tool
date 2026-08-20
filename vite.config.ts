import { copyFileSync } from 'node:fs'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages has no SPA rewrite, so serve the app shell for unknown paths too.
const spaFallback = {
  name: 'spa-fallback',
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html')
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback],
  base: '/swimming-pool-sizing-price-tool/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
