import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { ErrorBoundary } from 'components'
import { Outlet } from 'react-router-dom/dist'
import { Footer, LoadingOverlay, NavigationBar, TopInfoBar } from './components'

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
        <TopInfoBar />

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
        {isSuspense && <LoadingOverlay />}
      </Box>
    </ErrorBoundary>
  )
}

export default Main
