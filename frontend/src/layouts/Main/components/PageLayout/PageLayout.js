import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material'

const PageLayout = ({
  error,
  children,
  data,
  isAsync = true,
  container = false,
  title,
  loading = <CircularProgress />,
  sx = {},
}) => {
  if (error)
    return (
      <Container>
        <Typography>We had an error, please contact the system administrator.</Typography>
      </Container>
    )

  if (!data && !error && isAsync)
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...sx }}>{loading}</Box>

  return container ? (
    <Container sx={{ py: 4, height: '100%', flex: 1 }}>
      {title && (
        <Box mb={2}>
          <Typography variant="h5">{title}</Typography>
          <Divider />
        </Box>
      )}
      {children}
    </Container>
  ) : (
    children
  )
}

export default PageLayout
