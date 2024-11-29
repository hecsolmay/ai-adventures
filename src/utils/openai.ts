import { OpenAI } from 'openai'

function createOpenAIInstance (apiKey: string) {
  return new OpenAI({
    apiKey
  })
}

export async function generateDalle3Image (apiKey: string, prompt: string) {
  const openai = createOpenAIInstance(apiKey)

  const result = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024'
  })

  return result.data[0].url ?? null
}
