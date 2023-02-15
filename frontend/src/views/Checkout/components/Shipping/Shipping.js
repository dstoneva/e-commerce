import { Grid, Paper, TextField, Typography, Container, Box, Autocomplete } from '@mui/material'
import { Subtotal } from 'components'
import countries from 'utils/constants/countries'

const Shipping = ({ formik }) => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" align="left" sx={{ fontWeight: 600, mb: 2, alignContent: 'flex-start' }}>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Full name"
                  name="address.fullName"
                  value={formik.values.address?.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.fullName && Boolean(formik.errors.address?.fullName)}
                  helperText={formik.touched.address?.fullName && formik.errors.address?.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name="address.email"
                  value={formik.values.address?.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.email && Boolean(formik.errors.address?.email)}
                  helperText={formik.touched.address?.email && formik.errors.address?.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Phone"
                  name="address.phone"
                  value={formik.values.address?.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.phone && Boolean(formik.errors.address?.phone)}
                  helperText={formik.touched.address?.phone && formik.errors.address?.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="ZIP Code"
                  name="address.zip"
                  value={formik.values.address?.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.zip && Boolean(formik.errors.address?.zip)}
                  helperText={formik.touched.address?.zip && formik.errors.address?.zip}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Address"
                  name="address.address1"
                  value={formik.values.address?.address1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.address1 && Boolean(formik.errors.address?.address1)}
                  helperText={formik.touched.address?.address1 && formik.errors.address?.address1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  id="country-autocomplete"
                  name="address.country"
                  disableClearable
                  fullWidth
                  value={formik.values.address?.country}
                  isOptionEqualToValue={(option, value) => option.label === value}
                  onChange={(e, value) => {
                    formik.setFieldValue('address.country', value.label)
                  }}
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
                      value={formik.values.address?.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
                      helperText={formik.touched.address?.country && formik.errors.address?.country}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-country', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Subtotal />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Shipping
