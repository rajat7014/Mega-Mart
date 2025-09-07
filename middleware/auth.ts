import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { AuthenticatedNextRequest } from '@/types/next'

export const authMiddleware =
  (handler: (req: AuthenticatedNextRequest) => Promise<NextResponse>) =>
  async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization')
    if (!authHeader)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string
        email: string
      }

      // Type-safe extension
      const authReq = req as AuthenticatedNextRequest
      authReq.user = decoded

      return handler(authReq)
    } catch (err: unknown) {
      if (err instanceof Error) {
        return NextResponse.json({ message: err.message }, { status: 401 })
      }
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
  }
