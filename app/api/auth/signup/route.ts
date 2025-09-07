// import { NextResponse } from 'next/server'
// import bcrypt from 'bcryptjs'
// import { connectToDatabase } from '@/lib/db'
// import User from '@/lib/db/models/Cart'

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json()
//     await connectToDatabase()

//     const existingUser = await User.findOne({ email })
//     if (existingUser) {
//       return NextResponse.json(
//         { message: 'User already exists' },
//         { status: 400 }
//       )
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)
//     await User.create({ name, email, password: hashedPassword })

//     return NextResponse.json({ message: 'Signup successful' }, { status: 201 })
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return NextResponse.json({ message: 'Signup failed' }, { status: 500 })
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/db/models/Cart'

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // ✅ Normalize email
    const normalizedEmail = email.toLowerCase()

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Save new user
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    })

    await newUser.save()

    return NextResponse.json(
      { message: 'Signup successful', userId: newUser._id },
      { status: 201 }
    )
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
