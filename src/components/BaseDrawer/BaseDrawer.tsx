import { forwardRef } from 'react'
import type { DrawerProps } from '@mui/material'
import StyledDrawer, { DRAWER_WIDTH } from './StyledDrawer'

type BaseDrawerProps = Omit<DrawerProps, 'children'> & {
  /** Contenido obligatorio del Drawer */
  children: React.ReactNode
  /** Ancho en px del Drawer (por defecto 280) */
  width?: number
  /** Rol para accesibilidad; por defecto 'navigation' */
  role?: string
}

const BaseDrawer = forwardRef<HTMLDivElement, BaseDrawerProps>(function BaseDrawer(
  { children, width = DRAWER_WIDTH, anchor = 'left', role = 'navigation', ModalProps, ...props },
  ref
) {
  return (
    <StyledDrawer
      ref={ref}
      anchor={anchor}
      drawerwidth={width}
      ModalProps={{ keepMounted: true, ...ModalProps }}
      {...props}
    >
      <div role={role} aria-label="Sidebar">
        {children}
      </div>
    </StyledDrawer>
  )
})

export default BaseDrawer
