import { Grid } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'

const Cart = () => {
  return (
    <PageLayout container isAsync={false}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}></Grid>
        <Grid item xs={12} md={4} lg={4}></Grid>
      </Grid>
    </PageLayout>
  )
}

export default Cart
