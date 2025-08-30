import { apiClient } from '@/lib/apiClient'
import type { User, UserCreation } from './types'

export async function fetchUsers(params?: { search?: string }) {
  const { data } = await apiClient.get<User[]>('/users', {
    params: params?.search ? { search: params.search } : {}
  })
  return data
}

export async function createUser(payload: UserCreation) {
  const { data } = await apiClient.post<User>('/users', payload)
  return data
}

export async function updateUser(id: number, payload: Partial<Omit<User, 'id'>>) {
  const { data } = await apiClient.put<User>(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: number) {
  await apiClient.delete(`/users/${id}`)
}
