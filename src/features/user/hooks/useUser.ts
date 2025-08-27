import { useEffect, useState } from 'react'
import { fetchUsers } from '../api'
import type { User, Paginated } from '../types'
import type { ApiError } from '@/lib/apiClient'

export function useUsers(params?: { page?: number; q?: string }) {
  const [data, setData] = useState<Paginated<User> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchUsers(params)
      .then((res) => !cancelled && setData(res))
      .catch((err: ApiError) => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [params, params?.page, params?.q])

  return { data, loading, error }
}
