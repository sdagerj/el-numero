# Cómo publicar en El Número

Todo lo que necesitas saber para manejar tu web. No hace falta que entiendas
código: esto está escrito para leerse de arriba abajo.

---

## 1. Publicar un editorial nuevo

### La forma corta

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
  - nombre: DANE
    documento: Encuesta de micronegocios
    anio: 2026
    url: https://www.dane.gov.co/algo
medio:
  nombre: La República
  url: https://www.larepublica.co/algo
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

### Tres reglas que evitan el 90% de los problemas

1. **El número va entre comillas.** `numero: "18"`, no `numero: 18`.
2. **La cantera va sin tildes.** `efemerides`, no `efemérides`.
3. **La sangría importa.** En la lista de fuentes, los espacios del principio
   de cada línea tienen que quedar como en el ejemplo.

### Si te equivocas, no pasa nada

La web **no se puede romper publicando**. Si la ficha tiene un error, la
construcción falla y Netlify deja en pie la versión anterior. Te llega un correo
diciendo qué salió mal, se arregla, y se vuelve a subir.

---

## 2. Conectar la web a Netlify (una sola vez)

1. Entra a **[netlify.com](https://netlify.com)** y crea una cuenta
   **con tu usuario de GitHub** (es lo más fácil: así ya quedan conectados).
2. **Add new site → Import an existing project**.
3. **Deploy with GitHub** → autoriza → elige el repositorio **`el-numero`**.
4. Netlify lee la configuración sola del archivo `netlify.toml`. Debe mostrar:
   - Build command: `npm run build`
   - Publish directory: `dist`

   Si eso aparece, no toques nada.
5. **Deploy site**.

En un par de minutos te da una dirección tipo `algo-random-123.netlify.app`.
Esa ya funciona y ya la puedes compartir.

**Desde ese momento, cada vez que se sube un editorial la web se actualiza sola.**
No hay que volver a entrar a Netlify.

### Cambiarle el nombre feo

**Site configuration → Change site name** → ponle `elnumero`.
Queda `elnumero.netlify.app`, que ya sirve perfectamente para tu bio de Instagram.

---

## 3. Conectar tu dominio propio

Si compras un dominio (por ejemplo `elnumero.co`):

1. En Netlify: **Domain management → Add a domain** → escribe tu dominio.
2. Netlify te muestra unos **servidores de nombres** (cuatro direcciones que
   terminan en `nsone.net`).
3. Entra a donde compraste el dominio (GoDaddy, Namecheap, Google Domains…),
   busca **Nameservers** o **Servidores DNS**, y pega esos cuatro.
4. Espera. Puede tardar entre una hora y un día. Es normal.

El certificado de seguridad (el candado del navegador) Netlify lo pone solo y
gratis. No hay que hacer nada.

**Un último paso, importante:** cuando el dominio esté andando, hay que cambiar
una línea en `astro.config.mjs` para que las imágenes de compartir apunten al
dominio nuevo:

```js
site: 'https://elnumero.co',   // ← tu dominio
```

Dímelo y lo cambio yo.

---

## 4. Los correos de la lista

El formulario usa **Netlify Forms**. No hay que configurar nada: ya funciona.

Para ver quién se ha apuntado: en Netlify, pestaña **Forms** → formulario
**`lista`**. Ahí están todos los correos y se pueden descargar en un archivo.

Para que te avise cuando alguien se apunta:
**Forms → Settings → Form notifications → Add notification → Email notification**.

El plan gratuito de Netlify incluye 100 envíos al mes. Si algún mes te pasas,
Netlify te avisa.

---

## 5. Cambiar cosas del sitio

| Qué quieres cambiar | Dónde está |
|---|---|
| Tu biografía | `src/pages/sobre.astro` — busca los párrafos marcados como placeholder |
| El enlace del podcast en Spotify | `src/pages/el-30.astro` y `src/pages/enlaces.astro`, arriba del todo |
| Tu LinkedIn e Instagram | `src/pages/enlaces.astro`, arriba del todo |
| Los colores de la marca | `src/styles/tokens.css` — están todos juntos al principio |
| El texto del formulario | `src/components/FormularioCorreo.astro` |

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
