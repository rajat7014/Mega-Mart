// 'use client'
// import { useState } from 'react'
// import api from '@/utils/api'
// import { useRouter } from 'next/navigation'

// const SignupPage = () => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     interface SignupResponse {
//       message: string
//     }

//     try {
//       const res = await api.post<SignupResponse>('/auth/signup', {
//         name,
//         email,
//         password,
//       })
//       alert(res.data.message)
//       router.push('/login')
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message)
//       } else {
//         setError('Something went wrong')
//       }
//     }
//   }

//   return (
//     <div className='max-w-md mx-auto mt-20 p-4 border rounded'>
//       <h1 className='text-2xl font-bold mb-4'>Signup</h1>
//       {error && <p className='text-red-500'>{error}</p>}
//       <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
//         <input
//           type='text'
//           placeholder='Name'
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className='border p-2 rounded'
//         />
//         <input
//           type='email'
//           placeholder='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className='border p-2 rounded'
//         />
//         <input
//           type='password'
//           placeholder='Password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className='border p-2 rounded'
//         />
//         <button type='submit' className='bg-blue-600 text-white p-2 rounded'>
//           Signup
//         </button>
//       </form>
//     </div>
//   )
// }

// export default SignupPage

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/auth/signup', { name, email, password })
      toast.success('Signup successful! Please login.')
      router.push('/login')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-background'>
      <Card className='w-full max-w-md shadow-lg border rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold text-primary'>
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className='space-y-4'>
            <Input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='submit' className='w-full rounded-full'>
              Sign Up
            </Button>
          </form>
          <p className='text-sm text-center text-muted-foreground mt-4'>
            Already have an account?{' '}
            <a href='/login' className='text-primary hover:underline'>
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
