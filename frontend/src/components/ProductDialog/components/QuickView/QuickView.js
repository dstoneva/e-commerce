import { Grid, Box, Typography, Rating, CardMedia, Divider, Button } from '@mui/material'
import DisplayCurrency from 'components/DisplayCurrency'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useCart } from 'core'

const QuickView = ({ product }) => {
  const { getFinalPrice, itemIds, getQuantity, addToCart, removeFromCart } = useCart()
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <CardMedia
            component="img"
            src={product.thumbnail}
            sx={{
              height: { sm: 320, xs: 250 },
              mx: 'auto',
              width: { sm: 320, xs: 250 },
              maxWidth: '100%',
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Box display="flex" gap={1} flexDirection="column">
            <Typography variant="h4" fontWeight="bold">
              {product.title}
            </Typography>
            <Typography variant="subtitle">CATEGORY: {product.category}</Typography>
            <Typography fontWeight="bold" color="primary" fontSize={25}>
              <DisplayCurrency number={getFinalPrice(product)} />
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="subtitle">(50)</Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="subtitle" color={(theme) => theme.palette.grey[600]}>
                {product.description}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" gap={3}>
              {itemIds.includes(product._id) ? (
                <>
                  <Button
                    color="primary"
                    onClick={() => removeFromCart(product._id)}
                    variant="outlined"
                    sx={{ minWidth: 0, p: '3px' }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography textAlign="center" fontWeight={600} fontSize={20}>
                      {getQuantity(product._id)}
                    </Typography>
                  </Box>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ minWidth: 0, p: '3px' }}
                    onClick={() => addToCart(product)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </>
              ) : (
                <Button
                  disabled={product.stock === 0 ? true : false}
                  onClick={() => addToCart(product)}
                  variant="contained"
                  color="primary"
                >
                  {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default QuickView