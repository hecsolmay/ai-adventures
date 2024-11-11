'use server'

import { type ContinueTale } from '@/schemas/tales'
import { TalesServices } from '@/services/tales'

export async function beginTaleStory (genre: string) {
  try {
    const result = await TalesServices.start({ genre })
    return result
  } catch (error) {
    return {
      messages: [],
      message: '',
      choices: [],
      isError: true
    }
  }
}

export async function continueTaleStory (continueTale: ContinueTale) {
  try {
    const result = await TalesServices.continueTale(continueTale)
    return result
  } catch (error) {
    return {
      messages: [],
      message: '',
      choices: [],
      isError: true
    }
  }
}
