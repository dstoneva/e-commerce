import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

/**
 * ResourceView
 * A simple component to handle loading, error, and data states.
 * 
 * @param {boolean} isLoading - Flag to show loading state.
 * @param {boolean} isError - Flag to show error state.
 * @param {string} errorMessage - Message to display on error state.
 * @param {ReactNode} loadingComponent - Custom loading component, defaults to Skeleton.
 * @param {ReactNode} errorComponent - Custom error component, defaults to an error message.
 * @param {ReactNode} children - Content to render when data is loaded.
 * @param {object} sx - Custom styles for the wrapper Box.
 */
const ResourceView = ({
  isLoading,
  isError,
  errorMessage = 'Something went wrong.',
  loadingComponent,
  errorComponent,
  children,
  container = false,  
  sx = {},
}) => {
  if (isLoading) {
    return loadingComponent || (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, ...sx }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return errorComponent || (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, ...sx }}>
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      </Box>
    )
  }

  return <Box sx={sx}>{children}</Box>
}

export default ResourceView
