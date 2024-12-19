import React from 'react'
import { Box, Typography } from '@mui/material'
import { DisplayCurrency } from 'components'

const PriceDisplay = ({ product, finalPrice, inCart, inCartDrawer, quickView }) => (
  <Typography variant={inCartDrawer ? 'overline' : 'body2'}>
    {product.discountPercentage > 0 ? (
      <Box component="span" display="flex" alignItems="center">
        <Box
          component="span"
          sx={{
            ...(quickView && { fontWeight: 600, color: 'primary.main' }),
          }}
        >
          <DisplayCurrency number={finalPrice} />
        </Box>
        <Box
          component="span"
          sx={{
            textDecoration: 'line-through',
            ml: 1,
            color: inCart || inCartDrawer ? 'error.main' : (theme) => theme.palette.grey[600],
            display: 'inline',
          }}
        >
          <DisplayCurrency number={product.price} />
        </Box>
      </Box>
    ) : (
      <DisplayCurrency number={finalPrice} />
    )}
  </Typography>
)

export default PriceDisplay
