import React from 'react'
import { Grid } from '@mui/material'
import { TextFieldWithFormik } from 'components'

const CardDetails = ({ formik }) => {
  const fields = [
    { name: 'payment.card.name', label: 'Name on card', type: 'text' },
    { name: 'payment.card.number', label: 'Card number', type: 'text' },
    { name: 'payment.card.expiryDate', label: 'Expiry date (MM/YY)', type: 'text' },
    { name: 'payment.card.ccv', label: 'CCV', type: 'text' },
  ]

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} key={field.name}>
          <TextFieldWithFormik formik={formik} {...field} />
        </Grid>
      ))}
    </Grid>
  )
}

export default CardDetails
