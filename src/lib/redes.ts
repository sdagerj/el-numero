// Las redes, en un solo sitio.
//
// Antes cada pagina llevaba su propia lista de enlaces y el de LinkedIn se
// quedo en https://www.linkedin.com/ durante semanas porque habia que
// acordarse de cambiarlo en un archivo suelto. Ahora se cambia aqui y cambia
// en todas partes.
//
// Un enlace vacio no se dibuja: es preferible que no aparezca a que lleve a
// una pagina que todavia no existe.

export const INSTAGRAM = 'https://instagram.com/yomevoyconel30';
export const LINKEDIN = 'https://www.linkedin.com/in/stephanie-dager-ElNumero';
export const SPOTIFY = 'https://open.spotify.com/episode/3HUspxeHwX3oy6X4n4ATYM';
export const CORREO = 'sdagerj@gmail.com';

// ← Pega aqui la direccion del canal cuando este listo, entre las comillas.
//   Sale asi: https://www.youtube.com/@loquesea
//   Mientras este vacia, YouTube no aparece en ninguna parte del sitio.
export const YOUTUBE = '';

export interface Red {
  nombre: string;
  url: string;
}

// Solo las que tienen direccion, en el orden en que se muestran.
export function redes(): Red[] {
  return [
    { nombre: 'YouTube', url: YOUTUBE },
    { nombre: 'LinkedIn', url: LINKEDIN },
    { nombre: 'Instagram', url: INSTAGRAM },
  ].filter((r) => r.url.trim().length > 0);
}

export const hayYoutube = () => YOUTUBE.trim().length > 0;
