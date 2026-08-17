import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

// La imagen que se ve cuando compartes un enlace en WhatsApp, Instagram o
// LinkedIn. Se genera al construir el sitio: no hay servidor ni servicio
// externo, y una vez construida es un PNG normal.
//
// Satori no lee woff2, así que en /src/fuentes-build hay la misma Cormorant
// en TTF. Ese archivo NO se sirve al navegador; solo lo usa la construcción.

const RAIZ = process.cwd();
const NAVY = '#12486c';
const SOL = '#f4da55';
const CREMA = '#f7f2e6';
const MINT = '#8fd0c8';

let fuentes: Array<{ name: string; data: Buffer; weight: 400 | 600; style: 'normal' }> | null = null;

function cargarFuentes() {
  if (fuentes) return fuentes;
  // Instancias estáticas: satori no sabe leer la tabla `fvar` de una fuente
  // variable, así que la Cormorant se instancia a peso fijo con fonttools.
  // Ver PUBLICAR.md → "Si alguna vez hay que regenerar las fuentes".
  const leer = (n: string) => fs.readFileSync(path.join(RAIZ, 'src/fuentes-build', n));
  fuentes = [
    { name: 'Cormorant', data: leer('cormorant-latin-400.ttf'), weight: 400, style: 'normal' },
    { name: 'Cormorant', data: leer('cormorant-latin-600.ttf'), weight: 600, style: 'normal' },
    { name: 'Cormorant', data: leer('cormorant-latin-ext-600.ttf'), weight: 600, style: 'normal' },
  ];
  return fuentes;
}

// Los números largos bajan de tamaño para que quepan siempre.
function tamanoNumero(numero: string): number {
  const n = numero.length;
  if (n <= 2) return 300;
  if (n === 3) return 250;
  if (n <= 5) return 190;
  if (n <= 8) return 130;
  return 96;
}

interface Opciones { numero: string; titulo: string; cantera?: string; }

export async function generarOG({ numero, titulo, cantera }: Opciones): Promise<Buffer> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px', height: '630px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: NAVY, padding: '60px 80px',
          fontFamily: 'Cormorant', position: 'relative',
        },
        children: [
          // Sin adornos de fondo a propósito: esta imagen se ve del tamaño de
          // una uña en la lista de chats de WhatsApp. Cualquier forma detrás
          // le quita contraste al número, que es lo único que tiene que
          // leerse a ese tamaño.
          cantera && {
            type: 'div',
            props: {
              style: {
                fontSize: '26px', letterSpacing: '6px', textTransform: 'uppercase',
                color: MINT, marginBottom: '14px', display: 'flex',
              },
              children: cantera,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: `${tamanoNumero(numero)}px`, fontWeight: 600,
                color: SOL, lineHeight: 0.9, display: 'flex',
              },
              children: numero,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '46px', fontWeight: 600, color: CREMA,
                marginTop: '34px', textAlign: 'center', lineHeight: 1.2,
                maxWidth: '900px', display: 'flex',
              },
              children: titulo,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute', bottom: '46px',
                fontSize: '24px', letterSpacing: '5px', textTransform: 'uppercase',
                color: 'rgba(247,242,230,0.6)', display: 'flex',
              },
              children: 'El Número · Un número, una historia',
            },
          },
        ].filter(Boolean),
      },
    } as any,
    { width: 1200, height: 630, fonts: cargarFuentes() as any },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return Buffer.from(resvg.render().asPng());
}
