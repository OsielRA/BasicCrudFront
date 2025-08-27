import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, type MenuItemStyles } from 'react-pro-sidebar'
import { alpha, useTheme } from '@mui/material/styles'
import { useLocation, matchPath, Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export type NavItem = {
  label: string
  to?: string
  icon?: ReactNode
  children?: NavItem[]
}

type Props = {
  items: NavItem[]
  width?: string
  collapsed?: boolean
  toggled?: boolean
  breakPoint?: 'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|'all'
  onBackdropClick?: () => void
}

export default function ProSidebarNav({
  items,
  width = '270px',
  collapsed,
  toggled,
  breakPoint = 'md',
  onBackdropClick,
}: Props) {
  const theme = useTheme()
  const { pathname } = useLocation()

  const isActive = (to?: string) =>
    !!to && !!matchPath({ path: to, end: to === '/' }, pathname)

  const menuItemStyles: MenuItemStyles = {
    button: ({ level, active }) => {
      if (level === 0) {
        return {
          color: theme.palette.text.primary,
          backgroundColor: active ? alpha(theme.palette.primary.main, 0.12) : undefined,
          '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) },
        }
      }
      return undefined
    },
    icon: { color: theme.palette.text.secondary },
  }

  const renderItems = (arr: NavItem[]) =>
    arr.map((it) =>
      it.children?.length ? (
        <SubMenu key={it.label} label={it.label} icon={it.icon}>
          {renderItems(it.children)}
        </SubMenu>
      ) : (
        <MenuItem
          key={it.label}
          icon={it.icon}
          active={isActive(it.to)}
          component={it.to ? <Link to={it.to} /> : undefined}
        >
          {it.label}
        </MenuItem>
      )
    )

  return (
    <Sidebar
  
      width={width}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint={breakPoint}
      onBackdropClick={onBackdropClick}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          height: '100vh',
        },
      }}
    >
      <Menu menuItemStyles={menuItemStyles}>{renderItems(items)}</Menu>
    </Sidebar>
  )
}
