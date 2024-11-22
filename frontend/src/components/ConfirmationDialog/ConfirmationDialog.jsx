import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: 6,
          textAlign: 'center',
          position: 'relative',
          padding: 3,
          minWidth: 300,
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'grey.500',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Circular Icon */}
      <Box
        sx={{
          margin: '0 auto',
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: '#FFD9DF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 3,
        }}
      >
        <CloseIcon sx={{ color: '#FF1744', fontSize: 36 }} />
      </Box>

      {/* Title */}
      <DialogTitle
        sx={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'text.primary',
          marginBottom: 1,
        }}
      >
        {title}
      </DialogTitle>

      {/* Description */}
      <DialogContent>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            marginBottom: 3,
            fontSize: 16,
          }}
        >
          {description}
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            textTransform: 'none',
            fontWeight: 'medium',
            color: 'grey.600',
            borderColor: 'grey.400',
            padding: '6px 24px',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          fullWidth
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 'medium',
            backgroundColor: '#FF1744',
            color: 'white',
            padding: '6px 24px',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#D50000',
            },
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
