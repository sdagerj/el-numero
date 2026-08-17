import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cambia SITIO por tu dominio definitivo cuando lo conectes en Netlify.
// Hasta entonces, la URL que te dio Netlify sirve igual.
export default defineConfig({
  site: 'https://elnumero.netlify.app',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
