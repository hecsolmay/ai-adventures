export async function generateTaleImage (
  prompt: string,
  apiKey: string
): Promise<{ imageUrl: string | null }> {
  try {
    const result = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ backgroundDescription: prompt, apiKey })
    })

    const json = await result.json()

    if (json.error !== undefined) {
      return { imageUrl: null }
    }

    return { imageUrl: json.imageUrl }
  } catch (error) {
    console.error(error)
    return { imageUrl: null }
  }
}
