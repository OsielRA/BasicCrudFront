import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api'
import type { User } from '../types'

export function useUsers(search?: string) {
  const { data, isLoading, error } = useQuery<User[], Error>(
    {
      queryKey: ['users', search],
      queryFn: () => fetchUsers({ search }),
      staleTime: 1000 * 60 * 5,
    }
  )

  return { data, loading: isLoading, error }
}