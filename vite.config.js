import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      helpers: '/src/helpers',
      styles: '/src/styles',
      service: '/src/service',
      reduxState: '/src/reduxState',
      assets: '/src/assets',
      base: '/',
      build: {
        // sourcemap: true,
        rollupOptions: {
          external: ['@chatscope/chat-ui-kit-styles'],
        },
      },
    },
  },
});
