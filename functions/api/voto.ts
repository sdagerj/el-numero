// Recibe un voto y lo suma. Es la unica parte del sitio que no es un archivo
// estatico: corre en Cloudflare, al lado de la web, y no hay servidor que
// mantener ni cuenta nueva que pagar.
//
// Cloudflare Pages ejecuta sola cualquier archivo dentro de functions/. Este
// atiende POST /api/voto.
//
// IMPORTANTE: necesita una base de datos KV enlazada con el nombre VOTOS.
// Sin ella la funcion responde 503 y el bloque de votar no se dibuja — la
// pagina sigue funcionando igual de bien. Los pasos estan en PUBLICAR.md.

interface Env {
  VOTOS: KVNamespace;
  CLAVE_RESULTADOS?: string;
}

// Repetidos aqui a proposito: las funciones de Cloudflare se construyen aparte
// del sitio y no pueden importar de src/.
const IDS = ['100', '5050', '30', '0'];

// Los slugs son nombres de archivo: 2026-09-10-tu-atencion-dura-11-minutos.
// Se comprueba el formato para que nadie invente claves raras en la base.
const SLUG_OK = /^[a-z0-9-]{3,120}$/;

const json = (datos: unknown, status = 200) =>
  new Response(JSON.stringify(datos), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.VOTOS) return json({ error: 'sin-base' }, 503);

  let cuerpo: { slug?: string; voto?: string };
  try {
    cuerpo = await request.json();
  } catch {
    return json({ error: 'cuerpo-invalido' }, 400);
  }

  const slug = String(cuerpo.slug || '');
  const voto = String(cuerpo.voto || '');
  if (!SLUG_OK.test(slug) || !IDS.includes(voto)) {
    return json({ error: 'datos-invalidos' }, 400);
  }

  // KV no sabe sumar solo: hay que leer, sumar y escribir. Si dos personas
  // votaran en el mismo instante se perderia un voto. Con una columna semanal
  // eso no va a pasar, y la alternativa (una base de datos de verdad) son
  // varios pasos mas de configuracion para evitar algo que no ocurre.
  const clave = `v:${slug}:${voto}`;
  const antes = Number((await env.VOTOS.get(clave)) || 0);
  await env.VOTOS.put(clave, String(antes + 1));

  return json({ ok: true });
};

// Los totales, para la pagina privada de resultados. Pide la clave guardada en
// Cloudflare como variable de entorno: sin ella, esto no responde nada.
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.VOTOS) return json({ error: 'sin-base' }, 503);

  const clave = new URL(request.url).searchParams.get('clave') || '';
  const esperada = env.CLAVE_RESULTADOS || '';
  if (!esperada || clave !== esperada) return json({ error: 'sin-permiso' }, 401);

  const totales: Record<string, Record<string, number>> = {};
  let cursor: string | undefined;
  do {
    const pagina = await env.VOTOS.list({ prefix: 'v:', cursor });
    for (const k of pagina.keys) {
      const partes = k.name.split(':');
      if (partes.length !== 3) continue;
      const [, slug, voto] = partes;
      const n = Number((await env.VOTOS.get(k.name)) || 0);
      totales[slug] ??= {};
      totales[slug][voto] = n;
    }
    cursor = pagina.list_complete ? undefined : pagina.cursor;
  } while (cursor);

  return json({ totales });
};
