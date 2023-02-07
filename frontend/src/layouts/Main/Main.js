import { Mail, Phone } from '@mui/icons-material'
import { Box, CircularProgress, Container, Divider, Link, Typography } from '@mui/material'
import { ErrorBoundary } from 'components'
import { Outlet } from 'react-router-dom/dist'
import { Footer, NavigationBar } from './components'

const Main = ({ isSuspense }) => {
  return (
    <ErrorBoundary>
      <Box sx={{ height: 40, bgcolor: 'secondary.main', display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box display="flex">
            <Typography
              component="div"
              sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
              variant="overline"
              color="background.default"
            >
              <Phone sx={{ mr: 1 }} fontSize="small" />
              +88012 3456 7894
            </Typography>
            <Typography
              component="div"
              sx={{ display: 'flex', alignItems: 'center' }}
              variant="overline"
              color="background.default"
            >
              <Mail sx={{ mr: 1 }} fontSize="small" />
              support@email.com
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="overline"
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              component="div"
            >
              <Link href="#" color="background.default">
                Privacy Policy
              </Link>
              <Divider
                flexItem
                variant="middle"
                orientation="vertical"
                sx={{ mx: 1.5, borderColor: 'background.default' }}
              />
              <Link href="#" color="background.default">
                Terms and conditions
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
      <NavigationBar />
      {isSuspense ? <CircularProgress /> : <Outlet />}
      <Footer/>
    </ErrorBoundary>

  )
}

export default Main
