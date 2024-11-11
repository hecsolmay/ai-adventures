import { beginTaleSchema } from '@/schemas/tales'
import { TalesServices } from '@/services/tales'
import { handleErrorResponse } from '@/utils/api'

export async function POST (request: Request) {
  const body = await request.json()

  const resultValidate = beginTaleSchema.safeParse(body)

  if (!resultValidate.success) {
    const flattenErrors = resultValidate.error.flatten()
    const errors = flattenErrors.fieldErrors
    return Response.json({ errors }, { status: 400 })
  }

  const beginTale = resultValidate.data

  try {
    const response = await TalesServices.start(beginTale)

    return Response.json(response)
  } catch (error) {
    return handleErrorResponse(error)
  }
}
