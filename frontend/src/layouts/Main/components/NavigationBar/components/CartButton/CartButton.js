import { Close, ShoppingBag } from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material'
import { DisplayCurrency } from 'components'
import { useCart } from 'core'
import { Fragment, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { PageURLs } from 'Routes'

const CartButton = () => {
  const { cart, removeFromCart, addToCart, getFinalPrice, totalPrice, quantity, resetCart } = useCart()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  // Separate functions for opening and closing the drawer
  const openDrawer = () => setIsOpen(true)
  const closeDrawer = (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
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
        onClick={(event) => event.stopPropagation()}
        PaperProps={{
          sx: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        }}
      >
        <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={closeDrawer}>
          <Close />
        </IconButton>
        <Box>
          <Box display="flex" alignItems="center" p={2}>
            <ShoppingBag color="secondary" />{' '}
            <Typography variant="body1" color="secondary" sx={{ ml: 1 }}>
              {quantity} {quantity < 2 ? ' item' : ' items'}
            </Typography>
          </Box>
          <Divider />
          {cart.map((product) => {
            const finalPrice = getFinalPrice(product)
            return (
              <Fragment key={product._id}>
                <Card sx={{ p: 2, display: 'flex', height: 100, alignItems: 'center' }} elevation={0}>
                  <CardMedia component="img" sx={{ width: 100 }} image={product.thumbnail} alt={product.title} />
                  <CardContent sx={{ flex: '1 0 auto', p: 0, pl: 2, pb: '0 !important' }}>
                    <Box display="flex" justifyContent="space-between">
                      <Box maxWidth="140px">
                        <Typography variant="body1" noWrap>
                          {product.title}
                        </Typography>
                        <Typography variant="overline" component="div">
                          {product.discountPercentage > 0 ? (
                            <Box display="flex" alignItems="center">
                              <Box>
                                <DisplayCurrency number={finalPrice} />
                              </Box>
                              <Box
                                sx={{
                                  textDecoration: 'line-through',
                                  ml: 1,
                                  color: 'error.main',
                                  display: 'inline',
                                }}
                              >
                                <DisplayCurrency number={product.price} />
                              </Box>
                            </Box>
                          ) : (
                            <DisplayCurrency number={finalPrice} />
                          )}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => removeFromCart(product._id)} size="small">
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1">{product.quantity}</Typography>
                        <IconButton
                          onClick={() => addToCart(product)}
                          disabled={product.quantity >= product.stock}
                          size="small"
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                <Divider />
              </Fragment>
            )
          })}
        </Box>
        <Box p={2}>
          <Button
            disabled={quantity === 0}
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mb: 1 }}
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              setTimeout(() => navigate(PageURLs.Checkout), 200) // Navigate after drawer is fully closed
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
              setTimeout(() => navigate(PageURLs.Cart), 200) // Navigate after drawer is fully closed
            }}
          >
            View cart
          </Button>
          <Button
            disabled={quantity < 1}
            color="secondary"
            variant="outlined"
            fullWidth
            onClick={(event) => {
              event.stopPropagation()
              resetCart()
              setIsOpen(false)
            }}
          >
            Empty cart
          </Button>
        </Box>
      </Drawer>
    </div>
  )
}

export default CartButton
