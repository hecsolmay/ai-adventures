import { AIError } from '@/errors/AIError'
import { ChoicesError } from '@/errors/ChoicesError'

export function handleErrorResponse (err: unknown) {
  console.error(err)

  if (err instanceof ChoicesError) {
    return Response.json(
      {
        message: 'Something went wrong with the ai machine',
        error: err.message,
        cause: err.cause
      },
      { status: 400 }
    )
  }

  if (err instanceof AIError) {
    return Response.json(
      {
        message: 'Something went wrong with the ai machine',
        error: err.message,
        isError: true
      },
      { status: 408 }
    )
  }

  if (err instanceof Error) {
    return Response.json({ error: err.message }, { status: 500 })
  }

  return Response.json({ error: 'Something went wrong' }, { status: 500 })
}
