import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useAuth } from 'core'
import { Link } from 'react-router-dom'
import { CartButton, LiveSearch } from './components'

const NavigationBar = () => {
  const { user, logout } = useAuth()
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.paper',
        pb: 1,
      }}
      elevation={0}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 80, width: '100%' }}
          >
            <Link to="/" style={{ maxHeight: 50 }}>
              <Box component="img" src="/images/logo2.svg" alt="logo" sx={{ maxHeight: 50 }} />
            </Link>
            <LiveSearch />
            <Box display="flex" alignItems="center">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }}>
                  <Avatar alt={user?.name}>{user?.name[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
              <CartButton />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavigationBar
