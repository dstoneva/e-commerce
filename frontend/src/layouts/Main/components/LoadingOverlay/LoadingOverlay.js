import { Box, CircularProgress } from '@mui/material'

const LoadingOverlay = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      transition: 'opacity 0.3s ease',
    }}
  >
    <CircularProgress />
  </Box>
)

export default LoadingOverlay
