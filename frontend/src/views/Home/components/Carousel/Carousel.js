import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import { Grid } from '@mui/material'

const Carousel = ({
  slides = [],
  pagination = { clickable: true, type: 'bullets' },
  loop = true,
  speed = 300,
  slideStyles = {},
  autoplay = { delay: 2000 },
}) => {
  return (
    <Swiper
      lazy="true"
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
  )
}

export default Carousel
