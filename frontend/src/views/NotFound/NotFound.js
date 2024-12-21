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
        minHeight: '100dvh',
        p: 5,
      }}
    >
      <Box
        component="img"
        src="https://template.getbazaar.io/_next/static/media/404.ee3d5ebc.svg"
        sx={{ maxWidth: 320 }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 5,
          gap: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ width: 116 }}>
          Go Back
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/')} sx={{ width: 116 }}>
          Home
        </Button>
      </Box>
    </Box>
  )
}

export default NotFound
