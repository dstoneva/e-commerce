import { Close, ShoppingBag } from '@mui/icons-material'
import { Avatar, Badge, Box, Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import { DisplayCurrency, ProductCard, ConfirmationDialog } from 'components'
import { useCart } from 'core'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PageURLs } from 'Routes'

const CartButton = () => {
  const { cart, totalPrice, quantity, resetCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const handleEmptyCartClick = (event) => {
    event.stopPropagation()
    setConfirmDialogOpen(true)
  }

  const handleConfirmEmptyCart = () => {
    resetCart()
    setConfirmDialogOpen(false)
  }

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const handleNavigation = (path) => {
    if (path === location.pathname) {
      setIsOpen(false)
      return
    }
    navigate(path)
  }

  return (
    <div>
      <IconButton sx={{ p: 0 }} onClick={toggleDrawer}>
        <Badge badgeContent={quantity} color="primary">
          <Avatar>
            <ShoppingBag />
          </Avatar>
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: { xs: 320, sm: 400 },
          },
        }}
      >
        <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={toggleDrawer}>
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
            onClick={() => handleNavigation(PageURLs.Checkout)}
          >
            Checkout (<DisplayCurrency number={totalPrice} />)
          </Button>
          <Button
            disabled={quantity === 0}
            color="primary"
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
            onClick={() => handleNavigation(PageURLs.Cart)}
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
