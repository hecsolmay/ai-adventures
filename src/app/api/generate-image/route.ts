import { generateImage } from '@/services/images'

export async function POST (request: Request) {
  try {
    const body = await request.json()
    const result = await generateImage(body, false)

    if (result.error !== undefined) {
      return Response.json(result)
    }

    return Response.json({ imageUrl: result.imageUrl })
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: 'Error al generar la imagen', imageUrl: null },
      { status: 400 }
    )
  }
}
