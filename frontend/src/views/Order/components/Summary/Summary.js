import { Paper, Box, Typography, Divider } from '@mui/material'
import { DisplayCurrency } from 'components'

const Summary = ({ payment, cart }) => {
  const priceWithoutDiscount = cart
    ?.map((product) => +(product?.product?.price * product?.quantity).toFixed(2))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const totalPice = cart
    ?.map(
      (product) =>
        +(
          product?.product?.price * product?.quantity -
          (product?.product?.discountPercentage * product?.product?.price) / 100
        ).toFixed(2)
    )
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total summary
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: (theme) => theme.palette.grey[500], mb: 1 }}>Subtotal:</Typography>
        <Typography>
          <DisplayCurrency number={priceWithoutDiscount} />
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: (theme) => theme.palette.grey[500], mb: 1 }}>Shipping Fee:</Typography>
        <Typography>
          <DisplayCurrency number={0} />
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: (theme) => theme.palette.grey[500], mb: 1 }}>Tax</Typography>
        <Typography>
          <DisplayCurrency number={10} />
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: (theme) => theme.palette.grey[500], mb: 1 }}>Discount:</Typography>
        <Typography>
          <DisplayCurrency number={priceWithoutDiscount - totalPice} />
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography
          sx={{
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <DisplayCurrency number={totalPice + 10} />
        </Typography>
      </Box>
      <Box>
        <Typography>Paid by: {payment}</Typography>
      </Box>
    </Paper>
  )
}

export default Summary
