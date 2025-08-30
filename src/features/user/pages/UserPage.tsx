import { useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Typography, Button, TextField, Stack, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import UsersTable from '../components/UserTable'
import { useUsers } from '../hooks/useUser'
import { createUser, deleteUser, updateUser } from '../api'

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const { data, loading } = useUsers(search)

  const handleCreate = async () => {
    try {
      const newUser = {
        name: 'Nuevo',
        lastName: 'Usuario',
        email: 'nuevo@usuario.com',
        password: '123456',
      }
      const user = await createUser(newUser)
      console.log('Usuario creado:', user)
    } catch (error) {
      console.error('Error al crear el usuario:', error)
    }
  }

  const handleEdit = async (id: number) => {
    try {
      const updatedUser = {
        name: 'Usuario Editado',
        lastName: 'Editado',
        email: 'editado@usuario.com',
      }
      const user = await updateUser(id, updatedUser)
      console.log('Usuario actualizado:', user)
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      console.log('Usuario eliminado:', id)
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={2}>
        {/* Header */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" fontWeight={600}>Administración de Usuarios</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ width: '100%' }}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o correo"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 260 }}
            />
            <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={handleCreate}>
              Nuevo Usuario
            </Button>
          </Stack>
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12 }}>
          <UsersTable
            rows={data ?? []}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
