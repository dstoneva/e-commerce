import React, { Fragment, useState } from 'react'
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
  Divider,
  CardActions,
} from '@mui/material'
import { Close, Favorite, FavoriteBorder, RemoveRedEye } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCart, useFavourites } from 'core'
import { DisplayCurrency, ProductDialog, CartActionsButton } from 'components'

const ProductCard = ({ product, inCart = false, inCartDrawer = false, quickView = false }) => {
  const { addToCart, removeFromCart, getFinalPrice, removeWholeProductFromCart, getQuantity, itemIds } = useCart()
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites()
  const navigate = useNavigate()
  const [isDialogOpen, setDialogOpen] = useState(false)

  const finalPrice = getFinalPrice(product)

  // Handlers
  const handleQuickView = () => setDialogOpen(!isDialogOpen)
  const handleAdd = () => addToCart(product)
  const handleRemove = () => removeFromCart(product._id)

  // Shared Logic: Price Display
  const renderPrice = () => (
    <Typography variant={inCartDrawer ? 'overline' : 'body2'}>
      {product.discountPercentage > 0 ? (
        <Box component="span" display="flex" alignItems="center">
          <Box
            component="span"
            sx={{
              ...(quickView && { fontWeight: 600, color: 'primary.main' }),
            }}
          >
            <DisplayCurrency number={finalPrice} />
          </Box>
          <Box
            component="span"
            sx={{
              textDecoration: 'line-through',
              ml: 1,
              color: inCart || inCartDrawer ? 'error.main' : (theme) => theme.palette.grey[600],
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
  )

  // Layout: Drawer Cart View
  if (inCartDrawer) {
    return (
      <Fragment>
        <Card sx={{ p: 2, display: 'flex', height: 100, alignItems: 'center' }} elevation={0}>
          <CardMedia component="img" sx={{ width: 100 }} image={product.thumbnail} alt={product.title} />
          <CardContent sx={{ flex: '1 0 auto', p: 0, pl: 2, pb: '0 !important' }}>
            <Box display="flex" justifyContent="space-between">
              <Box maxWidth="140px">
                <Typography variant="body1" noWrap>
                  {product.title}
                </Typography>
                <Typography variant="overline">{renderPrice()}</Typography>
              </Box>
              <CartActionsButton
                inCart={itemIds.includes(product._id)}
                layoutStyle="compact-icon-buttons"
                stock={product.stock}
                quantity={getQuantity(product._id)}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            </Box>
          </CardContent>
        </Card>
        <Divider />
      </Fragment>
    )
  }

  // Layout: Cart View
  if (inCart) {
    return (
      <Card sx={{ display: 'flex', height: 140, mb: 3, position: 'relative' }}>
        <CardMedia component="img" sx={{ width: 140 }} image={product.thumbnail} alt={product.title} />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="h6">{product.title}</Typography>
          {renderPrice()}
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
  }

  // Layout: Default Product View
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
      {/* Quick View and Favorites */}
      <Box
        id="hidden-menu-fav-eye"
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
      >
        {quickView && (
          <>
            <ProductDialog isDialogOpened={isDialogOpen} productId={product._id} handleCloseDialog={handleQuickView} />
            <IconButton onClick={handleQuickView}>
              <RemoveRedEye sx={{ color: 'rgba(174, 180, 190, 1)' }} />
            </IconButton>
          </>
        )}
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
          <Box mt={1}>{renderPrice()}</Box>
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
    </Card>
  )
}

export default ProductCard
