import { z } from 'zod'

export const coreMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant'], {
    message: 'Un rol válido es requerido los roles son: system, user, assistant'
  }),
  content: z
    .string({ message: 'El contenido del mensaje es requerido' })
    .trim()
    .min(3, 'El contenido debe tener al menos 3 caracteres')
    .toLowerCase()
})

export type CoreMessageType = z.infer<typeof coreMessageSchema>
