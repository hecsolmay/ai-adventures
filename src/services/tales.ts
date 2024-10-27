import { type CoreMessage } from 'ai'

import { prompt } from '@/constants/ai'
import { type ContinueTale, type BeginTale } from '@/schemas/tales'
import { generate } from '@/utils/ai'

export class TalesServices {
  static async start (beginTale: BeginTale) {
    const replacePrompt = prompt.replace('[genre]', beginTale.genre)
    const messages: CoreMessage[] = []

    messages.push({
      role: 'system',
      content: replacePrompt
    })

    const { fragment, rawMessage } = await generate(messages, beginTale.apiKey)

    messages.push({
      role: 'assistant',
      content: rawMessage
    })

    return {
      ...fragment,
      messages
    }
  }

  static async continueTale (continueTale: ContinueTale) {
    const messages: CoreMessage[] = continueTale.messages

    messages.push({
      role: 'user',
      content: continueTale.choice
    })

    const { fragment, rawMessage } = await generate(
      messages,
      continueTale.apiKey
    )

    messages.push({
      role: 'assistant',
      content: rawMessage
    })

    return {
      ...fragment,
      messages
    }
  }
}
