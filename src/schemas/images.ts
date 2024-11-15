import { z } from 'zod'

export const generateImageSchema = z.object({
  backgroundDescription: z
    .string({
      required_error: 'La descripción del fondo es obligatoria',
      invalid_type_error:
        'La descripción del fondo debe ser una cadena de texto'
    })
    .trim()
    .min(4, { message: 'La descripción del fondo es demasiado corta' }),
  apiKey: z.string({
    required_error: 'La clave de API es obligatoria',
    invalid_type_error: 'La clave de API debe ser una cadena de texto'
  })
})

export type GenerateImageSchema = z.infer<typeof generateImageSchema>
