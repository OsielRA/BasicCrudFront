import { Drawer, styled } from '@mui/material'

export const DRAWER_WIDTH = 280

// Prop interna para controlar el ancho sin filtrarse al DOM
type StyledProps = { drawerwidth?: number }

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'drawerwidth',
})<StyledProps>(({ theme, drawerwidth = DRAWER_WIDTH }) => ({
  '& .MuiDrawer-paper': {
    width: drawerwidth,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))

export default StyledDrawer