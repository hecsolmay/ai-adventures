import { type CoreMessage } from 'ai'

import { prompt } from '@/constants/ai'
import { type BeginTale } from '@/schemas/tales'
import { generate } from '@/utils/ai'

export class TalesServices {
  static async start (beginTale: BeginTale) {
    const replacePrompt = prompt.replace('[genre]', beginTale.genre)
    const messages: CoreMessage[] = []

    messages.push({
      role: 'system',
      content: replacePrompt
    })

    const generatedResponse = await generate(messages, beginTale.apiKey)

    messages.push({
      role: 'assistant',
      content: generatedResponse.message
    })

    return {
      ...generatedResponse,
      messages
    }
  }
}
