import { getCollection, type CollectionEntry } from 'astro:content';

export type Editorial = CollectionEntry<'editoriales'>;

// Todos los editoriales publicados, del más reciente al más antiguo.
// Los marcados como borrador nunca salen del sitio construido.
export async function todosLosEditoriales(): Promise<Editorial[]> {
  const items = await getCollection('editoriales', ({ data }) => data.borrador !== true);
  return items.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export async function elDeEstaSemana(): Promise<Editorial | undefined> {
  return (await todosLosEditoriales())[0];
}

export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

export function fechaISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}
