import { z } from 'zod'

import { genres } from '@/constants/ai'

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
  textReference: z.string().trim().optional(),

  // THIS IS THE OPENAI API KEY USED TO GENERATE THE AI IF THE USER PROVIDES IT
  apiKey: z.string().optional()
})

export type BeginTale = z.infer<typeof beginTaleSchema>
