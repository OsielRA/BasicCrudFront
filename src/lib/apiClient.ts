import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1',
  withCredentials: true,
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export interface ApiError {
  status: number
  message: string
  details?: unknown
}

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const err: ApiError = {
      status: error?.response?.status ?? 0,
      message: error?.response?.data?.message ?? error.message,
      details: error?.response?.data,
    }
    return Promise.reject(err)
  }
)
