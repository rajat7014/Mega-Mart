import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/db/models/Cart'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  await connectToDatabase()

  const { email, password } = await req.json()

  const user = await User.findOne({ email })
  if (!user)
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 400 }
    )

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid)
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 400 }
    )

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return NextResponse.json(
    {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    },
    { status: 200 }
  )
}
