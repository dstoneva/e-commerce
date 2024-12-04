import { ArrowRight } from '@mui/icons-material'
import { Button, Card, CardActionArea, CardContent, CardMedia, Chip, Link, Paper, useTheme, Grid } from '@mui/material'
import { SliderArrow } from 'components'
import Headline from '../Headline'
import WidgetsIcon from '@mui/icons-material/Widgets'
import Slider from 'react-slick'

const TopCategories = () => {
  const theme = useTheme()

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SliderArrow right />,
    prevArrow: <SliderArrow />,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xs,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <>
      <Headline
        icon={<WidgetsIcon color="primary" />}
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
        sx={{ marginTop: 4 }}
      >
        Top Categories
      </Headline>
      <Slider {...settings}>
        {[...Array(4)].map((item, i) => (
          <Grid item xs={12} sm={12} md={2} lg={3} key={i}>
            <Card
              elevation={0}
              sx={{
                boxSizing: 'border-box',
                margin: 1,
              }}
            >
              <CardContent sx={{ pb: '16px !important' }}>
                <CardActionArea>
                  <Paper elevation={1} sx={{ overflow: 'hidden', position: 'relative' }}>
                    <Chip
                      color="secondary"
                      size="small"
                      sx={{ px: 0.5, position: 'absolute', top: 10, left: 10, fontWeight: 600 }}
                      label="Headphones"
                    />
                    <Chip
                      size="small"
                      sx={{
                        px: 0.5,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontWeight: 600,
                        bgcolor: 'background.default',
                        color: 'text.primary',
                      }}
                      label="3k orders this week"
                    />
                    <CardMedia loading="lazy" component="img" height="120" image="/images/category-1.webp" alt="cat" />
                  </Paper>
                </CardActionArea>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Slider>
    </>
  )
}

export default TopCategories
