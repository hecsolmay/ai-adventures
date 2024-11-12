import { handleErrorResponse } from '@/utils/api'
import { getCharactersImages } from '@/utils/cloudinary'

export async function GET (request: Request) {
  try {
    const characters = await getCharactersImages()

    return Response.json(characters)
  } catch (error) {
    return handleErrorResponse(error)
  }
}
