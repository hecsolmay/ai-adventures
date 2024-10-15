import { continueTaleSchema } from '@/schemas/tales'
import { TalesServices } from '@/services/tales'

export async function POST (request: Request) {
  const body = await request.json()

  const resultValidate = continueTaleSchema.safeParse(body)

  if (!resultValidate.success) {
    const flattenErrors = resultValidate.error.flatten()
    const errors = flattenErrors.fieldErrors
    return Response.json({ errors }, { status: 400 })
  }

  const continueTale = resultValidate.data

  try {
    const response = await TalesServices.continueTale(continueTale)
    return Response.json(response)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
