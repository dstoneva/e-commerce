import { ArrowRight } from '@mui/icons-material'
import { Button, Link, useTheme } from '@mui/material'
import Slider from 'react-slick'
import { ProductCard, SliderArrow } from 'components'
import useSWR from 'swr'
import Headline from '../Headline'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import ResourceView from 'components/ResourceView/ResourceView'
import ProductCardSkeleton from 'components/ProductCard/ProductCardSkeleton'

const FlashDeals = () => {
  const theme = useTheme()

  const { data: products, error, isLoading } = useSWR(`/products?page=1&productsPerPage=8`, { dedupingInterval: 60000 })

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SliderArrow right />,
    prevArrow: <SliderArrow />,
    swipe: false,
    lazyLoad: 'progressive',
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
          <Slider {...settings}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{ padding: '0 8px' }}>
                <ProductCardSkeleton />
              </div>
            ))}
          </Slider>
        }
      >
        <Slider {...settings}>
          {products?.result.map((product) => (
            <div key={product._id} style={{ padding: '0 8px' }}>
              <ProductCard
                quickView
                product={{
                  ...product,
                  thumbnail: product.thumbnail,
                }}
              />
            </div>
          ))}
        </Slider>
      </ResourceView>
    </>
  )
}

export default FlashDeals
