import { Box, Grid, MenuItem, Pagination, TextField, Typography } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'
import useSWR from 'swr'
import { useState } from 'react'
import { ProductCard } from 'components'
import Headline from '../Headline'
import WidgetsIcon from '@mui/icons-material/Widgets'

const ProductList = () => {
  const [page, setPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(4)

  const { data: products, error } = useSWR(`/products?page=${page}&productsPerPage=${productsPerPage}`)

  return (
    <PageLayout error={error} data={products}>
      <Headline icon={<WidgetsIcon color="primary" />} sx={{ marginTop: 4 }}>
        More For You
      </Headline>
      <Grid container spacing={3}>
        {products?.result.map((product) => (
          <Grid item xs={12} sm={4} md={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
        <Pagination
          count={products?.pages}
          page={page}
          onChange={(event, value) => {
            setPage(value)
          }}
        />
        <Box display="flex" alignItems="center">
          <Typography variant="overline" sx={{ mr: 1 }}>
            Products per page:
          </Typography>
          <TextField
            size="small"
            select
            value={productsPerPage}
            onChange={(e) => {
              setPage(1)
              setProductsPerPage(e.target.value)
            }}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={16}>16</MenuItem>
          </TextField>
        </Box>
      </Box>
    </PageLayout>
  )
}

export default ProductList
