// La lista de correo vive en MailerLite: ellos guardan las direcciones, mandan
// los envíos, gestionan las bajas y cumplen la ley de correo comercial. Aquí
// solo está el formulario, con el diseño del sitio.
//
// El envío va por detrás y la persona sigue en el sitio.
//
// La dirección de MailerLite contesta con datos en bruto —{"success":true}— e
// ignora la redirección que se configure en su panel: quien se apuntaba
// terminaba mirando una pantalla de código. Así que el formulario se manda con
// JavaScript y la propia página lleva a /gracias/.
//
// Sin JavaScript el formulario sigue funcionando por POST normal: se apunta
// igual, solo que acaba viendo esa pantalla fea. Es preferible a que no
// funcione.
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
