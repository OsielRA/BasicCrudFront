export interface User {
  id: string
  name: string
  email: string
  role?: 'admin' | 'user'
  createdAt?: string
  updatedAt?: string
}

export interface Paginated<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
