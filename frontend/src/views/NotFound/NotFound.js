import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 245,
        my: 5,
      }}
    >
      <Box component="img" src="/images/404.svg" sx={{ width: '40%', maxHeight: '50vh' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 5,
        }}
      >
        <Button variant="outlined" color="primary" onClick={() => navigate('/')} sx={{ width: 116 }}>
          Home
        </Button>
      </Box>
    </Box>
  )
}

export default NotFound
