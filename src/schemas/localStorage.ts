import { z } from 'zod'

import { DEFAULT_VOICE_INDEX } from '@/constants'

export const settingsLocalStorageSchema = z.object({
  voiceIndex: z.coerce.number().default(DEFAULT_VOICE_INDEX)
})
