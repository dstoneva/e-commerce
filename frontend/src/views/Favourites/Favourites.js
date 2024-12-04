import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFavourites } from 'core'
import { PageLayout } from 'layouts/Main/components'
import { EmptyState, ProductCard } from 'components'
import { Headline } from 'views/Home/components'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ProductCardSkeleton from 'components/ProductCard/ProductCardSkeleton'
import { PageURLs } from 'Routes'

const Favourites = () => {
  const { favourites, error } = useFavourites()
  const navigate = useNavigate()

  return (
    <PageLayout
      container
      error={error}
      data={favourites}
      loading={
        <Grid container spacing={3}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={index}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      }
    >
      {favourites.length < 1 ? (
        <EmptyState
          image="/images/wishlist-svgrepo-com.svg"
          altText="Empty Wishlist"
          title="Your wishlist is currently empty!"
          subtitle="Looks like you have not made your choice yet. Browse our awesome store and add items to your wishlist!"
          primaryAction={{
            text: 'Start Shopping',
            onClick: () => navigate('/'),
          }}
          secondaryAction={{
            text: 'Discover Favourites',
            onClick: () => navigate(PageURLs.Favourites),
          }}
        />
      ) : (
        <>
          <Headline sx={{ mb: 4, ml: 0.5 }} icon={<FavoriteIcon color="primary" />}>
            Favorites
          </Headline>
          <Grid container spacing={3}>
            {favourites.map((product) => (
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={product._id}>
                <ProductCard quickView product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </PageLayout>
  )
}

export default Favourites
