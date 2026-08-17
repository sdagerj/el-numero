import rss from '@astrojs/rss';
import { todosLosEditoriales } from '../lib/editoriales';

export async function GET(context) {
  const todos = await todosLosEditoriales();
  return rss({
    title: 'El Número',
    description: 'Un número, una historia. Cada semana, una cifra abre una historia y deja una lección.',
    site: context.site,
    items: todos.map((e) => ({
      title: `${e.data.numero} — ${e.data.titulo}`,
      description: e.data.resumen,
      pubDate: e.data.fecha,
      link: `/n/${e.id}/`,
    })),
    customData: '<language>es-co</language>',
  });
}
