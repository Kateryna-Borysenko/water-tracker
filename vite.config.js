import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: { sourcemap: true },
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      helpers: '/src/helpers',
      styles: '/src/styles',
      service: '/src/service',
      reduxState: '/src/reduxState',
    },
  },
});
