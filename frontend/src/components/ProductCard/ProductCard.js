import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Tooltip,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material'
import { useCart, useFavourites } from 'core'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { DEFAULT_LOCALIZATION } from 'config'
import { FavoriteBorder, RemoveRedEye } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ProductDialog, DisplayCurrency } from 'components'
import { CartActionsButton } from 'components'

const ProductCard = ({ product, center = false, quickView }) => {
  const { addToCart, itemIds, removeFromCart, getQuantity } = useCart()
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Card
      sx={{
        margin: 1,
        position: 'relative',
        '&:hover #hidden-menu-fav-eye': {
          opacity: 1,
          transition: 'opacity 0.25s',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 10,
          right: 10,
          opacity: 0,
          transition: 'opacity 0.25s',
          gap: 1,
        }}
        id="hidden-menu-fav-eye"
      >
        {quickView && (
          <>
            <ProductDialog isDialogOpened={isOpen} product={product} handleCloseDialog={() => setIsOpen(false)} />
            <IconButton
              aria-label="quick-view"
              onClick={() => handleOpen()}
              sx={{
                backgroundColor: 'rgba(75, 86, 107, 0.04)',
                '&:hover': { backgroundColor: 'rgba(75, 86, 107, 0.07)' },
              }}
            >
              <RemoveRedEye fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.5)' }} />
            </IconButton>
          </>
        )}
        {!isFavourite(product._id) ? (
          <IconButton
            aria-label="add-to-favourites"
            onClick={() => addToFavourites(product)}
            sx={{
              backgroundColor: 'rgba(75, 86, 107, 0.04)',
              '&:hover': { backgroundColor: 'rgba(75, 86, 107, 0.07)' },
            }}
          >
            <FavoriteBorder fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.5)' }} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="remove-from-favourites"
            onClick={() => removeFromFavourites(product._id)}
            sx={{
              backgroundColor: 'rgba(75, 86, 107, 0.04)',
              '&:hover': { backgroundColor: 'rgba(75, 86, 107, 0.07)' },
            }}
          >
            <FavoriteIcon fontSize="small" sx={{ color: 'crimson' }} />
          </IconButton>
        )}
      </Box>
      {!!product.discountPercentage && (
        <Chip
          color="primary"
          size="small"
          sx={{ px: 0.5, position: 'absolute', top: 10, left: 10, fontWeight: 600 }}
          label={`${new Intl.NumberFormat(DEFAULT_LOCALIZATION, { style: 'percent' }).format(
            product.discountPercentage / 100
          )} off`}
        />
      )}
      <CardMedia
        sx={{ cursor: 'pointer', backgroundColor: 'white', objectFit: 'contain', overflowClipMargin: 'unset' }}
        loading="lazy"
        component="img"
        height={300}
        image={product.thumbnail}
        alt={product.title}
        onClick={() => navigate(`/products/${product._id}`)}
      />
      <Box display="flex" p={2}>
        <CardContent sx={{ width: '100%', p: 0 }}>
          <Tooltip title={product.title} placement="bottom-start">
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              noWrap
              sx={{ fontSize: '14px !important', fontWeight: 600, mb: 1, maxWidth: '12rem' }}
            >
              {product.title}
            </Typography>
          </Tooltip>
          <Rating name="read-only" value={product.rating} readOnly size="medium" sx={{ fontSize: '1.25rem' }} />
          <Typography variant="body2" component="div" color="primary" sx={{ fontWeight: 600, mt: 1 }}>
            {product.discountPercentage > 0 ? (
              <>
                <Box display="flex" alignItems="center">
                  <Box>
                    <DisplayCurrency number={product.price - (product.price / 100) * product.discountPercentage} />
                  </Box>
                  <Box sx={{ textDecoration: 'line-through', ml: 1, color: (theme) => theme.palette.grey[600] }}>
                    <DisplayCurrency number={product.price} />
                  </Box>
                </Box>
              </>
            ) : (
              <DisplayCurrency number={product.price} />
            )}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ width: 30, p: 0, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}
        >
          <CartActionsButton
            inCart={itemIds.includes(product._id)}
            quantity={getQuantity(product._id)}
            stock={product.stock}
            onAdd={() => addToCart(product)}
            onRemove={() => removeFromCart(product._id)}
            layout="column"
            buttonSize="small"
            layoutStyle="icon-buttons"
          />
        </CardActions>
      </Box>
    </Card>
  )
}

export default ProductCard
