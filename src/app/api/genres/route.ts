import { type NextRequest, NextResponse } from 'next/server'

import { genres } from '@/constants/ai'

export function GET (_req: NextRequest) {
  return NextResponse.json(genres)
}
