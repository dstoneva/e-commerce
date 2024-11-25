import { Container } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { AdditionalInfo, ProductDetailsCard } from './components'

const ProductDetails = () => {
  const params = useParams()
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`/products/${params.productId}`, { dedupingInterval: 60000 })

  return (
    <PageLayout error={error} data={product} container>
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
