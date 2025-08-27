import { useState } from 'react'
import { Box, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ProSidebarNav, { type NavItem } from '@/components/SideBar/ProSidebarNav'
import { Outlet } from 'react-router-dom'

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', to: '/', icon: <HomeIcon /> },
  { label: 'Usuarios', to: '/users', icon: <GroupIcon /> },
  { label: 'Perfiles', to: '/profiles', icon: <ManageAccountsIcon /> },
]

export default function AppLayout() {
  const [toggled, setToggled] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      {/* Sidebar: en md+ se vuelve “docked”; en sm- usa toggled + backdrop */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProSidebarNav items={NAV_ITEMS} />
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <ProSidebarNav
          items={NAV_ITEMS}
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          breakPoint="all"
        />
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        {/* Trigger solo visible en móvil */}
        <Toolbar sx={{ display: { md: 'none' }, px: 0 }}>
          <IconButton aria-label="Abrir menú" onClick={() => setToggled(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Outlet />
      </Box>
    </Box>
  )
}
