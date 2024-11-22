import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Container } from '@mui/system'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import { Grid, Box } from '@mui/material'

const Carousel = ({
  slides = [],
  pagination = { clickable: true, type: 'bullets' },
  loop = true,
  speed = 800,
  containerStyles = {},
  slideStyles = {},
  autoplay = { delay: 2000 },
}) => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', px: 4, maxHeight: { xs: 'auto', lg: 500 } }}>
      <Container
        disableGutters
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          ...containerStyles,
        }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          speed={speed}
          slidesPerView={1}
          pagination={pagination}
          loop={loop}
          autoplay={autoplay}
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={index}>
              <Grid
                container
                columnSpacing={3}
                spacing={3}
                direction="row"
                rowSpacing={3}
                alignItems="center"
                justifyContent="center"
                sx={{
                  my: 1,
                  minHeight: 400,
                  ...slideStyles,
                }}
              >
                {slideContent}
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  )
}

export default Carousel
