'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import useCartStore from '@/hooks/use-cart-store'
// import { useToast } from '@/hooks/use-toast'
import { OrderItem } from '@/types'
// import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddToCart({
  item,
  minimal = false,
}: {
  item: OrderItem
  minimal?: boolean
}) {
  const router = useRouter()
  // const { toast } = useToast()

  const { addItem } = useCartStore()

  //PROMPT: add quantity state
  const [quantity, setQuantity] = useState(1)

  return minimal ? (
    <Button
      className='rounded-full w-auto'
      onClick={() => {
        try {
          addItem(item, 1)
          toast('Item Added', {
            description: 'Added to cart',
            action: (
              <Button
                onClick={() => {
                  router.push('/cart')
                }}
              >
                Go to cart
              </Button>
            ),
          })
          // router.push('/cart')
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message)
          } else {
            toast.error('Failed to add to cart')
          }
        }
      }}
    >
      Add to Cart
    </Button>
  ) : (
    <div className='w-full space-y-2'>
      <Select
        value={quantity.toString()}
        onValueChange={(i) => setQuantity(Number(i))}
      >
        <SelectTrigger className=''>
          <SelectValue>Quantity: {quantity}</SelectValue>
        </SelectTrigger>
        <SelectContent position='popper'>
          {Array.from({ length: item.countInStock }).map((_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className='rounded-full w-full'
        type='button'
        onClick={async () => {
          try {
            const itemId = await addItem(item, quantity)
            router.push(`/cart/${itemId}`)
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message)
            } else {
              toast.error('Failed to added')
            }
          }
        }}
      >
        Add to Cart
      </Button>
      <Button
        variant='secondary'
        onClick={() => {
          try {
            addItem(item, quantity)
            router.push('/checkout')
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message)
            } else {
              toast.error('Failed to checkout')
            }
          }
        }}
        className='w-full rounded-full '
      >
        Buy Now
      </Button>
    </div>
  )
}

// 'use client'

// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { toast } from 'sonner'
// import useCartStore from '@/hooks/use-cart-store'
// import { OrderItem } from '@/types'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'

// export default function AddToCart({
//   item,
//   minimal = false,
// }: {
//   item: OrderItem
//   minimal?: boolean
// }) {
//   const router = useRouter()
//   const { addItem } = useCartStore()
//   const [quantity, setQuantity] = useState(1)

//   const handleAddToCart = () => {
//     try {
//       addItem(item, quantity)
//       toast.success(`${item.name} added to cart`, {
//         action: {
//           label: 'Go to Cart',
//           onClick: () => router.push('/cart'),
//         },
//       })
//       router.push('/cart')
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.error(error.message)
//       } else {
//         toast.error('Failed to add to cart')
//       }
//     }
//   }

//   return minimal ? (
//     <Button onClick={handleAddToCart} className='rounded-full w-auto'>
//       Add to Cart
//     </Button>
//   ) : (
//     <div className='w-full space-y-2'>
//       <Select
//         value={quantity.toString()}
//         onValueChange={(i) => setQuantity(Number(i))}
//       >
//         <SelectTrigger>
//           <SelectValue>Quantity: {quantity}</SelectValue>
//         </SelectTrigger>
//         <SelectContent position='popper'>
//           {Array.from({ length: item.countInStock }).map((_, i) => (
//             <SelectItem key={i + 1} value={`${i + 1}`}>
//               {i + 1}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Button onClick={handleAddToCart} className='w-full rounded-full'>
//         Add to Cart
//       </Button>

//       <Button
//         variant='secondary'
//         onClick={() => {
//           try {
//             addItem(item, quantity)
//             router.push('/checkout')
//           } catch (error) {
//             if (error instanceof Error) {
//               toast.error(error.message)
//             } else {
//               toast.error('Failed to checkout')
//             }
//           }
//         }}
//         className='w-full rounded-full'
//       >
//         Buy Now
//       </Button>
//     </div>
//   )
// }
