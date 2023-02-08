import { Box, Button, CardActionArea, CardMedia, Link, Paper, Typography, Grid } from '@mui/material'
import Headline from '../Headline'
import { ArrowRight } from '@mui/icons-material'
import StarPurple500Icon from '@mui/icons-material/StarPurple500'

const featuredBrandsDetails = [
  {
    title: 'London Britches',
    imageURL: '/images/london-britches.webp',
  },
  {
    title: 'Jim and Jiko',
    imageURL: '/images/jim-and-jiko.webp',
  },
]

const FeaturedBrands = () => {
  return (
    <>
      <Headline
        icon={<StarPurple500Icon color="warning" />}
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
        Featured Brands
      </Headline>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={4}>
          {featuredBrandsDetails.map((item, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box>
                <CardActionArea sx={{ mb: 1 }}>
                  <CardMedia
                    component="img"
                    height={170}
                    image={item.imageURL}
                    alt={item.title}
                    sx={{ borderRadius: '8px' }}
                  />
                </CardActionArea>
                <Typography variant="h6" sx={{ fontSize: '14px !important', fontWeight: 600 }}>
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}

export default FeaturedBrands
