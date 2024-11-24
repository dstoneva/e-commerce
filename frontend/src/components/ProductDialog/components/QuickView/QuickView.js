import { Grid, Box, Typography, Rating, Divider, Skeleton } from '@mui/material'
import { useState } from 'react'
import DisplayCurrency from 'components/DisplayCurrency'
import Slider from 'react-slick'
import SliderArrow from 'components/SliderArrow'
import { useCart } from 'core'
import { CartActionsButton } from 'components'

const QuickView = ({ product }) => {
  const { getFinalPrice, itemIds, getQuantity, addToCart, removeFromCart } = useCart()
  const [imageLoaded, setImageLoaded] = useState(false)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow right size="small" />,
    prevArrow: <SliderArrow size="small" />,
  }

  const renderImageSlider = () => (
    <Slider {...settings} style={{ paddingTop: 8, paddingBottom: 8 }}>
      {product.images.slice(0, 3).map((image, index) => (
        <Box
          key={index}
          sx={{
            height: { sm: 300, xs: 250 },
            width: '100%',
            mx: 'auto',
            borderRadius: 1,
            position: 'relative',
          }}
        >
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 1,
              }}
            />
          )}
          <Box
            component="img"
            src={image}
            alt={product.title}
            loading="eager"
            onLoad={() => setImageLoaded(true)}
            sx={{
              display: imageLoaded ? 'block' : 'none',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              aspectRatio: '1 / 1',
            }}
          />
        </Box>
      ))}
    </Slider>
  )

  const renderCartControls = () => {
    const isInCart = itemIds.includes(product._id)
    const quantity = getQuantity(product._id)

    return (
      <CartActionsButton
        inCart={isInCart}
        quantity={quantity}
        stock={product.stock}
        onAdd={() => addToCart(product)}
        onRemove={() => removeFromCart(product._id)}
        layout="row"
        buttonSize="medium"
        layoutStyle="button-with-text"
      />
    )
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item md={5} sm={6} xs={12}>
          {renderImageSlider()}
        </Grid>
        <Grid item md={7} sm={6} xs={12}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4" fontWeight="bold">
              {product.title}
            </Typography>
            <Typography variant="subtitle">CATEGORY: {product.category}</Typography>
            {product.brand && (
              <Typography variant="subtitle">
                Brand: <b>{product.brand}</b>
              </Typography>
            )}
            <Typography fontWeight="bold" color="primary" fontSize={25}>
              <DisplayCurrency number={getFinalPrice(product)} />
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="subtitle">(50)</Typography>
            </Box>
            <Typography variant="subtitle" sx={{ color: (theme) => theme.palette.grey[600], my: 2 }}>
              {product.description}
            </Typography>
            <Divider />
            {renderCartControls()}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default QuickView
