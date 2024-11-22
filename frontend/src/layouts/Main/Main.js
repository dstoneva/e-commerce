import { useState, useEffect } from 'react'
import { Mail, Phone } from '@mui/icons-material'
import { Box, CircularProgress, Container, Divider, Link, Typography } from '@mui/material'
import { ErrorBoundary } from 'components'
import { Outlet } from 'react-router-dom/dist'
import { Footer, NavigationBar } from './components'

const Main = ({ isSuspense }) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!isSuspense) {
      const timeout = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timeout)
    } else {
      setShowContent(false)
    }
  }, [isSuspense])

  return (
    <ErrorBoundary>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Top Info Bar */}
        <Box
          sx={{
            height: 40,
            bgcolor: 'secondary.main',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
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
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                variant="overline"
                color="background.default"
                onClick={() => (window.location = 'mailto:support@email.com')}
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

        {/* Navigation Bar */}
        <NavigationBar />

        {/* Main Content with Fade Transition */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            transition: 'opacity 0.3s ease',
            opacity: showContent ? 1 : 0,
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />

        {/* Full-page loading spinner overlay */}
        {isSuspense && (
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
              opacity: !showContent ? 1 : 0, 
              pointerEvents: 'none', 
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </ErrorBoundary>
  )
}

export default Main
