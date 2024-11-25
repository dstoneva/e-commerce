import { Grid, useMediaQuery, Typography, Box, Link, Skeleton, Container } from '@mui/material'
import { useCart } from 'core'
import { CartProduct } from './components'
import { ProductCard, Subtotal, SideMenu } from 'components'
import { useLocation } from 'react-router-dom'

const Cart = () => {
  const location = useLocation()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const { cart, isCartLoading } = useCart()

  return (
    <Container sx={{ py: 4 }}>
      {isCartLoading ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            {Array.from(new Array(3)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={isMobile ? 250 : 120}
                sx={{ borderRadius: 2, mb: 2 }}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
          </Grid>
        </Grid>
      ) : cart.length < 1 ? (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={2} height={450}>
          <Box component="img" loading="lazy" src="/images/cart.webp" alt="Cart" height={200} />
          <Typography align="center" variant="h4">
            Your cart is currently empty!
          </Typography>
          <Typography variant="subtitle1" color="gray" align="center">
            Looks like you have not made your choice yet. Browse our awesome store,
            <Link href="/">start shopping now</Link>!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            {cart.map((product) =>
              !isMobile ? (
                <CartProduct key={product._id} product={product} />
              ) : (
                <ProductCard key={product._id} product={product} />
              )
            )}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            {location.pathname === '/cart' ? <SideMenu /> : <Subtotal />}
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default Cart
