import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { DisplayCurrency, CartActionsButton } from 'components'
import PriceDisplay from './PriceDisplay'

const CartView = ({
  product,
  finalPrice,
  getQuantity,
  handleAdd,
  handleRemove,
  removeWholeProductFromCart,
  itemIds,
}) => (
  <Card sx={{ display: 'flex', height: 140, mb: 3, position: 'relative' }}>
    <CardMedia component="img" sx={{ width: 140 }} image={product.thumbnail} alt={product.title} />
    <CardContent sx={{ flex: '1 0 auto' }}>
      <Typography variant="h6">{product.title}</Typography>
      <PriceDisplay product={product} finalPrice={finalPrice} />
      <CartActionsButton
        inCart={itemIds.includes(product._id)}
        layoutStyle="compact-icon-buttons"
        stock={product.stock}
        quantity={getQuantity(product._id)}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
      <Typography sx={{ mb: 3 }} variant="overline">
        <DisplayCurrency number={finalPrice} /> x {getQuantity(product._id)} ={' '}
        <DisplayCurrency number={finalPrice * getQuantity(product._id)} />
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

export default CartView
