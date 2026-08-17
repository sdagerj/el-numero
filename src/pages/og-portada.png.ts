import type { APIRoute } from 'astro';
import { generarOG } from '../lib/og';

// La imagen por defecto: la que se ve al compartir la portada, el archivo
// o cualquier página que no sea un editorial concreto.
export const GET: APIRoute = async () => {
  const png = await generarOG({ numero: 'N°', titulo: 'Un número, una historia' });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
