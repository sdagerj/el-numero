# El Número

Un número, una historia. Proyecto editorial semanal de Stefy Dager.

Sitio estático hecho con [Astro](https://astro.build). Se publica solo en
Netlify cada vez que se sube un editorial.

**¿Vas a publicar algo? Lee [PUBLICAR.md](./PUBLICAR.md).**

## Ejecutar en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # construye en dist/
```

## Estructura

```
src/
├── content/editoriales/   los editoriales, un .md por semana
├── content.config.ts      valida el frontmatter (rompe la build si algo falta)
├── pages/                 las páginas del sitio
├── components/            piezas reutilizables
├── lib/                   consultas a los editoriales y generación de imágenes
├── styles/tokens.css      los colores y la tipografía de la marca
└── fuentes-build/         Cormorant en TTF, solo para las imágenes de compartir
```
