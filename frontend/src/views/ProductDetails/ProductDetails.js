import { Container, Skeleton, Box, Grid } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { AdditionalInfo, ProductDetailsCard } from './components'

const ProductDetailsSkeleton = () => (
  <Container
    sx={{
      mt: 5,
    }}
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Skeleton variant="rectangular" width={300} height={300} sx={{ mb: 5, borderRadius: 2 }} />
          <Box display="flex" justifyContent="center" gap={2}>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" width={64} height={64} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center">
          <Skeleton width="60%" height={40} />
          <Skeleton width="40%" height={30} />
          <Skeleton width="30%" height={20} />
          <Skeleton width="50%" height={30} />
          <Skeleton width="100%" height={40} sx={{ mb: 2 }} />
        </Box>
      </Grid>
    </Grid>
    <Box sx={{ mt: 5 }}>
      <Skeleton width="30%" height={30} />
      <Skeleton width="100%" height={150} />
    </Box>
  </Container>
)

const ProductDetails = () => {
  const params = useParams()
  const { data: product, error, isLoading } = useSWR(`/products/${params.productId}`, { dedupingInterval: 60000 })

  return (
    <PageLayout error={error} data={product} loading={<ProductDetailsSkeleton />} container>
      <Container
        sx={{
          mt: 5,
        }}
      >
        <ProductDetailsCard product={product} />
        <AdditionalInfo product={product} isLoading={isLoading} />
      </Container>
    </PageLayout>
  )
}

export default ProductDetails
