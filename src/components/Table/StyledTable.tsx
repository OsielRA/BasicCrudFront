import { styled } from '@mui/material/styles'
import { TableContainer } from '@mui/material'

/** Contenedor con estilos globales para cualquier tabla */
const StyledTable = styled(TableContainer)(({ theme }) => ({
  borderRadius: +theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  minHeight: 250,
  overflowX: 'auto',

  // Encabezado
  '& .MuiTableHead-root .MuiTableCell-root': {
    fontWeight: 700,
  },

  // Zebra + hover
  '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableBody-root .MuiTableRow-root:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}))

export default StyledTable
