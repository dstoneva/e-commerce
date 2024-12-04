import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const SliderArrow = ({ right = false, onClick, size }) => {
  return (
    <IconButton
      aria-label="slider-arrow"
      onClick={onClick}
      color="secondary"
      size={size || 'large'}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        '&:hover': {
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
        },
      }}
      style={right ? { right: -12 } : { left: -12 }}
    >
      {right ? <ArrowForward fontSize="small" /> : <ArrowBack fontSize="small" />}
    </IconButton>
  )
}

export default SliderArrow
