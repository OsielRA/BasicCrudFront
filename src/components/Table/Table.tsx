import * as React from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Skeleton, TablePagination, type TableCellProps
} from '@mui/material'
import StyledTable from './StyledTable'

export type Align = TableCellProps['align']

export type ColumnDef<T extends object> = {
  /** ID único de la columna */
  id: string
  /** Título del header (puede ser ReactNode) */
  header: React.ReactNode
  /** Clave directa del objeto fila a mostrar */
  field?: keyof T
  /** Render personalizado; tiene prioridad sobre `field` */
  cell?: (row: T) => React.ReactNode
  align?: Align
  width?: number | string
}

export type TableComponentProps<T extends object> = {
  columns: Array<ColumnDef<T>>
  rows: T[]
  loading?: boolean
  emptyMessage?: string
  stickyHeader?: boolean
  size?: 'small' | 'medium'
  /** Clave única por fila; si no se provee, usa el índice */
  rowKey?: (row: T, index: number) => React.Key
  /** Paginación opcional (controlada) */
  pagination?: {
    page: number
    rowsPerPage: number
    total: number
    onPageChange: (page: number) => void
    onRowsPerPageChange?: (size: number) => void
  }
}

export default function TableComponent<T extends object>({
  columns,
  rows,
  loading = false,
  emptyMessage = 'Sin resultados',
  stickyHeader = true,
  size = 'small',
  rowKey,
  pagination,
}: TableComponentProps<T>) {
  const keyOf = (row: T, i: number) => rowKey?.(row, i) ?? i

  const visibleRows = React.useMemo(() => {
    if (!pagination) return rows
    const start = pagination.page * pagination.rowsPerPage
    return rows.slice(start, start + pagination.rowsPerPage)
  }, [rows, pagination])

  return (
    <>
      <StyledTable>
        <Table stickyHeader={stickyHeader} size={size} aria-label="tabla">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id} align={col.align} sx={{ width: col.width }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={`sk-${i}`}>
                  {columns.map((c) => (
                    <TableCell key={`${c.id}-${i}`}>
                      <Skeleton width="80%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading && visibleRows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              visibleRows?.map((row, i) => (
                <TableRow hover key={keyOf(row, i)}>
                  {columns.map((col) => {
                    const content =
                      col.cell ? col.cell(row) :
                      col.field ? (row[col.field] as React.ReactNode) :
                      null
                    return (
                      <TableCell key={col.id} align={col.align}>
                        {content}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </StyledTable>

      {pagination && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, 50]}
          count={pagination.total}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={(_, p) => pagination.onPageChange(p)}
          onRowsPerPageChange={(e) => pagination.onRowsPerPageChange?.(parseInt(e.target.value, 10))}
        />
      )}
    </>
  )
}
