import { Typography, Grid, Box, Paper } from '@mui/material'
import { PageLayout } from 'layouts/Main/components'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import dateFormatter from 'utils/helpers/dateFormatter'
import { Headline } from 'views/Home/components'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { OrderItem, Summary } from './components'

const Order = () => {
  const { orderId } = useParams()
  const { data, error } = useSWR(`/checkouts/${orderId}`)

  return (
    <PageLayout error={error} data={data} sx={{ minHeight: '80vh' }} container>
      <Headline icon={<LocalMallIcon color="primary" />} sx={{ marginBottom: 4 }}>
        Order details
      </Headline>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.grey[200],
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Typography>Order ID: {orderId}</Typography>
              <Typography>Placed on: {dateFormatter(data?.createdAt)}</Typography>
            </Box>
            <Box padding={1}>
              {data?.cart?.map((item, i) => (
                <OrderItem product={item} key={i} />
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Shipping address
            </Typography>
            <Typography variant="body">
              {data?.address?.country}, {data?.address?.zip}, {data?.address?.address1}
            </Typography>
          </Paper>
          <Summary cart={data?.cart} payment={data?.payment?.type} />
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default Order
