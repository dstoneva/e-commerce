import React, { Fragment } from 'react'
import { Box, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material'
import { CartActionsButton } from 'components'
import PriceDisplay from './PriceDisplay'

const DrawerCartView = ({ product, finalPrice, getQuantity, handleAdd, handleRemove, itemIds }) => (
  <Fragment>
    <Card sx={{ p: 2, display: 'flex', height: 100, alignItems: 'center' }} elevation={0}>
      <CardMedia component="img" sx={{ width: 100 }} image={product.thumbnail} alt={product.title} />
      <CardContent sx={{ flex: '1 0 auto', p: 0, pl: 2, pb: '0 !important' }}>
        <Box display="flex" justifyContent="space-between">
          <Box maxWidth="140px">
            <Typography variant="body1" noWrap>
              {product.title}
            </Typography>
            <Typography variant="overline">
              <PriceDisplay product={product} finalPrice={finalPrice} inCartDrawer />
            </Typography>
          </Box>
          <CartActionsButton
            inCart={itemIds.includes(product._id)}
            layoutStyle="compact-icon-buttons"
            stock={product.stock}
            quantity={getQuantity(product._id)}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        </Box>
      </CardContent>
    </Card>
    <Divider />
  </Fragment>
)

export default DrawerCartView
