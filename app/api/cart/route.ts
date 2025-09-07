import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Cart from '@/lib/db/models/Cart'
import { connectToDatabase } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    const token = req.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    const userId = decoded.id

    const { productId, quantity } = await req.json()

    const cartItem = await Cart.findOneAndUpdate(
      { user: userId, product: productId },
      { $inc: { quantity: quantity || 1 } },
      { upsert: true, new: true }
    )

    return NextResponse.json({ message: 'Item added to cart', cartItem })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
