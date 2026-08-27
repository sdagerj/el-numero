// La lista de correo vive en MailerLite: ellos guardan las direcciones, mandan
// los envíos, gestionan las bajas y cumplen la ley de correo comercial. Aquí
// solo está el formulario, con el diseño del sitio.
//
// Se manda por POST normal, sin JavaScript. Podría hacerse con fetch para no
// salir de la página, pero la respuesta de MailerLite no se puede leer desde
// otro dominio, así que no habría forma de distinguir un envío correcto de uno
// fallido — y diríamos "gracias" aunque el correo no se hubiera guardado.
// Con el POST de toda la vida, MailerLite recibe y devuelve a /gracias/.
//
// ── PARA CONECTARLA ──────────────────────────────────────────────────────────
// 1. Crear cuenta en mailerlite.com
// 2. Formularios → Embedded form → crear uno
// 3. Copiar la dirección del "action" del formulario y pegarla aquí abajo
// 4. En sus ajustes, poner como redirección: https://elnumero.pages.dev/gracias/
//
// Mientras esté vacío, el formulario no se dibuja: es preferible no enseñar una
// caja de correo que no guarda nada.
// Los dos números salen de la dirección del formulario en MailerLite:
// preview.mailerlite.io/forms/2600437/196971072657033101/share
//              cuenta ──┘        formulario ──┘
export const LISTA_ACCION =
  'https://assets.mailerlite.com/jsonp/2600437/forms/196971072657033101/subscribe';

export const hayLista = () => LISTA_ACCION.trim().length > 0;
