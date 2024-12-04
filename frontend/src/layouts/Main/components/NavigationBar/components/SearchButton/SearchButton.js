import { Close } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Box, Drawer, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import LiveSearch from '../LiveSearch'

const SearchButton = () => {
  const [state, setState] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState(open)
  }

  return (
    <div>
      <IconButton sx={{ p: 0 }} onClick={toggleDrawer(true)}>
        <Avatar>
          <SearchIcon />
        </Avatar>
      </IconButton>

      <Drawer
        anchor="top"
        open={state}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        }}
      >
        {/* Header Section */}
        <Box sx={{ p: 2, position: 'relative' }}>
          <Typography variant="subtitle">Search Bazaar</Typography>
          <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>

        {/* Search Section */}
        <Box sx={{ height: '300px', padding: 2, width: 'auto' }}>
          <LiveSearch
            onCloseDrawer={() => setState(false)} // Closes drawer when a search is executed
            autoFocus={state} // Focuses the input field when the drawer opens
          />
        </Box>
      </Drawer>
    </div>
  )
}

export default SearchButton
