import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/db/models/Cart'
import { authMiddleware } from '@/middleware/auth'

import { AuthenticatedNextRequest } from '@/types/next'

const handler = async (req: AuthenticatedNextRequest) => {
  await connectToDatabase()
  const user = await User.findById(req.user.id).select('-password')
  return NextResponse.json(user, { status: 200 })
}

export const GET = authMiddleware(handler)
