import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import { paths } from './paths'

// Lazy pages
const UsersPage = lazy(() => import('@/features/user/pages/UserPage'))
// Agregar profiles 

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      { path: paths.users, element: <UsersPage /> },
    ],
  },
]
