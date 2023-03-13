import { Box, Button, Step, StepLabel, Stepper, Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { PageLayout } from 'layouts/Main/components'
import { useState } from 'react'
import Cart from 'views/Cart'
import { API_URL } from 'config'
import axios from 'axios'
import { useCart } from 'core'
import { validationSchemas } from './validationSchemas'
import { useError } from 'utils/hooks'
import { useSnackbar } from 'notistack'
import { PageURLs } from 'Routes'
import { useNavigate } from 'react-router-dom'
import { Shipping, Payment } from './components'

const Checkout = () => {
  const { setError } = useError()
  const { cart: originalCart, resetCart } = useCart()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState(0)

  const formik = useFormik({
    initialValues: {
      address: {
        fullName: '',
        phone: '',
        email: '',
        zip: '',
        address1: '',
        address2: '',
        country: 'Bulgaria',
      },
      payment: {
        type: 'delivery',
        card: {
          number: '',
          name: '',
          expiryDate: '',
          ccv: '',
        },
        details: '',
      },
    },
    validationSchema: activeStep in validationSchemas ? validationSchemas[activeStep] : null,
    onSubmit: async (values) => {
      const cart = originalCart.map((item) => {
        return { product: item._id, quantity: item.quantity }
      })

      try {
        const { data } = await axios.post(`${API_URL}/checkouts/create`, { cart, ...values })
        enqueueSnackbar(data.message, {
          variant: 'success',
        })
        resetCart()
        navigate(`${PageURLs.Order}/${data.id}`)
      } catch (error) {
        setError(error)
      }
    },
  })

  if (originalCart.length < 1) {
    setTimeout(function () {
      navigate('/')
    }, 5000)
  }

  const steps = [
    { label: 'Cart', component: <Cart withoutFooter={true} /> },
    { label: 'Shipping', component: <Shipping formik={formik} /> },
    { label: 'Payment', component: <Payment formik={formik} /> },
  ]

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <PageLayout isAsync={false} container>
      {originalCart.length > 0 ? (
        <Grid container>
          <Grid item sm={12} display={{ sm: 'block', xs: 'none', m: 2 }}>
            <Stepper activeStep={activeStep} sx={{ px: 2 }}>
              {steps.map((step, index) => {
                return (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>{steps[activeStep].component}</Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2} sx={{ px: 3 }}>
              <Grid item sm={4} xs={12}>
                <Button fullWidth color="primary" disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                  {activeStep === 0 ? 'Back' : `Back to ${steps[activeStep - 1].label}`}
                </Button>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNext}
                  color="primary"
                  disabled={(activeStep !== 0 && !(formik.isValid && formik.dirty)) || originalCart.length === 0}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : `Proceed to ${steps[activeStep + 1].label}`}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          <Cart withoutFooter={true} />
          <Typography align="center" vartiant="subtitle1" fontWeight="bold">
            You will be redirected to the homepage in 5 seconds
          </Typography>
        </>
      )}
    </PageLayout>
  )
}

export default Checkout
