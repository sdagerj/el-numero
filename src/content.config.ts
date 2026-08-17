import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Este archivo es la red de seguridad al publicar.
//
// Si un editorial trae un campo mal escrito, una cantera que no existe o le
// falta el resumen, la construcción FALLA y Netlify deja en pie la versión
// anterior del sitio. Es imposible tumbar la web publicando mal.

export const CANTERAS = ['mercados', 'arte', 'mujeres', 'vida', 'efemerides'] as const;

// Cómo se muestra cada cantera en pantalla (en el .md se escribe sin tildes).
export const NOMBRE_CANTERA: Record<(typeof CANTERAS)[number], string> = {
  mercados: 'Mercados',
  arte: 'Arte',
  mujeres: 'Mujeres',
  vida: 'Vida',
  efemerides: 'Efemérides',
};

const editoriales = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/editoriales' }),
  schema: z.object({
    // El número protagonista. Es texto, no cifra: admite "52%", "1.000", "0,7".
    numero: z.string().min(1, 'El número no puede ir vacío.'),

    titulo: z.string().min(1, 'Falta el título.'),
    fecha: z.coerce.date(),

    // Sale en WhatsApp, en Google y en las tarjetas del archivo.
    resumen: z.string()
      .min(20, 'El resumen es muy corto: escribe una o dos frases completas.')
      .max(300, 'El resumen es muy largo: una o dos frases bastan.'),

    cantera: z.enum(CANTERAS, {
      errorMap: () => ({ message: `La cantera debe ser una de: ${CANTERAS.join(', ')}` }),
    }),

    fuentes: z.array(z.object({
      nombre: z.string(),
      documento: z.string(),
      anio: z.union([z.number(), z.string()]),
      url: z.string().url('La url de la fuente debe empezar por https://').optional(),
    })).default([]),

    // Solo si el editorial salió antes en un periódico.
    medio: z.object({
      nombre: z.string(),
      url: z.string().url().optional(),
    }).optional(),

    // Para dejar un editorial escrito sin que salga todavía.
    borrador: z.boolean().default(false),
  }),
});

export const collections = { editoriales };
