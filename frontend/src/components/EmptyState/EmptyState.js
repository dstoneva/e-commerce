import { Box, Button, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const EmptyState = ({ image, altText, title, subtitle, primaryAction, secondaryAction }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={3} height={500}>
      {/* Image Section */}
      <Box component="img" src={image} alt={altText} height={180} loading="eager" />

      {/* Message Section */}
      <Typography align="center" variant="h4" fontWeight="bold" color="text.primary">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" align="center" maxWidth={500}>
        {subtitle}
      </Typography>

      {/* Call-to-Action Section */}
      <Box display="flex" gap={2}>
        {primaryAction && (
          <Button
            variant="contained"
            color="primary"
            onClick={primaryAction.onClick}
            sx={{
              paddingX: 4,
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {primaryAction.text}
          </Button>
        )}
        {secondaryAction && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={secondaryAction.onClick}
            sx={{
              paddingX: 4,
              textTransform: 'none',
              fontSize: 16,
            }}
          >
            {secondaryAction.text}
          </Button>
        )}
      </Box>
    </Box>
  )
}

EmptyState.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  primaryAction: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  secondaryAction: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
}

export default EmptyState
