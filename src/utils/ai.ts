import type { FragmentType, Provider } from '@/types'

import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type CoreMessage } from 'ai'

import { ChoicesError } from '@/errors/ChoicesError'
import {
  aiGroqBaseURL,
  aiGroqModel,
  aiMaxTokens,
  aiOpenaiBaseURL,
  aiOpenaiModel,
  aiTemperature,
  reinforcePromptChoices
} from '@/constants/ai'

const regex = /\[(.*?)\]/g

export async function generate (
  messages: CoreMessage[],
  apikey: string = '',
  provider: Provider = 'openai'
) {
  const model = createProvider(apikey, provider)

  const limitTries: number = 5
  let isChoicesValid: boolean = false
  let currentTry: number = 0
  let text: string = ''

  while (!isChoicesValid && currentTry < limitTries) {
    const result = await generateText({
      model,
      messages,
      temperature: aiTemperature,
      maxTokens: aiMaxTokens
    })

    text = result.text
    isChoicesValid = validateChoices(text)
    if (!isChoicesValid) {
      messages.push({
        role: 'system',
        content: reinforcePromptChoices
      })
    }
    currentTry++
  }

  if (!isChoicesValid) {
    throw new ChoicesError()
  }

  return createFragment(text)
}

function validateChoices (text: string): boolean {
  return (text.match(regex) ?? []).length === 3
}

function createFragment (text: string): FragmentType {
  const choices: string[] = []
  let message: string = text
  let match
  while ((match = regex.exec(text)) !== null) {
    choices.push(match[1])
    message = message.replace(match[0], '')
  }

  return {
    message,
    choices,
    isError: false
  }
}

function createProvider (apiKey: string, provider: Provider) {
  if (apiKey == null || apiKey === '') {
    apiKey = process.env.GROQ_API_KEY ?? ''
    provider = 'groq'
  }

  let baseURL: string = ''
  let AIModel: string = ''

  if (provider === 'groq') {
    baseURL = aiGroqBaseURL
    AIModel = aiGroqModel
  }

  if (provider === 'openai') {
    baseURL = aiOpenaiBaseURL
    AIModel = aiOpenaiModel
  }

  const AIProvider = createOpenAI({
    compatibility: 'strict',
    baseURL,
    apiKey
  })

  return AIProvider(AIModel)
}
