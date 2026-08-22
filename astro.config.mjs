import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// La direccion publica del sitio. Se usa para el sitemap, el RSS y las
// imagenes de compartir, asi que tiene que ser la de verdad.
//
// En Cloudflare Pages la variable CF_PAGES_URL viene puesta sola en cada
// construccion, asi que el sitio se conoce a si mismo sin tocar nada. Cuando
// haya dominio propio, se pone aqui y se acabo.
const SITIO = process.env.SITIO
  || process.env.CF_PAGES_URL
  || 'https://elnumero.pages.dev';
export default defineConfig({
  site: SITIO,
  integrations: [sitemap()],
  build: { format: 'directory' },
});
