import React from 'react'
import { TextField } from '@mui/material'
import get from 'lodash.get'

const TextFieldWithFormik = ({ formik, name, label, required = true, type = 'text', sx }) => {
  const value = get(formik.values, name, '')
  const error = get(formik.errors, name)
  const touched = get(formik.touched, name)

  return (
    <TextField
      fullWidth
      multiline={type === 'textarea'}
      required={required}
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
      sx={sx}
    />
  )
}

export default TextFieldWithFormik
