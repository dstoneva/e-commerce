import { Container, Grid, Box } from '@mui/material'
import { useMemo } from 'react'
import {
  Carousel,
  NewArrivals,
  TopCategories,
  TopRatings,
  FeaturedBrands,
  ProductList,
  FlashDeals,
  ScrollToTopButton,
  BannerSlide,
  Delivery,
} from './components'
import { bannerData } from './data/data'

const Home = () => {
  const bannerSlides = useMemo(() => bannerData.map((slide, index) => <BannerSlide key={index} {...slide} />), [])
  return (
    <>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          px: 4,
          maxHeight: { xs: 'auto', lg: 500 },
        }}
      >
        <Container
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Carousel
            slides={bannerSlides}
            pagination={{ clickable: true, type: 'bullets' }}
            loop={true}
            speed={200}
            containerStyles={{ backgroundColor: 'background.white' }}
            slideStyles={{ my: 2 }}
          />
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
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
            <ProductList headline="More for you" productsNum={8} pageNum={4} />
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
