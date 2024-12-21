import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Rating,
  CardActions,
} from '@mui/material'
import { Favorite, FavoriteBorder, RemoveRedEye } from '@mui/icons-material'

import { ProductDialog, CartActionsButton } from 'components'
import PriceDisplay from './PriceDisplay'

const DefaultProductView = ({
  product,
  finalPrice,
  quickView,
  isDialogOpen,
  handleQuickView,
  addToFavourites,
  removeFromFavourites,
  isFavourite,
  navigate,
  handleAdd,
  handleRemove,
  getQuantity,
  itemIds,
}) => (
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
    {/* Quick View and Favorites */}
    <Box
      id="hidden-menu-fav-eye"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 10,
        right: 10,
        opacity: 0, // Initially hidden
        transition: 'opacity 0.25s',
        gap: 1,
      }}
    >
      {/* Quick View Button */}
      <IconButton onClick={handleQuickView}>
        <RemoveRedEye sx={{ color: 'rgba(174, 180, 190, 1)' }} />
      </IconButton>

      {/* Favorite Button */}
      {!isFavourite(product._id) ? (
        <IconButton onClick={() => addToFavourites(product)}>
          <FavoriteBorder sx={{ color: 'rgba(174, 180, 190, 1)' }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => removeFromFavourites(product._id)}>
          <Favorite sx={{ color: 'crimson' }} />
        </IconButton>
      )}
    </Box>

    {/* Discount Badge */}
    {!!product.discountPercentage && (
      <Chip
        label={`${product.discountPercentage.toFixed(0)}% off`}
        color="primary"
        size="small"
        sx={{ px: 0.5, position: 'absolute', top: 10, left: 10, fontWeight: 600 }}
      />
    )}

    {/* Product Image */}
    <CardMedia
      component="img"
      height={300}
      image={product.thumbnail}
      alt={product.title}
      sx={{ cursor: 'pointer', backgroundColor: 'white', objectFit: 'contain' }}
      onClick={() => navigate(`/products/${product._id}`)}
    />

    {/* Product Details */}
    <Box display="flex" p={2}>
      <CardContent sx={{ width: '100%', p: 0 }}>
        <Tooltip title={product.title}>
          <Typography
            variant="h3"
            component="div"
            noWrap
            sx={{
              fontSize: '14px !important',
              fontWeight: 600,
              mb: 1,
              maxWidth: { xs: '9rem', sm: '12rem', xl: '13rem' },
            }}
          >
            {product.title}
          </Typography>
        </Tooltip>
        <Rating value={product.rating} readOnly size="medium" sx={{ fontSize: '1.25rem' }} />
        <Box mt={1}>
          <PriceDisplay quickView={quickView} product={product} finalPrice={finalPrice} />
        </Box>
      </CardContent>
      <CardActions
        sx={{
          width: 30,
          p: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <CartActionsButton
          inCart={itemIds.includes(product._id)}
          quantity={getQuantity(product._id)}
          stock={product.stock}
          onAdd={handleAdd}
          onRemove={handleRemove}
          buttonSize="small"
          layoutStyle="icon-buttons"
        />
      </CardActions>
    </Box>

    {/* Quick View Dialog */}
    {isDialogOpen && (
      <ProductDialog
        isDialogOpened={isDialogOpen}
        thumbnail={product.thumbnail}
        productId={product._id}
        handleCloseDialog={handleQuickView}
      />
    )}
  </Card>
)

export default DefaultProductView
