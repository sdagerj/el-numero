import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// La direccion publica del sitio. Se usa para el sitemap, el RSS y las
// imagenes de compartir, asi que tiene que ser la de verdad.
//
// Va escrita a mano a proposito. Cloudflare ofrece CF_PAGES_URL, pero en cada
// construccion vale algo como https://5260d689.elnumero.pages.dev — la copia
// temporal de ese despliegue, no la web. Usarla dejaba el RSS y las imagenes de
// compartir apuntando a direcciones que caducan.
//
// Dominio propio desde septiembre de 2026. La direccion vieja,
// elnumero.pages.dev, sigue viva y redirige aqui (ver Base.astro).
const SITIO = process.env.SITIO || 'https://elnumero.com.co';
export default defineConfig({
  site: SITIO,
  // /gracias solo tiene sentido llegando desde el formulario: no va al sitemap.
  integrations: [sitemap({
    filter: (p) => !p.includes('/gracias') && !p.includes('/resultados'),
  })],
  build: { format: 'directory' },
});
