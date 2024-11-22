import { Container, Grid } from '@mui/material'
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
  BannerSlide,
} from './components'

const bannerSlides = [
  <BannerSlide
    title="50% Off For Your First Shopping"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis."
    buttonText="Shop Now"
    imageUrl="https://bazaar.ui-lib.com/assets/images/products/nike-black.png"
    altText="Nike black"
    onButtonClick={() => console.log('Navigating to shop now')}
    imageProps={{
      sx: {
        height: { xs: 320, sm: 'auto' },
        maxHeight: { xs: 320, sm: 350, md: 375, lg: 400 },
        width: { xs: '100%' },
        objectFit: 'contain',
      },
    }}
  />,
  <BannerSlide
    title="Exclusive Winter Sale - Up to 70% Off!"
    description="Explore our exclusive deals and discounts for the summer season. Don’t miss out on great prices!"
    imageUrl="/images/winter-sale.webp"
    altText="Winter Sale"
    imageProps={{
      sx: {
        height: { xs: 320, sm: 'auto' },
        width: { xs: '100%' },
        objectFit: 'contain',
      },
    }}
  />,
]

const Home = () => {
  return (
    <>
      <Carousel
        slides={bannerSlides}
        pagination={{ clickable: true, type: 'bullets' }}
        loop={true}
        speed={800}
        containerStyles={{ backgroundColor: 'background.white' }}
        slideStyles={{ my: 2 }}
      />{' '}
      <Container>
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
      </Container>
    </>
  )
}

export default Home
