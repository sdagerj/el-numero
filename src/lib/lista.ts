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
export const LISTA_ACCION = '';

export const hayLista = () => LISTA_ACCION.trim().length > 0;
