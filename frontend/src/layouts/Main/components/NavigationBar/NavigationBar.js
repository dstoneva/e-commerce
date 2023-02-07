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
import { CartButton } from './components'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ButtonBase } from '@mui/material'

const NavigationBar = () => {
  const { user, logout } = useAuth()
  const [anchorElUser, setAnchorElUser] = useState(null)

  const [anchorElSearch, setAnchorElSearch] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenSearchMenu = (event) => {
    setAnchorElSearch(event.currentTarget)
  }

  const handleCloseSearchMenu = () => {
    setAnchorElSearch(null)
  }

  const styles = {
    searchBox: {
      border: '1px solid #C2C2C2',
      '&:hover': {
        borderColor: '#d23f57',
      },
      '&:focus-within': { border: '2px solid #d23f57', borderTop: '1px solid #d23f57' },
      borderRadius: 300,
      maxWidth: 670,
      width: '100%',
      height: 45,
      display: { xs: 'none', md: 'flex' },
    },

    searchBar: {
      maxWidth: 480,
      width: '100%',
      fontSize: '0.875rem',
    },
    buttonBase: {
      borderLeft: '1px solid #DAE1E7',
      height: '100%',
      maxWidth: 260,
      width: 160,
      borderRadius: '0 30px 30px 0',
      bgcolor: '#F6F9FC',
    },
    typography: { color: '#4B566B', textAlign: 'center', fontSize: '0.875rem' },
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
            <Box sx={styles.searchBox}>
              <IconButton disabled={true}>
                <SearchIcon />
              </IconButton>
              <InputBase component="input" placeholder={'Searching for...'} sx={styles.searchBar} />
              <Box>
                <ButtonBase sx={styles.buttonBase} onClick={handleOpenSearchMenu}>
                  <Typography sx={styles.typography}>All Categories</Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#4B566B' }} />
                </ButtonBase>
                <Menu
                  id="search-appbar"
                  anchorEl={anchorElSearch}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElSearch)}
                  onClose={handleCloseSearchMenu}
                >
                  <MenuItem>
                    <Typography>All categories</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography>Cars</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography>Clothes</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography>Electronics</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
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
