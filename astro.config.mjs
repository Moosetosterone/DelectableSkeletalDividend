import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: Replace with your canonical domain once confirmed, e.g. 'https://spotsylvaniarfc.com'
  // Used to generate absolute canonical and og:url meta tags.
  site: 'https://spotsylvania-rfc.replit.app',

  // Bind to all interfaces so Replit's preview pane can reach the dev server
  server: {
    port: 5000,
    host: true,
    allowedHosts: true,
  },
});
