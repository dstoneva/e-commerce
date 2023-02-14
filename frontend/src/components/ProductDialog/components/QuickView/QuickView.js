import { Grid, Box, Typography, Rating, Divider, Button } from '@mui/material'
import DisplayCurrency from 'components/DisplayCurrency'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Slider from 'react-slick'
import SliderArrow from 'components/SliderArrow'
import { useCart } from 'core'

const QuickView = ({ product }) => {
  const { getFinalPrice, itemIds, getQuantity, addToCart, removeFromCart } = useCart()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow right size="small" />,
    prevArrow: <SliderArrow size="small" />,
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item md={5} sm={6} xs={12}>
          <Slider {...settings} style={{ paddingTop: 8, paddingBottom: 8 }}>
            {product.images.slice(0, 3).map((image, i) => (
              <Box
                key={i}
                alt={product.title}
                component="img"
                src={image}
                sx={{
                  height: { sm: 300, xs: 250 },
                  width: '100%',
                  mx: 'auto',
                  borderRadius: 1,
                }}
              />
            ))}
          </Slider>
        </Grid>
        <Grid item md={7} sm={6} xs={12}>
          <Box display="flex" gap={1} flexDirection="column">
            <Typography variant="h4" fontWeight="bold">
              {product.title}
            </Typography>
            <Typography variant="subtitle">CATEGORY: {product.category}</Typography>
            <Typography variant="subtitle">
              Brand: <b>{product.brand}</b>
            </Typography>
            <Typography fontWeight="bold" color="primary" fontSize={25}>
              <DisplayCurrency number={getFinalPrice(product)} />
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="subtitle">(50)</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle" color={(theme) => theme.palette.grey[600]}>
                {product.description}
              </Typography>
            </Box>
            <Divider sx={{ mb: 1.5 }} />
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
