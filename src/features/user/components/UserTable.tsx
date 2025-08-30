// features/users/components/UsersTable.tsx
import * as React from 'react'
import Table, { type ColumnDef } from '@/components/Table/Table'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { User } from '../types'

type Props = {
  rows: User[]
  loading?: boolean
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function UsersTable({ rows, loading, onEdit, onDelete }: Props) {
  const columns = React.useMemo<ColumnDef<User>[]>(() => [
    { id: 'id', header: 'ID', field: 'id', width: 90 },
    { id: 'name', header: 'Nombre', field: 'name' },
    { id: 'email', header: 'Correo', field: 'email' },
    {
      id: 'actions',
      header: 'Acciones',
      align: 'right',
      width: 140,
      cell: (r) => (
        <>
          <Tooltip title="Editar">
            <IconButton size="small" onClick={() => onEdit?.(r.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton size="small" color="error" onClick={() => onDelete?.(r.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ], [onEdit, onDelete])

  return (
    <Table<User>
      columns={columns}
      rows={rows}
      loading={loading}
      rowKey={(r) => r.id}
    />
  )
}
