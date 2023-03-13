import { Grid } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'
import {
  Carousel,
  NewArrivals,
  TopCategories,
  TopRatings,
  FeaturedBrands,
  ProductList,
  Delivery,
  FlashDeals,
  ScrollToTopButton,
} from './components'

const Home = () => {
  return (
    <>
      <Carousel />
      <PageLayout container isAsync={false}>
        <FlashDeals />
        <TopCategories />
        <Grid container spacing={4} sx={{ my: 1 }}>
          <Grid item md={6} xs={12}>
            <TopRatings />
          </Grid>
          <Grid item md={6} xs={12}>
            <FeaturedBrands />
          </Grid>
          <Grid item md={12} xs={12}>
            <NewArrivals />
          </Grid>
          <Grid item md={12} xs={12}>
            <ProductList headline="More for you" productsNum={12} pageNum={2} />
          </Grid>
          <Grid item lg={12} xl={12}>
            <Delivery />
          </Grid>
        </Grid>
        <ScrollToTopButton />
      </PageLayout>
    </>
  )
}

export default Home
