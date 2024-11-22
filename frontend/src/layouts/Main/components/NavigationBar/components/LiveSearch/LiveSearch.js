import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Stack, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate, useLocation } from 'react-router-dom'
import debounce from 'lodash.debounce'

const LiveSearch = ({ onCloseDrawer, autoFocus }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef()

  // Focus the input field when the drawer is opened
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleSearch = useCallback(
    debounce((query) => {

      if (query.length < 2 && query !== '') {
        return
      }

      const trimmedQuery = query.trim()

      if (location.pathname === '/products/search') {
        navigate(trimmedQuery ? `/products/search?q=${trimmedQuery}` : '/products/search', { replace: true })
      } else if (trimmedQuery) {
        navigate(`/products/search?q=${trimmedQuery}`)
      }

      // Close drawer after search
      if (onCloseDrawer) onCloseDrawer()
    }, 700),
    [navigate, location.pathname, onCloseDrawer]
  )

  const onInputChange = (event) => {
    const query = event.target.value
    setSearchTerm(query)
    handleSearch(query)
  }

  return (
    <Stack
      spacing={2}
      sx={{
        flex: '1 1 0',
        maxWidth: '670px',
        mx: 'auto',
      }}
    >
      <TextField
        fullWidth
        value={searchTerm}
        onChange={onInputChange}
        placeholder="Search for products..."
        inputRef={inputRef}
        sx={{
          '& .MuiOutlinedInput-root fieldset': {
            borderRadius: 10,
          },
        }}
        InputProps={{
          size: 'small',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  )
}

export default LiveSearch
