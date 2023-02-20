import { Box, Grid, MenuItem, Pagination, TextField, Typography } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'
import useSWR from 'swr'
import { useState } from 'react'
import { ProductCard } from 'components'
import Headline from '../Headline'
import WidgetsIcon from '@mui/icons-material/Widgets'

const ProductList = ({ pageNum, productsNum, headline, pagination }) => {
  const [page, setPage] = useState(pageNum)
  const [productsPerPage, setProductsPerPage] = useState(productsNum)

  const { data: products, error } = useSWR(`/products?page=${page}&productsPerPage=${productsPerPage}`)

  return (
    <PageLayout error={error} data={products}>
      <Headline icon={<WidgetsIcon color="primary" />} sx={{ marginTop: 4 }}>
        {headline}
      </Headline>
      <Grid container spacing={3}>
        {products?.result.map((product) => (
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={product._id}>
            <ProductCard quickView product={product} />
          </Grid>
        ))}
      </Grid>
      {pagination && (
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
      )}
    </PageLayout>
  )
}

export default ProductList
