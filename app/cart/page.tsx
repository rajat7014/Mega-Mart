'use client'

import { Button } from '@/components/ui/button'
import useCartStore from '@/hooks/use-cart-store'

export default function CartPage() {
  const { cart, removeItem, clearCart } = useCartStore()

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-primary mb-6'>🛒 My Cart</h1>

      {cart.items.length === 0 ? (
        <div className='text-center text-muted-foreground'>
          <p className='text-lg'>Your cart is empty</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {cart.items.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between border rounded-xl p-4 shadow-sm bg-background'
            >
              <div>
                <h2 className='font-semibold text-lg'>{item.name}</h2>
                <p className='text-sm text-muted-foreground'>
                  Qty: {item.quantity} × ${item.price}
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <p className='font-semibold text-base'>
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => removeItem(item)}
                  className='rounded-full'
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {/* Cart Total Section */}
          <div className='mt-8 border-t pt-6 flex justify-between items-center'>
            <h2 className='text-xl font-bold'>Total</h2>
            <p className='text-xl font-bold text-primary'>
              ${cart.totalPrice.toFixed(2)}
            </p>
          </div>

          <div className='mt-6 flex gap-4'>
            <Button
              variant='secondary'
              className='rounded-full flex-1'
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            <Button
              className='rounded-full flex-1'
              onClick={() => alert('Proceeding to Checkout')}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
