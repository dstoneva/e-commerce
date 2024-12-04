import styled from '@emotion/styled'
import { Grid, Paper, Radio, Typography } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { Subtotal, TextFieldWithFormik } from 'components'
import { CardDetails } from './components'

const Payment = ({ formik }) => {
  const paymentMethods = [
    { label: 'Cash on delivery', state: 'delivery' },
    { label: 'Pay with card', state: 'card', component: <CardDetails formik={formik} /> },
    { label: 'Paypal', state: 'paypal' },
  ]

  const handleExpandAccordion = (newExpanded) => {
    formik.setFieldValue('payment.type', newExpanded)
  }

  return (
    <Grid container spacing={3} sx={{ px: 3 }}>
      <Grid item xs={12} md={8} lg={8}>
        <Paper sx={{ p: 3, mb: 2 }}>
          {paymentMethods.map((method) => (
            <Accordion
              key={method.state}
              expanded={formik.values.payment.type === method.state}
              onChange={() => handleExpandAccordion(method.state)}
            >
              <AccordionSummary expandIcon={<Radio checked={method.state === formik.values.payment.type} />}>
                <Typography>{method.label}</Typography>
              </AccordionSummary>
              {method.component && <AccordionDetails>{method.component}</AccordionDetails>}
            </Accordion>
          ))}

          <TextFieldWithFormik
            formik={formik}
            name="payment.details"
            label="Additional details"
            type="textarea"
            required={false}
            sx={{ mt: 2 }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Subtotal />
      </Grid>
    </Grid>
  )
}

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'background.paper',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default Payment
