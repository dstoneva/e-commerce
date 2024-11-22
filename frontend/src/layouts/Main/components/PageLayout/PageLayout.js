import { Box, CircularProgress, Container, Divider, Typography, Stack } from '@mui/material'

const PageLayout = ({
  error,
  children,
  data,
  isAsync = true,
  container = false,
  title,
  loading = <CircularProgress />,
}) => {
  if (error)
    return (
      <Container>
        <Typography>We had an error, please contact the system administrator.</Typography>
      </Container>
    )

  // if (!data && !error && isAsync)
  //   return (
  //     <Stack justifyContent="center" alignItems="center" direction="row" minHeight="100vh">
  //       {loading}
  //     </Stack>
  //   )

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
