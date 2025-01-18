import { Typography, Box, CardMedia, Grid, Rating, IconButton, Tooltip, Skeleton } from '@mui/material'
import { DisplayCurrency, CartActionsButton } from 'components'
import { useState, useCallback } from 'react'
import { useCart, useFavourites } from 'core'
import theme from 'theme'
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material'

const FALLBACK_IMAGE = '/images/picture-loading-failed.svg'

const ImagePreview = ({ images, currentImageIndex, onImageChange }) => (
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
    {images.slice(0, 3).map((image, index) => (
      <Box
        key={index}
        onClick={() => onImageChange(index)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 2,
          bgcolor: 'background.paper',
          border: `1px solid ${currentImageIndex === index ? theme.palette.primary.main : theme.palette.grey[400]}`,
          '&:hover': { cursor: 'pointer' },
          borderRadius: 2,
          width: 64,
          height: 64,
          minWidth: 64,
        }}
      >
        <Box component="img" src={image} sx={{ maxWidth: '100%' }} />
      </Box>
    ))}
  </Box>
)

const ProductActions = ({
  inCart,
  quantity,
  stock,
  onAddToCart,
  onRemoveFromCart,
  isFavourite,
  onToggleFavourite,
}) => (
  <Box display="flex" gap={2}>
    <CartActionsButton
      inCart={inCart}
      quantity={quantity}
      stock={stock}
      onAdd={onAddToCart}
      onRemove={onRemoveFromCart}
      layout="row"
      buttonSize="medium"
      layoutStyle="button-with-text"
    />
    <Tooltip title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}>
      <IconButton
        color="primary"
        aria-label={isFavourite ? 'remove from favourites' : 'add to favourites'}
        sx={{
          backgroundColor: isFavourite ? 'primary.light' : 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'crimson',
          },
        }}
        onClick={onToggleFavourite}
      >
        {isFavourite ? <Favorite size="medium" /> : <FavoriteBorderOutlined size="medium" />}
      </IconButton>
    </Tooltip>
  </Box>
)

const ProductDetailsCard = ({ product }) => {
  const { getFinalPrice, addToCart, removeFromCart, itemIds, getQuantity } = useCart()
  const { isFavourite, addToFavourites, removeFromFavourites } = useFavourites()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoaded, setImageLoaded] = useState(false)

  const handleImageChange = useCallback(
    (index) => {
      if (index !== currentImageIndex) {
        setCurrentImageIndex(index)

        const img = new Image()
        img.src = product.images[index]
        if (img.complete) {
          setImageLoaded(true)
        } else {
          setImageLoaded(false)
        }
      }
    },
    [currentImageIndex, product.images]
  )

  if (!product) return null

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box display="flex" alignItems="center" flexDirection="column">
          {!isImageLoaded && (
            <Skeleton
              variant="rectangular"
              width={300}
              height={300}
              sx={{ mb: 5, borderRadius: 2, position: 'absolute', zIndex: 2 }}
            />
          )}
          <CardMedia
            component="img"
            alt={product.title}
            src={product.images[currentImageIndex]}
            sx={{
              width: 300,
              height: 300,
              mb: 5,
              borderRadius: 2,
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              position: 'relative',
              objectFit: 'contain',
              visibility: isImageLoaded ? 'visible' : 'hidden',
            }}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = FALLBACK_IMAGE
              e.target.onerror = null
              setImageLoaded(true)
            }}
          />
          <ImagePreview
            images={product.images}
            currentImageIndex={currentImageIndex}
            onImageChange={handleImageChange}
          />
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
          <ProductActions
            inCart={itemIds.includes(product._id)}
            quantity={getQuantity(product._id)}
            stock={product.stock}
            onAddToCart={() => addToCart(product)}
            onRemoveFromCart={() => removeFromCart(product._id)}
            isFavourite={isFavourite(product._id)}
            onToggleFavourite={() =>
              isFavourite(product._id) ? removeFromFavourites(product._id) : addToFavourites(product)
            }
          />
          <Typography sx={{ mt: 2 }}>
            Sold by: <b>Some store</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProductDetailsCard
