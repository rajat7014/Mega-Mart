import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

import { APP_NAME } from '@/lib/constants'
const categories = ['men', 'women', 'Accessories', 'kids']
export default function Search() {
  return (
    <form action='/search' method='GET' className='flex items-stretch -10'>
      <Select name='category'>
        <SelectTrigger className='w-auto h-10 dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none  '>
          <SelectValue placeholder='All' />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='all'>All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-10'
        placeholder={`Search ${APP_NAME}`}
        name='q'
        type='search'
      />
      <button
        type='submit'
        className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-4 py-2 '
      >
        <SearchIcon className='w-6 h-6' />
      </button>
    </form>
  )
}
