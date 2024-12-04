import { Box, Button, Divider, Link, Paper, Typography } from '@mui/material'
import { Logo, TextFieldWithFormik } from 'components'
import { useAuth } from 'core'
import { useFormik } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import { PageURLs } from 'Routes'
import * as yup from 'yup'

const Login = () => {
  const { login } = useAuth()

  const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: 'demo@mail.com',
      password: 'demodemo',
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password })
    },
  })

  const fields = [
    { name: 'email', label: 'Email', type: 'email', sx: { mb: 1 } },
    { name: 'password', label: 'Password', type: 'password', sx: { mb: 2 } },
  ]
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 400, width: '100%' }}>
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" sx={{ mt: 1 }}>
        <Logo />
        <Typography variant="subtitle1" align="center" fontWeight="bold">
          Welcome To Bazaar
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <form onSubmit={formik.handleSubmit}>
        {fields.map((field) => (
          <TextFieldWithFormik key={field.name} formik={formik} {...field} />
        ))}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
          <Link component={RouterLink} to={PageURLs.Register} variant="caption">
            No account? Register!
          </Link>
        </Box>
      </form>
    </Paper>
  )
}

export default Login
