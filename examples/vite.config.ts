import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      components: resolve(__dirname, 'src/components'),
      styles: resolve(__dirname, 'src/styles'),
      plugins: resolve(__dirname, 'src/plugins'),
      views: resolve(__dirname, 'src/views'),
      layouts: resolve(__dirname, 'src/layouts'),
      utils: resolve(__dirname, 'src/utils'),
      apis: resolve(__dirname, 'src/apis'),
      dirs: resolve(__dirname, 'src/directives'),
      '@@': resolve(__dirname, './../packages'),
    },
  },
});
