import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { DisplayCurrency } from 'components'
import { useCart } from 'core'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { Close } from '@mui/icons-material'

const CartProduct = ({ product }) => {
  const { addToCart, removeFromCart, getFinalPrice, removeWholeProductFromCart } = useCart()
  const finalPrice = getFinalPrice(product)

  return (
    <Card sx={{ display: 'flex', height: 140, mb: 3, position: 'relative' }}>
      <CardMedia component="img" sx={{ width: 140 }} image={product.thumbnail} alt={product.title} />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" component="div">
          {product.discountPercentage > 0 ? (
            <>
              <Box display="flex" alignItems="center">
                <Box>
                  <DisplayCurrency number={finalPrice} />
                </Box>
                <Box sx={{ textDecoration: 'line-through', ml: 1, color: 'error.main', display: 'inline' }}>
                  <DisplayCurrency number={product.price} />
                </Box>
              </Box>
            </>
          ) : (
            <DisplayCurrency number={finalPrice} />
          )}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => removeFromCart(product._id)}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6">{product.quantity}</Typography>
          <IconButton onClick={() => addToCart(product)} disabled={product.quantity >= product.stock}>
            <AddIcon />
          </IconButton>
        </Box>
        <Typography variant="overline">
          <DisplayCurrency number={finalPrice} /> x {product.quantity} ={' '}
          <DisplayCurrency number={finalPrice * product.quantity} />
        </Typography>
      </CardContent>
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 0, right: 0 }}
        onClick={() => removeWholeProductFromCart(product._id)}
      >
        <Close />
      </IconButton>
    </Card>
  )
}

export default CartProduct
