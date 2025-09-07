// import { UserIcon } from 'lucide-react'
// import Link from 'next/link'
// import CartButton from './cart-button'

// export default function Menu() {
//   return (
//     <div className='flex justify-end'>
//       <nav className='flex gap-4 w-full'>
//         <Link href='/login' className='header-button'>
//           <UserIcon className='h-8 w-8'></UserIcon>
//           <span className='font-bold'>Sign-in</span>
//         </Link>

//         {/* <Link href='/cart' className='header-button'>
//           <ShoppingCartIcon className='h-8 w-8' />
//           <span className='font-bold'>Cart</span>
//         </Link> */}

//         <Link href='/signup' className='header-button'>
//           <UserIcon className='h-8 w-8'></UserIcon>
//           <span className='font-bold'>Sign-up</span>
//         </Link>
//         <CartButton />
//       </nav>
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCartIcon, UserIcon } from 'lucide-react'
// import useCartStore from '@/hooks/use-cart-store'
import { useEffect, useState } from 'react'
// import CartButton from './cart-button'

export default function Menu() {
  // const { cart } = useCartStore()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // ✅ Check if token exists in localStorage (after login)
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <nav className='flex items-center gap-6'>
      {/* <Link href='/' className='hover:text-primary'>
        Home
      </Link> */}

      {!isLoggedIn ? (
        <>
          <Link href='/login' className='header-button'>
            <UserIcon className='h-8 w-8'></UserIcon>
            <span className='font-bold'>Sign-in</span>
          </Link>

          <Link href='/signup' className='header-button'>
            <UserIcon className='h-8 w-8'></UserIcon>
            <span className='font-bold'>Sign-up</span>
          </Link>
        </>
      ) : (
        <>
          {/* <Link href='/cart' className='relative'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
            >
              <ShoppingCart size={18} />
              Cart
              {cart.items.length > 0 && (
              <>
                <ShoppingCartIcon className='h-8 w-8' />
                <span className='font-bold'>Cart</span>
              </>
              
            </Button>
          </Link> */}
          <Link href='/cart' className='header-button'>
            <ShoppingCartIcon className='h-8 w-8' />
            <span className='font-bold'>Cart</span>
          </Link>

          {/* Optional Logout button */}
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = '/login'
            }}
          >
            Logout
          </Button>
        </>
      )}
    </nav>
  )
}
