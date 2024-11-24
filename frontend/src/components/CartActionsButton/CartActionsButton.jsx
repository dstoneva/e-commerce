import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Typography, Tooltip, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { ConfirmationDialog } from 'components'

const CartActionsButton = ({
  inCart,
  quantity,
  stock,
  onAdd,
  onRemove,
  layout = 'column',
  buttonSize = 'small',
  initialText = 'Add to cart',
  layoutStyle = 'button-with-text',
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleRemoveClick = () => {
    if (quantity === 1) {
      // Open confirmation dialog if this is the last item in the cart
      setOpenDialog(true)
    } else {
      onRemove()
    }
  }

  const handleConfirmRemove = () => {
    setOpenDialog(false)
    onRemove()
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const renderContent = () => {
    switch (layoutStyle) {
      case 'button-with-text':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: layout,
              alignItems: 'center',
              gap: 1,
            }}
          >
            {inCart && stock > 0 ? (
              <>
                <Button
                  color="primary"
                  onClick={handleRemoveClick}
                  variant="outlined"
                  size={buttonSize}
                  sx={{ minWidth: 0, p: '3px' }}
                >
                  <RemoveIcon fontSize={buttonSize} />
                </Button>
                <Typography fontWeight={600} fontSize={buttonSize === 'small' ? 16 : 20} textAlign="center">
                  {quantity}
                </Typography>
                <Button
                  color="primary"
                  onClick={onAdd}
                  variant="outlined"
                  size={buttonSize}
                  sx={{ minWidth: 0, p: '3px' }}
                >
                  <AddIcon fontSize={buttonSize} />
                </Button>
              </>
            ) : (
              <Button
                color="primary"
                onClick={onAdd}
                variant="contained"
                size={buttonSize}
                disabled={stock <= 0}
                sx={{ maxWidth: '8rem' }}
              >
                {stock > 0 ? initialText : 'Out of stock'}
              </Button>
            )}
          </Box>
        )

      case 'icon-buttons':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: layout,
              alignItems: 'center',
            }}
          >
            {inCart ? (
              <>
                <Button
                  color="primary"
                  onClick={handleRemoveClick}
                  variant="outlined"
                  size={buttonSize}
                  sx={{ minWidth: 0, p: '3px' }}
                >
                  <RemoveIcon fontSize={buttonSize} />
                </Button>
                <Typography fontWeight={600} fontSize={buttonSize === 'small' ? 16 : 20} textAlign="center">
                  {quantity}
                </Typography>
              </>
            ) : null}
            {stock > 0 ? (
              <Button
                color="primary"
                onClick={onAdd}
                variant="outlined"
                size={buttonSize}
                sx={{ minWidth: 0, p: '3px' }}
              >
                <AddIcon fontSize={buttonSize} />
              </Button>
            ) : (
              <Tooltip title="Out Of Stock">
                <Button color="primary" variant="outlined" sx={{ minWidth: 0, p: '3px', m: '0 !important' }}>
                  <LocalShippingIcon fontSize="small" />
                </Button>
              </Tooltip>
            )}
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        description="Are you sure you want to remove this item from the cart?"
        confirmText="Remove"
        cancelText="Cancel"
      />
      {renderContent()}
    </>
  )
}

CartActionsButton.propTypes = {
  inCart: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  layout: PropTypes.oneOf(['column', 'row']),
  buttonSize: PropTypes.oneOf(['small', 'medium', 'large']),
  initialText: PropTypes.string,
  layoutStyle: PropTypes.oneOf(['button-with-text', 'icon-buttons']),
}

export default CartActionsButton
