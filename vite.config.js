// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: 'res', // static assets like images, fonts
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
});
