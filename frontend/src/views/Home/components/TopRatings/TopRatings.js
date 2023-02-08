import { Box, Button, CardActionArea, CardMedia, Grid, Link, Paper, Rating, Typography } from '@mui/material'
import { DisplayCurrency } from 'components'
import Headline from '../Headline'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { ArrowRight } from '@mui/icons-material'

const topRatingsDetails = [
  {
    title: 'Camera',
    imgURL: '/images/camera-1.webp',
    price: 3300,
  },
  {
    title: 'Watch',
    imgURL: '/images/watch-1.webp',
    price: 999,
  },
  {
    title: 'Phone',
    imgURL: '/images/mobile-1.webp',
    price: 999,
  },
  {
    title: 'Shoe',
    imgURL: '/images/shoes-2.webp',
    price: 400,
  },
]

const TopRatings = () => {
  return (
    <>
      <Headline
        icon={<WorkspacePremiumIcon color="warning" />}
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
        Top Ratings
      </Headline>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={4} columnSpacing={4}>
          {topRatingsDetails.map((item, i) => (
            <Grid item xs={6} md={3} sm={6} key={i}>
              <Box sx={{ m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={i}>
                <CardActionArea sx={{ mb: 1.5 }}>
                  <CardMedia
                    component="img"
                    image={item.imgURL}
                    alt={item.title}
                    sx={{ borderRadius: '8px', aspectRatio: 1/1 }}
                  />
                </CardActionArea>
                <Box display="flex" alignItems="center">
                  <Rating readOnly value={4} sx={{ fontSize: '1.25rem' }} />
                  <Typography fontSize={12} fontWeight={600}>
                    (49)
                  </Typography>
                </Box>
                <Typography variant="h6" align="center" sx={{ fontSize: '14px !important', fontWeight: 600 }}>
                  {item.title}
                </Typography>

                <Typography
                  color="primary"
                  variant="h6"
                  align="center"
                  sx={{ fontSize: '14px !important', fontWeight: 600 }}
                >
                  <DisplayCurrency number={item.price} />
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}

export default TopRatings
