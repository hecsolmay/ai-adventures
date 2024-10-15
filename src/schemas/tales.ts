import { z } from 'zod'

import { genres } from '@/constants/ai'

import { coreMessageSchema } from './messages'

const lowerCaseGenres = genres.map(genre => genre.toLowerCase())

export const beginTaleSchema = z.object({
  // CHECK IF THE GENRE IS VALID WITH THE LIST OF GENRES
  genre: z
    .string({ message: 'Genre is required' })
    .trim()
    .toLowerCase()
    .refine(genre => lowerCaseGenres.includes(genre), {
      message: `Género invalido debes escoger uno de los géneros validos de la lista: ${genres.join(
        ','
      )}`
    }),

  // THIS IS A TEXT REFERENCE USED TO IMPROVE THE TALE WITH THE USER CHOICE
  imageURLBackground: z.string().trim().optional(),

  // THIS IS THE OPENAI API KEY USED TO GENERATE THE AI IF THE USER PROVIDES IT
  apiKey: z.string().optional()
})

export type BeginTale = z.infer<typeof beginTaleSchema>

export const continueTaleSchema = z.object({
  // VALIDATE MESSAGES
  messages: z
    .array(coreMessageSchema, {
      message:
        'Debes mandar un array de mensajes con el formato de CoreMessages (role = system o user o assistant, content = string)'
    })
    .min(
      1,
      'Al menos un elemento es requerido con el formato de CoreMessages (role = system o user o assistant, content = string)'
    ),
  choice: z
    .string({ message: 'El texto de la opción elegida es requerida' })
    .trim()
    .min(1, 'El texto de la opción elegida es requerido'),

  // THIS IS A TEXT REFERENCE USED TO IMPROVE THE TALE WITH THE USER CHOICE
  imageURLBackground: z.string().trim().optional(),

  // THIS IS THE OPENAI API KEY USED TO GENERATE THE AI IF THE USER PROVIDES IT
  apiKey: z.string().optional()
})

export type ContinueTale = z.infer<typeof continueTaleSchema>
