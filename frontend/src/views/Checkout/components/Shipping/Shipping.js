import React from 'react'
import { Grid, Paper, Typography, Container, Box, Autocomplete, TextField } from '@mui/material'
import { Subtotal, TextFieldWithFormik } from 'components'
import countries from 'utils/constants/countries'

const Shipping = ({ formik }) => {
  const fields = [
    { name: 'address.fullName', label: 'Full name', type: 'text' },
    { name: 'address.email', label: 'Email', type: 'email' },
    { name: 'address.phone', label: 'Phone', type: 'tel' },
    { name: 'address.zip', label: 'ZIP Code', type: 'text' },
    { name: 'address.address1', label: 'Address', type: 'text' },
  ]

  const renderCountryAutocomplete = () => (
    <Autocomplete
      key="country"
      id="country-autocomplete"
      name="address.country"
      disableClearable
      fullWidth
      value={countries.find((option) => option.label === formik.values.address?.country) || null}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      onChange={(e, value) => formik.setFieldValue('address.country', value?.label || '')}
      options={countries}
      autoHighlight
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          required
          label="Country"
          name="address.country"
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.address?.country)}
          helperText={formik.touched.country && formik.errors.address?.country}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-country', // Disable browser autocomplete
          }}
        />
      )}
    />
  )

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextFieldWithFormik formik={formik} {...field} />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                {renderCountryAutocomplete()}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Subtotal />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Shipping
