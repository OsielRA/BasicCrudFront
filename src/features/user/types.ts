export type Role = 'admin' | 'user'

export interface User {
  id: number          // Ajustado a tipo de ID en el backend (number)
  name: string
  lastName: string
  email: string
  profileId?: number | null
  createdAt?: string
  updatedAt?: string
}

export interface UserCreation {
  name: string
  lastName: string
  email: string
  password: string
  profileId?: number | null
}