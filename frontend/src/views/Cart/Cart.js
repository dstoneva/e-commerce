import { Grid, useMediaQuery } from '@mui/material'
import { useCart } from 'core'
import { PageLayout } from 'layouts/Main/components'
import { CartProduct } from './components'
import { ProductCard, Subtotal, SideMenu } from 'components'
import { useLocation } from 'react-router-dom'

const Cart = () => {
  const location = useLocation()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const { cart } = useCart()
  return (
    <PageLayout container isAsync={false}>
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
    </PageLayout>
  )
}

export default Cart
