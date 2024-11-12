import { v2 as cloudinary, type ResourceApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function getCharactersImages () {
  try {
    const result = (await cloudinary.search
      .expression('folder:ai-adventures/characters')
      .execute()) as ResourceApiResponse

    const resources = result.resources

    return resources
  } catch (error) {
    console.error('Error al listar imágenes:', error)
  }
}

export default cloudinary
