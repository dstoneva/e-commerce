import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
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

  // Debounced search handler
  const handleSearch = useCallback(
    (query) => {
      if (query.length < 2 && query !== '') {
        return
      }

      const trimmedQuery = query.trim()

      if (location.pathname === '/products/search') {
        navigate(trimmedQuery ? `/products/search?q=${trimmedQuery}` : '/products/search', { replace: true })
      } else if (trimmedQuery) {
        navigate(`/products/search?q=${trimmedQuery}`)
      }

      // Close the drawer after search
      if (onCloseDrawer) onCloseDrawer()
    },
    [navigate, location.pathname, onCloseDrawer]
  )

  const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 700), [handleSearch])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => debouncedHandleSearch.cancel()
  }, [debouncedHandleSearch])

  const onInputChange = (event) => {
    const query = event.target.value
    setSearchTerm(query)
    debouncedHandleSearch(query)
  }

  const clearSearch = () => {
    setSearchTerm('')
    if (location.pathname === '/products/search') {
      navigate('/products/search', { replace: true })
    }
    if (onCloseDrawer) onCloseDrawer()
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
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  )
}

export default LiveSearch
