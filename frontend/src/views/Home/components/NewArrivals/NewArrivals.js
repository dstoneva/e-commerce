import { Box, Button, CardActionArea, CardMedia, Grid, Link, Paper, Typography } from '@mui/material'
import { DisplayCurrency } from 'components'
import Headline from '../Headline'
import { ArrowRight } from '@mui/icons-material'
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const newArrivalsDetails = [
  {
    title: 'Sunglass',
    imgURL: '/images/imagegoggles.webp',
    price: 150,
  },
  {
    title: 'Makeup',
    imgURL: '/images/makeup.webp',
    price: 250,
  },
  {
    title: 'Smart Watch',
    imgURL: '/images/bgwatch.webp',
    price: 350,
  },
  {
    title: 'Lipstick',
    imgURL: '/images/lipstick.webp',
    price: 15,
  },
  {
    title: 'Green Plant',
    imgURL: '/images/plant.webp',
    price: 55,
  },
  {
    title: 'Bonsai Tree',
    imgURL: '/images/bonsai.webp',
    price: 535,
  },
]

const NewArrivals = () => {
  return (
    <>
      <Headline
        icon={<NewReleasesIcon color="success" />}
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
        New Arrivals
      </Headline>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={3}>
          {newArrivalsDetails.map((item, i) => (
            <Grid item xs={6} md={3} sm={4} lg={2} key={i}>
              <Box sx={{ m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} key={i}>
                <CardActionArea sx={{ mb: 1.5 }}>
                  <CardMedia
                    component="img"
                    image={item.imgURL}
                    alt={item.title}
                    sx={{ borderRadius: '8px', aspectRatio: 1 / 1 }}
                  />
                </CardActionArea>
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

export default NewArrivals
