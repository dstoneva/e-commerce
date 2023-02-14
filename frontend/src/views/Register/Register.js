import { Box, Button, Divider, Link, Paper, TextField, Typography } from '@mui/material'
import { useAuth } from 'core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link as RouterLink } from 'react-router-dom'
import { PageURLs } from 'Routes'
import { Logo } from 'components'

const Register = () => {
  const { register } = useAuth()

  const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    phone: yup.string('Enter your phone').required('Phone is required'),
    name: yup.string('Enter your name').required('Name is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords aren't matching")
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      name: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async ({ password, name, phone, email }) => {
      await register({ password, name, phone, email })
    },
  })
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 400, width: '100%', mt: 5 }}>
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" sx={{ mt: 1 }}>
        <Logo />
        <Typography variant="subtitle1" align="center" fontWeight="bold">
          Create Your Account
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="name"
          label="Full name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          name="passwordConfirmation"
          label="Confirm password"
          type="password"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          sx={{ mb: 2 }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button color="primary" variant="contained" type="submit">
            Register
          </Button>
          <Link component={RouterLink} to={PageURLs.Login} variant="caption">
            Already have an account? Login!
          </Link>
        </Box>
      </form>
    </Paper>
  )
}

export default Register
