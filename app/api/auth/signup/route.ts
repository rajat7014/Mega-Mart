import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/db/models/Cart'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    await connectToDatabase()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: 'Signup successful' }, { status: 201 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 })
  }
}
