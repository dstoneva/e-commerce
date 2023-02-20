import { Grid, Typography, Box, Link } from '@mui/material'
import { useFavourites } from 'core'
import { PageLayout } from 'layouts/Main/components'
import { ProductCard } from 'components'
import { Headline } from 'views/Home/components'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Favourites = () => {
  const { favourites } = useFavourites()
  return (
    <PageLayout container isAsync={false}>
      {favourites.length < 1 ? (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={2} height={450}>
          <Box component="img" src="/images/wishlist-svgrepo-com.svg" alt="Wishlist" height={200} />
          <Typography align="center" variant="h4">
            Your wishlist is currently empty!
          </Typography>
          <Typography variant="subtitle1" color="gray" align="center">
            Looks like you have not made your choice yet. Browse our awesome store,{' '}
            <Link href="/">start shopping now</Link>!
          </Typography>
        </Box>
      ) : (
        <>
          <Headline sx={{ mb: 4, ml: 0.5 }} icon={<FavoriteIcon color="primary" />}>
            Favorites
          </Headline>
          <Grid container spacing={3}>
            {favourites.map((product) => (
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </PageLayout>
  )
}

export default Favourites
