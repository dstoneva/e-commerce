import { Typography, Box, CardMedia, Grid, Rating, IconButton, Tooltip, Skeleton } from '@mui/material'
import { DisplayCurrency } from 'components'
import { useState, useCallback } from 'react'
import { useCart, useFavourites } from 'core'
import theme from 'theme'
import { FavoriteBorderOutlined } from '@mui/icons-material'
import Favorite from '@mui/icons-material/Favorite'
import { CartActionsButton } from 'components'

const ProductDetailsCard = ({ product }) => {
  const { getFinalPrice, addToCart, removeFromCart, itemIds, getQuantity } = useCart()
  const { isFavourite, addToFavourites, removeFromFavourites } = useFavourites()

  const [mainImage, setMainImage] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const changeImageHandler = useCallback((event, index) => {
    setMainImage(index)
    setImageLoaded(false) // Reset imageLoaded when thumbnail is changed
  }, [])

  if (!product) return null

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box display="flex" alignItems="center" flexDirection="column">
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              width={300}
              height={300}
              sx={{ mb: 5, borderRadius: 2, position: 'absolute' }}
            />
          )}
          <CardMedia
            component="img"
            alt={product.title}
            src={product.images[mainImage]}
            sx={{
              width: 300,
              height: 300,
              mb: 5,
              borderRadius: 2,
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              position: 'relative',
              objectFit: 'contain',
            }}
            onLoad={() => setImageLoaded(true)}
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
          {product.brand && (
            <Typography variant="subtitle">
              Brand: <b>{product.brand}</b>
            </Typography>
          )}
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="subtitle">Rated:</Typography>
            <Rating value={product.rating} readOnly size="small" />
            <Typography variant="subtitle">(50)</Typography>
          </Box>
          <Typography fontWeight="bold" color="primary" fontSize={25}>
            <DisplayCurrency number={getFinalPrice(product)} />
          </Typography>
          <Typography variant="subtitle2">{product.stock > 0 ? 'Stock available' : 'Out of Stock'}</Typography>
          <Box display="flex" gap={2}>
            <CartActionsButton
              inCart={itemIds.includes(product._id)}
              quantity={getQuantity(product._id)}
              stock={product.stock}
              onAdd={() => addToCart(product)}
              onRemove={() => removeFromCart(product._id)}
              layout="row"
              buttonSize="medium"
              layoutStyle="button-with-text"
            />
            {!isFavourite(product._id) ? (
              <Tooltip title="Add to favourites">
                <IconButton
                  aria-label="add to favourites"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': { backgroundColor: 'primary.light', color: 'crimson' },
                  }}
                  onClick={() => addToFavourites(product)}
                >
                  <FavoriteBorderOutlined size="medium" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Remove from favourites">
                <IconButton
                  color="primary"
                  aria-label="remove from favourites"
                  sx={{
                    backgroundColor: 'primary.light',
                    '&:hover': { backgroundColor: 'primary.light' },
                  }}
                  onClick={() => removeFromFavourites(product._id)}
                >
                  <Favorite size="medium" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Typography sx={{ mt: 2 }}>
            Sold by: <b>Some store</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProductDetailsCard
