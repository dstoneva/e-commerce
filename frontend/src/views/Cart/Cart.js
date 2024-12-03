import { Grid, useMediaQuery, Skeleton, Container } from '@mui/material'
import { useCart } from 'core'
import { ProductCard, Subtotal, SideMenu, EmptyState } from 'components'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageURLs } from 'Routes'

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
        <EmptyState
          image="/images/cart.webp"
          altText="Empty Cart"
          title="Your cart is currently empty!"
          subtitle="Looks like you have not made your choice yet. Browse our awesome store and find what you love!"
          primaryAction={{
            text: 'Start Shopping',
            onClick: () => navigate('/'),
          }}
          secondaryAction={{
            text: 'Discover Favourites',
            onClick: () => navigate(PageURLs.Favourites),
          }}
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            {cart.map((product) =>
              !isMobile ? (
                <ProductCard key={product._id} product={product} inCart />
              ) : (
                <ProductCard key={product._id} product={product} quickView />
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
