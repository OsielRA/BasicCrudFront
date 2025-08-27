import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './AppRoutes'
import { CircularProgress, Box } from '@mui/material'

export default function AppRoutes() {
  const element = useRoutes(routes)
  return (
    <Suspense fallback={
      <Box sx={{ display: 'grid', placeItems: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    }>
      {element}
    </Suspense>
  )
}