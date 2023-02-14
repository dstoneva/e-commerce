import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material'

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

  if (!data && !error && isAsync) return <Container>{loading}</Container>

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
    </>
  ) : (
    children
  )
}

export default PageLayout
