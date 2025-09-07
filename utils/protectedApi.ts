import axios from 'axios'

const protectedApi = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export default protectedApi
