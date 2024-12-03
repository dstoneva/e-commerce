import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DisplayCurrency } from 'components'
import { useCart } from 'core'

const OrderItem = ({ product }) => {
  const { getFinalPrice } = useCart()
  const finalPrice = getFinalPrice(product?.product)
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        my: 1,
        flexWrap: 'wrap',
      }}
    >
      <Box display="flex" alignItems="center" overflow="hidden">
        <Box
          component="img"
          sx={{ height: 90, width: 90, borderRadius: 4, mr: 2 }}
          src={product.product.thumbnail}
          alt={product.product?.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', fontWeight: '500', width: 200 }}>
          <Typography noWrap variant="body">
            {product?.product?.title}
          </Typography>
          <Typography variant="overline">
            <DisplayCurrency number={finalPrice} /> x {product?.quantity}
          </Typography>
        </Box>
      </Box>
      <Button onClick={() => navigate(`/products/${product.product?._id}`)} color="primary">
        Write a Review
      </Button>
    </Box>
  )
}

export default OrderItem
