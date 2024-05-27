import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '#/storage': resolve(__dirname, './public/storage'),
    },
  },
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
  ],
});
