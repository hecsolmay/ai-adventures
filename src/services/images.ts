import { generateImageSchema } from '@/schemas/images'
import { uploadImageFromUrl } from '@/utils/cloudinary'
import { generateDalle3Image } from '@/utils/openai'

const MOCK_IMAGES = [
  'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/kdd5ewyvp1cfys3raw0w',
  'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/xbrhfp9mfkniiw8uooil',
  'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/ql0kqfe8ee4hpkodaxuj'
]

const delay = async (ms: number) =>
  await new Promise(resolve => setTimeout(resolve, ms))

export async function generateImage (data: any, isMock = true) {
  const {
    success,
    data: resultData,
    error
  } = generateImageSchema.safeParse(data)

  if (!success) {
    return { success: false, error: error.flatten(), imageUrl: null }
  }

  const { backgroundDescription, apiKey } = resultData

  let imageUrl: string | null = null

  if (isMock) {
    imageUrl = await getRandomImageOrNull()
  } else {
    imageUrl = await getDalle3Image(backgroundDescription, apiKey)
  }

  return { success: true, imageUrl }
}

async function getDalle3Image (backgroundDescription: string, apiKey: string) {
  let image: string | null = null

  try {
    const prompt = `${backgroundDescription} Make it Storybook style, whimsical, soft colors, magical atmosphere`
    image = await generateDalle3Image(apiKey, prompt)

    if (image === null) {
      return null
    }

    const cloudinaryUrl = await uploadImageFromUrl(image)
    image = cloudinaryUrl
  } catch (error) {
    console.error(error)
  }

  return image
}

async function getRandomImageOrNull () {
  const MIN_NUMBER = 1
  const MAX_NUMBER = 4
  // Generar un número aleatorio entre 3 y 6
  const randomNumber =
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER

  await delay(randomNumber * 1000)

  if (randomNumber === MIN_NUMBER) {
    return null
  }

  // Verificar si el número es par
  const randomIndex = Math.floor(Math.random() * MOCK_IMAGES.length)
  return MOCK_IMAGES[randomIndex]
}
