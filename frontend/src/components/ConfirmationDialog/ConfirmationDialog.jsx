import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Player } from '@lottiefiles/react-lottie-player'

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Remove Item',
  description = 'Are you sure you want to remove this item from the cart?',
  confirmText = 'Remove',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 8,
          boxShadow: 10,
          textAlign: 'center',
          position: 'relative',
          padding: 3,
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          color: 'grey.500',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Lottie Animation */}
      <Box
        sx={{
          margin: '0 auto',
          width: 120,
          height: 120,
          marginBottom: 2,
        }}
      >
        <Player autoplay speed={1} loop src="/images/warning.json" style={{ width: '100%', height: '100%' }} />
      </Box>

      {/* Title */}
      <DialogTitle
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: 'text.primary',
          marginBottom: 1,
        }}
      >
        {title}
      </DialogTitle>

      {/* Description */}
      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            marginBottom: 3,
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Button
          onClick={onClose}
          fullWidth
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 'medium',
            color: 'text.primary',
            borderColor: '#E0E0E0',
            padding: '10px 20px',
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          fullWidth
          color="primary"
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 'medium',
            backgroundColor: 'error.main',
            color: '#FFFFFF',
            padding: '10px 20px',
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
}

export default ConfirmationDialog
