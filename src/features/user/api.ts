import { apiClient } from '@/lib/apiClient'
import type { User, Paginated } from './types'

export async function fetchUsers(params?: { page?: number; q?: string }) {
  const { data } = await apiClient.get<Paginated<User>>('/users', { params })
  return data
}

export async function createUser(payload: Pick<User, 'name' | 'email' | 'role'>) {
  const { data } = await apiClient.post<User>('/users', payload)
  return data
}

export async function updateUser(id: string, payload: Partial<Omit<User, 'id'>>) {
  const { data } = await apiClient.put<User>(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: string) {
  await apiClient.delete(`/users/${id}`)
}
