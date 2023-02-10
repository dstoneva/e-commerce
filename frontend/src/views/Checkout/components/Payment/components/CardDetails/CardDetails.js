import { Grid, TextField } from '@mui/material'

const CardDetails = ({ formik }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="Name on card"
          name="payment.card.name"
          value={formik.values.payment?.card?.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.payment?.card?.name && Boolean(formik.errors.payment?.card?.name)}
          helperText={formik.touched.payment?.card?.name && formik.errors.payment?.card?.name}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          required
          label="Card number"
          name="payment.card.number"
          value={formik.values.payment?.card?.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.payment?.card?.number && Boolean(formik.errors.payment?.card?.number)}
          helperText={formik.touched.payment?.card?.number && formik.errors.payment?.card?.number}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          required
          label="Expiry date"
          name="payment.card.expiryDate"
          value={formik.values.payment?.card?.expiryDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.payment?.card?.expiryDate && Boolean(formik.errors.payment?.card?.expiryDate)}
          helperText={formik.touched.payment?.card?.expiryDate && formik.errors.payment?.card?.expiryDate}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          required
          label="CCV"
          name="payment.card.ccv"
          value={formik.values.payment?.card?.ccv}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.payment?.card?.ccv && Boolean(formik.errors.payment?.card?.ccv)}
          helperText={formik.touched.payment?.card?.ccv && formik.errors.payment?.card?.ccv}
          sx={{ mb: 1 }}
        />
      </Grid>
    </Grid>
  )
}

export default CardDetails
