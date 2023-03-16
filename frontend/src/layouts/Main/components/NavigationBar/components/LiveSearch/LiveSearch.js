import { useState, useEffect } from 'react'
import { Box, InputAdornment, Stack, TextField, Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import { API_URL } from 'config'
import axios from 'axios'
import { useError } from 'utils/hooks'

const LiveSearch = ({ toggleDrawer, setState }) => {
  const { setError } = useError()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [jsonResults, setJsonResults] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios.get(`${API_URL}/products?page=1&productsPerPage=30`).then((res) => {
        setJsonResults(res?.data?.result)
      })
    } catch (error) {
      setError(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const product = jsonResults.filter(
        (element) => element.title.toLowerCase().trim() === e.target.value.toLowerCase().trim()
      )[0]
      if (product) {
        navigate(`/products/${product?._id}`)
      }
      setOpen(false)
      setInputValue('')
      if (setState && toggleDrawer) {
        setState(false)
        toggleDrawer()(false)
      }
    }
  }

  const handleClick = (id) => {
    navigate(`products/${id}`)
    setOpen(false)
    setInputValue('')
    if (setState && toggleDrawer) {
      setState(false)
      toggleDrawer()(false)
    }
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
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => {
          if (inputValue) {
            setOpen(true)
          }
        }}
        onClose={() => setOpen(false)}
        inputValue={inputValue}
        onInputChange={(e, value) => {
          setInputValue(value)

          if (!value) {
            setOpen(false)
          }
        }}
        disableClearable
        id="free-solo-live-search"
        getOptionLabel={(jsonResults) =>
          jsonResults?.title?.toLowerCase().trim() ? `${jsonResults?.title.toLowerCase().trim()}` : ''
        }
        options={jsonResults}
        isOptionEqualToValue={(option, value) => option?.title === value.title}
        renderOption={(props, jsonResults) => {
          return (
            <Box component="li" {...props} key={jsonResults?._id} onClick={() => handleClick(jsonResults?._id)}>
              {jsonResults?.title}
            </Box>
          )
        }}
        renderInput={(params) => (
          <TextField
            fullWidth
            onKeyPress={onKeyPress}
            placeholder="Searching for..."
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: 10,
                },
              },
            }}
            {...params}
            InputProps={{
              size: 'small',
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Stack>
  )
}

export default LiveSearch
