import { Close, ShoppingBag } from '@mui/icons-material'
import { Avatar, Badge, Box, Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import { DisplayCurrency, ProductCard, ConfirmationDialog } from 'components'
import { useCart } from 'core'
import { Fragment, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageURLs } from 'Routes'

const CartButton = () => {
  const { cart, totalPrice, quantity, resetCart } = useCart()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const openDrawer = useCallback(() => setIsOpen(true), [])
  const closeDrawer = useCallback((event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
    setIsOpen(false)
  }, [])

  const handleEmptyCartClick = (event) => {
    event.stopPropagation()
    setConfirmDialogOpen(true)
  }

  const handleConfirmEmptyCart = () => {
    resetCart()
    setConfirmDialogOpen(false)
    setIsOpen(false)
  }

  return (
    <div>
      <IconButton sx={{ p: 0 }} onClick={openDrawer}>
        <Badge badgeContent={quantity} color="primary">
          <Avatar>
            <ShoppingBag />
          </Avatar>
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: { xs: 320, sm: 400 },
          },
        }}
      >
        <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={closeDrawer}>
          <Close />
        </IconButton>
        <Box display="flex" alignItems="center" height={60} p={2}>
          <ShoppingBag color="secondary" />
          <Typography variant="body1" color="secondary" sx={{ ml: 1 }}>
            {quantity} {quantity === 1 ? 'item' : 'items'}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            overflowY: 'auto',
            height: `calc(100% - 60px - 155px)`,
          }}
        >
          {cart.map((product) => (
            <Fragment key={product._id}>
              <ProductCard product={product} inCartDrawer />
            </Fragment>
          ))}
        </Box>
        <Box height={155} p={2}>
          <Button
            disabled={quantity === 0}
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mb: 1 }}
            onClick={(event) => {
              setIsOpen(false)
              setTimeout(() => navigate(PageURLs.Checkout), 200)
            }}
          >
            Checkout (<DisplayCurrency number={totalPrice} />)
          </Button>
          <Button
            disabled={quantity === 0}
            color="primary"
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              setTimeout(() => navigate(PageURLs.Cart), 200)
            }}
          >
            View cart
          </Button>
          <Button disabled={quantity < 1} color="secondary" variant="outlined" fullWidth onClick={handleEmptyCartClick}>
            Empty cart
          </Button>
        </Box>
      </Drawer>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmEmptyCart}
        title="Empty Cart"
        description="Are you sure you want to empty your cart? This action cannot be undone."
        confirmText="Empty Cart"
        cancelText="Cancel"
      />
    </div>
  )
}

export default CartButton
