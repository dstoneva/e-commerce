import { ArrowRight } from '@mui/icons-material'
import { Button, Grid, Link, useTheme } from '@mui/material'
import Slider from 'react-slick'
import { ProductCard, SliderArrow } from 'components'
import useSWR from 'swr'
import Headline from '../Headline'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import ResourceView from 'components/ResourceView/ResourceView'
import ProductCardSkeleton from 'components/ProductCard/ProductCardSkeleton'

const FlashDeals = () => {
  const { data: products, error, isLoading } = useSWR(`/products?productsPerPage=8`)
  const theme = useTheme()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SliderArrow right />,
    prevArrow: <SliderArrow />,
    swipe: false,
    responsive: [
      { breakpoint: theme.breakpoints.values.xl, settings: { slidesToShow: 4 } },
      { breakpoint: theme.breakpoints.values.lg, settings: { slidesToShow: 3 } },
      { breakpoint: theme.breakpoints.values.md, settings: { slidesToShow: 2 } },
      { breakpoint: theme.breakpoints.values.sm, settings: { slidesToShow: 1 } },
      { breakpoint: theme.breakpoints.values.xs, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <>
      <Headline
        icon={<ElectricBoltIcon color="primary" />}
        additionalComponent={
          <Button
            component={Link}
            href="#"
            sx={{ fontSize: 14, color: (theme) => theme.palette.grey[600] }}
            endIcon={<ArrowRight />}
          >
            View all
          </Button>
        }
      >
        Flash Deals
      </Headline>

      <ResourceView
        isLoading={isLoading}
        isError={error}
        loadingComponent={
          <Slider {...settings} style={{ paddingTop: 8, paddingBottom: 8 }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid item xs={12} xl={3} lg={4} md={6} sm={12} key={index}>
                <ProductCardSkeleton />
              </Grid>
            ))}
          </Slider>
        }
      >
        <Slider {...settings} style={{ paddingTop: 8, paddingBottom: 8 }}>
          {products?.result.map((product) => (
            <Grid item xs={12} xl={3} lg={4} md={6} sm={12} key={product._id}>
              <ProductCard quickView product={product} />
            </Grid>
          ))}
        </Slider>
      </ResourceView>
    </>
  )
}

export default FlashDeals
