'use server'

import { generateImage } from '@/services/images'

export async function generateTaleImage (prompt: string, apiKey: string) {
  const result = await generateImage({ backgroundDescription: prompt, apiKey })
  return result
}
