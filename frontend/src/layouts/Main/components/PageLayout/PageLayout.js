import { Box, CircularProgress, Container, Divider, Typography, Stack } from '@mui/material'
import { Footer } from './components'

const PageLayout = ({
  error,
  children,
  data,
  isAsync = true,
  container = false,
  title,
  loading = <CircularProgress />,
  withoutFooter,
}) => {
  if (error)
    return (
      <Container>
        <Typography>We had an error, please contact the system administrator.</Typography>
      </Container>
    )

  if (!data && !error && isAsync)
    return (
      <Stack justifyContent="center" alignItems="center" direction="row" minHeight="100vh">
        {loading}
      </Stack>
    )

  return container ? (
    <>
      <Container sx={{ py: 4 }}>
        {title && (
          <Box mb={2}>
            <Typography variant="h5">{title}</Typography>
            <Divider />
          </Box>
        )}
        {children}
      </Container>
      {!withoutFooter && <Footer />}
    </>
  ) : (
    children
  )
}

export default PageLayout
