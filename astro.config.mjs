import { defineConfig } from 'astro/config';

export default defineConfig({
  // Bind to all interfaces so Replit's preview pane can reach the dev server
  server: {
    port: 5000,
    host: true,
  },
});
