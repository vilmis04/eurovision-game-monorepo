/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/game-ui',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  preview: {
    port: 3300,
    host: '0.0.0.0',
  },

  plugins: [react()],

  build: {
    outDir: 'dist',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: 'src/coverage',
      provider: 'v8',
    },
  },
});
