// Las opciones de voto, en un solo sitio.
//
// El lector no le pone una nota al editorial: elige con que numero se queda.
// Por eso no hay un orden de mejor a peor — 30 no es «peor que 50/50», es otra
// postura. Es la misma idea de la que vive la pagina entera.
//
// El id es lo que se guarda y no debe cambiar nunca: si cambia, los votos ya
// guardados se quedan huerfanos y las cuentas empiezan de cero.

export interface Opcion {
  id: string;
  numero: string;
  texto: string;
}

export const OPCIONES: Opcion[] = [
  { id: '100', numero: '100%', texto: 'Me dio en el blanco' },
  { id: '5050', numero: '50/50', texto: 'Me dejó dudando' },
  { id: '30', numero: '30', texto: 'Me quedé con la minoría' },
  { id: '0', numero: '0', texto: 'No me movió' },
];

export const IDS = OPCIONES.map((o) => o.id);
