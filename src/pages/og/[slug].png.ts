import type { APIRoute } from 'astro';
import { generarOG } from '../../lib/og';
import { todosLosEditoriales } from '../../lib/editoriales';
import { NOMBRE_CANTERA } from '../../content.config';

export async function getStaticPaths() {
  const todos = await todosLosEditoriales();
  return todos.map((e) => ({ params: { slug: e.id }, props: { editorial: e } }));
}

export const GET: APIRoute = async ({ props }) => {
  const e = (props as any).editorial;
  const png = await generarOG({
    numero: e.data.numero,
    titulo: e.data.titulo,
    cantera: NOMBRE_CANTERA[e.data.cantera],
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
