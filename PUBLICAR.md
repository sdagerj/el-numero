# Cómo publicar en El Número

Todo lo que necesitas saber para manejar tu web. No hace falta que entiendas
código: esto está escrito para leerse de arriba abajo.

---

## 1. Publicar un editorial nuevo

### La forma corta: desde la app

En **Memorias → El Número**, abre la entrega y baja hasta el bloque
**«Para la web»**. Llena el resumen, la cantera y la fecha, añade las fuentes
si las tienes, y toca **🌐 Publicar en la web**.

Antes de subir nada te enseña exactamente qué va a publicar. Confirmas, y en un
par de minutos está en línea. Si vuelves a publicar la misma entrega, se
actualiza — no se duplica.

Necesita una llave de GitHub guardada una sola vez en **Ajustes → Publicar en
la web**. Sin ella el botón sigue sirviendo: te da el archivo hecho para que lo
subas a mano.

### La otra forma corta

Escríbeme:

> **publica este texto**

y pega el editorial. Yo creo el archivo, lo subo, y en menos de un minuto está
en línea. Nada más.

Si tienes las fuentes anotadas, pásamelas también. Si no, las pido.

### La forma manual, por si algún día quieres hacerlo tú

Un editorial es **un archivo de texto** dentro de `src/content/editoriales/`.
Se llama con la fecha y unas palabras del título, así:

```
2026-08-24-el-cincuenta-y-dos.md
```

Y por dentro tiene dos partes: **la ficha** (arriba, entre las dos líneas de
guiones) y **el texto** (todo lo que va debajo).

```markdown
---
numero: "52%"
titulo: La cifra que nadie mira
fecha: 2026-08-24
resumen: Una o dos frases. Esto es lo que se ve en WhatsApp y en Google.
cantera: mercados
fuentes:
  - nombre: Nombre de la institución
    documento: Nombre del informe o la encuesta
    anio: 2026
    url: https://enlace-a-la-fuente.com
medio:
  nombre: Nombre del periódico
  url: https://enlace-al-articulo.com
---

Aquí empieza tu editorial. Escribe normal.

Un renglón en blanco separa un párrafo del siguiente.

## Un subtítulo se marca con dos almohadillas

> Una frase que quieras destacar se marca con este signo al principio.

Para poner algo en **negrita**, se rodea con dos asteriscos. En la web sale
en dorado.
```

### Qué significa cada campo de la ficha

| Campo | Qué es | ¿Obligatorio? |
|---|---|---|
| `numero` | El número protagonista. **Siempre entre comillas.** Admite `"52%"`, `"18"`, `"1.000"`, `"0,7"` | Sí |
| `titulo` | El título del editorial | Sí |
| `fecha` | `AAAA-MM-DD`. Manda el orden: el más reciente sale en la portada | Sí |
| `resumen` | Una o dos frases. Es lo que se lee en WhatsApp, Google y las tarjetas | Sí |
| `cantera` | Una de estas cinco, **sin tildes**: `mercados`, `arte`, `mujeres`, `vida`, `efemerides` | Sí |
| `fuentes` | La lista de citas. Puede ir vacía: `fuentes: []` | No |
| `medio` | Solo si salió antes en un periódico | No |
| `borrador` | Ponle `borrador: true` para dejarlo escrito **sin publicar** | No |

### Las fuentes: escríbelas siempre reales

El bloque de fuentes es lo que separa un editorial con criterio de una
opinión suelta. **Nunca pongas una institución o una cifra que no hayas
comprobado**: quien te lea va a dar por cierto lo que digas ahí, y va con tu
nombre encima.

Si todavía no tienes la fuente a mano, deja `fuentes: []` y el bloque no
aparece. Es preferible a inventarla.

### Tres reglas que evitan el 90% de los problemas

1. **El número va entre comillas.** `numero: "18"`, no `numero: 18`.
2. **La cantera va sin tildes.** `efemerides`, no `efemérides`.
3. **La sangría importa.** En la lista de fuentes, los espacios del principio
   de cada línea tienen que quedar como en el ejemplo.

### Si te equivocas, no pasa nada

La web **no se puede romper publicando**. Si la ficha tiene un error, la
construcción falla y Cloudflare deja en pie la versión anterior. Se arregla y se
vuelve a subir.

---

## 2. Dónde vive la web

La web está en **Cloudflare Pages**, conectada al repositorio `el-numero`. Cada
vez que se sube un editorial, Cloudflare lo detecta y reconstruye el sitio solo.
No hay que entrar a ningún panel.

La dirección es **elnumero.pages.dev**.

*Antes estuvo en Netlify. Se mudó porque Netlify agotó los créditos de su plan
gratuito y pausó las publicaciones: los editoriales se subían al repositorio
pero la web no se actualizaba. El archivo `netlify.toml` sigue ahí por si algún
día conviene volver.*

### Si alguna vez hay que volver a conectarla

Cloudflare → **Compute** → **Workers & Pages** → **Create** → abajo del todo,
**"Looking to deploy Pages? Get started"** → **Connect to Git** → repositorio
`el-numero`. Preset **Astro**, comando `npm run build`, carpeta `dist`.

---

## 3. Conectar tu dominio propio

Si compras un dominio (por ejemplo `elnumero.co`):

1. En Cloudflare, dentro del proyecto: **Custom domains → Set up a domain**.
2. Escribe tu dominio y sigue lo que te indique.
3. Si compraste el dominio fuera de Cloudflare, te dará unos **servidores de
   nombres**: hay que pegarlos donde lo compraste (GoDaddy, Namecheap…), en la
   sección **Nameservers** o **Servidores DNS**.
4. Espera. Puede tardar entre una hora y un día. Es normal.

El certificado de seguridad (el candado del navegador) Cloudflare lo pone solo y
gratis. No hay que hacer nada.

**Un último paso, importante:** cuando el dominio esté andando hay que decírselo
en dos sitios — `astro.config.mjs` (para el RSS, el buscador y las imágenes de
compartir) y `js/publicar.js` de la app (para el enlace que te da al publicar).

Dímelo y lo cambio yo.

---

## 4. Cómo te escribe la gente

No hay formulario ni lista de correo. En la portada, en cada editorial y en
`/enlaces` hay un bloque que dice **"Si quieres saber de mí, escríbeme"** con tu
correo y tu Instagram. Quien te quiera escribir, te escribe directo: llega a tu
bandeja como cualquier otro correo.

No hay nada que configurar y no hay nada que se pueda caer.

Si algún día quieres una lista de verdad, dímelo y la montamos.

---

## 5. Cambiar cosas del sitio

| Qué quieres cambiar | Dónde está |
|---|---|
| Tu biografía | `src/pages/sobre.astro` — busca los párrafos marcados como placeholder |
| El enlace del podcast en Spotify | `src/pages/el-30.astro` y `src/pages/enlaces.astro`, arriba del todo |
| Tu LinkedIn e Instagram | `src/pages/enlaces.astro`, arriba del todo |
| Los colores de la marca | `src/styles/tokens.css` — están todos juntos al principio |
| El texto de "escríbeme" y tu correo | `src/components/Escribeme.astro` |

O simplemente pídemelo.

---

## 6. Ver la web en tu computador antes de publicar

Solo si alguna vez quieres. No es necesario.

```bash
npm install     # una vez
npm run dev     # y abre http://localhost:4321
```

---

## 7. Notas técnicas

*Esto es para mí, o para quien toque el código algún día. Puedes saltártelo.*

**Estructura.** Astro 5 con content collections. Salida estática pura: no hay
servidor, no hay base de datos, no hay JavaScript en el navegador salvo el
filtro del archivo (que degrada bien: sin JS se ven todos los números).

**El esquema.** `src/content.config.ts` valida el frontmatter con Zod. Un
editorial mal formado rompe la construcción **a propósito**: es preferible que
falle el despliegue a que se publique algo roto.

**Las imágenes de compartir.** Se generan en la construcción con `satori` +
`@resvg/resvg-js` desde `src/lib/og.ts`. No hay servicio externo ni función
serverless.

**Las fuentes.** Cormorant Garamond se sirve desde el propio sitio
(`public/fonts/*.woff2`, variable, 71 KB) para no depender de Google y para que
cargue antes.

**Si alguna vez hay que regenerar las fuentes de las imágenes de compartir:**
satori no lee woff2 ni fuentes variables, así que en `src/fuentes-build/` hay
instancias estáticas en TTF. Se generaron así:

```bash
npm install wawoff2                              # woff2 → ttf
pip install fonttools opentype-feature-freezer   # variable → estática, y cifras alineadas
# 1. decomprimir el woff2 a ttf con wawoff2
# 2. fontTools.varLib.instancer → instanciar a wght 400 y 600
# 3. pyftfeatfreeze -f lnum → congelar las cifras alineadas
#    (Cormorant trae cifras de estilo antiguo por defecto; en el número
#     gigante deben ir alineadas, como en la web)
```

**Colores.** Salen del `LEEME.txt` del paquete de logo, que está copiado en
`public/marca/` para que no se pierda. Contraste medido sobre el navy:
crema 8.67:1 · sol 6.92:1 · mint 5.54:1. **El teal da 2.35:1 sobre navy: no se
usa para texto sobre azul**, solo sobre fondos claros.
