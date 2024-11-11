'use server'

import { type ContinueTale } from '@/schemas/tales'
import { TalesServices } from '@/services/tales'

export async function beginTaleStory (genre: string) {
  const result = await TalesServices.start({ genre })
  return result
}

export async function continueTaleStory (continueTale: ContinueTale) {
  const result = await TalesServices.continueTale(continueTale)
  return result
}
