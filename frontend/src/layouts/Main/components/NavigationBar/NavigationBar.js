import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from 'core'
import { Link } from 'react-router-dom'
import { CartButton, FavouritesButton, LiveSearch } from './components'
import SearchButton from './components/SearchButton/SearchButton'

const NavigationBar = () => {
  const { user, logout } = useAuth()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))

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
        height: 80,
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
              <Box
                component="img"
                src={isMobile ? '/images/bazaar-black-sm.svg' : '/images/logo2.svg'}
                alt="logo"
                sx={{ maxHeight: 50 }}
              />
            </Link>
            {!isMobile && <LiveSearch />}
            <Box display="flex" alignItems="center">
              {isMobile && <SearchButton />}
              <FavouritesButton />
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 1 }}>
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
