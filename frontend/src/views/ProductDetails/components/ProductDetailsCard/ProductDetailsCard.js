import { Typography, Box, CardMedia, Grid, Rating, Button } from '@mui/material'
import { DisplayCurrency } from 'components'
import { useState } from 'react'
import { useCart, useFavourites } from 'core'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import theme from 'theme'

const ProductDetailsCard = ({ product }) => {
  const { getFinalPrice, addToCart, removeFromCart, itemIds, getQuantity } = useCart()
  const { isFavourite, addToFavourites, removeFromFavourites } = useFavourites()

  const [mainImage, setMainImage] = useState(0)
  const changeImageHandler = (event, index) => {
    setMainImage(index)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <CardMedia
            alt={product.title}
            component="img"
            src={product.images[mainImage]}
            sx={{ width: 300, height: 300, mb: 5, borderRadius: 2 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
              mx: 'auto',
            }}
          >
            {product.images.slice(0, 3).map((image, i) => (
              <Box
                key={i}
                onClick={(event) => changeImageHandler(event, i)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                  bgcolor: 'background.paper',
                  border: `1px solid ${mainImage === i ? theme.palette.primary.main : theme.palette.grey[400]}`,
                  '&:hover': {
                    cursor: 'pointer',
                  },
                  borderRadius: 2,
                  width: 64,
                  height: 64,
                  minWidth: 64,
                }}
              >
                <Box display="flex" component="img" src={image} sx={{ maxWidth: '100%' }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center">
          <Typography variant="h4" fontWeight="bold">
            {product.title}
          </Typography>
          <Typography>
            Brand: <b>{product.brand}</b>
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="subtitle">Rated:</Typography>
            <Rating value={product.rating} readOnly size="small" />
            <Typography variant="subtitle">(50)</Typography>
          </Box>
          <Typography fontWeight="bold" color="primary" fontSize={25}>
            <DisplayCurrency number={getFinalPrice(product)} />
          </Typography>
          <Typography variant="subtitle2">{product.stock > 0 ? 'Stock available' : 'Out of Stock'}</Typography>
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
          {!isFavourite(product._id) ? (
            <Button sx={{ width: 180 }} variant="contained" color="primary" onClick={() => addToFavourites(product)}>
              Add to favourites
            </Button>
          ) : (
            <Button
              sx={{ width: 200 }}
              variant="outlined"
              color="primary"
              onClick={() => removeFromFavourites(product._id)}
            >
              Remove from favourites
            </Button>
          )}

          <Typography sx={{ mt: 2 }}>
            Sold by: <b>Some store</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProductDetailsCard
