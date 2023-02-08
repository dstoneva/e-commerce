import { Container } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { ProductDetailsCard } from './components'

const ProductDetails = () => {
  const params = useParams()
  const { data: product, error } = useSWR(`/products/${params.productId}`)

  return (
    <PageLayout error={error} data={product}>
      <Container
        sx={{
          mt: 5,
        }}
      >
        <ProductDetailsCard product={product} />
      </Container>
    </PageLayout>
  )
}

export default ProductDetails
