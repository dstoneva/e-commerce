import { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ScrollToTopButton = () => {
  const [scrollPosition, setSrollPosition] = useState(0)
  const [visible, setVisible] = useState(false)

  const handleVisibleButton = () => {
    const position = window.pageYOffset
    setSrollPosition(position)

    if (scrollPosition > 50) {
      return setVisible(true)
    } else if (scrollPosition < 50) {
      return setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)
  })

  return (
    <IconButton
      href="#"
      aria-label="Scroll To Top"
      size="medium"
      sx={{
        visibility: visible ? 'visible' : 'hidden',
        display: {xs: 'none', sm: 'flex'},
        position: 'fixed',
        bottom: '50px',
        right: '50px',
        zIndex: 99,
        bgcolor: 'primary.main',
        '&:hover': { bgcolor: 'primary.main' },
        boxShadow:
          '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
      }}
    >
      <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
    </IconButton>
  )
}

export default ScrollToTopButton
