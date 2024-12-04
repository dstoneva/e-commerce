import * as yup from 'yup'
import dayjs from 'dayjs'

export const validationSchemas = {
  1: yup.object().shape({
    address: yup.object().shape({
      fullName: yup
        .string('Enter your name')
        .matches(/^([^0-9]*)$/, 'Name should not contain numbers')
        .required('Full name is required'),
      phone: yup
        .string('Enter your phone')
        .required('Phone is required')
        .matches(/^\s*\+?\s*([0-9][\s-]*){10,}$/, 'Enter a valid phone')
        .min(10, 'Phone must be at least 10 characters')
        .max(13, 'Phone number must be at most 13 characters'),
      email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
      zip: yup
        .string('Enter your zip code')
        .required('Zip code is required')
        .max(5, 'Zip code must be at most 5 characters'),
      address1: yup.string('Enter your address').required('Address is required').max(100, 'Address is too long'),
      address2: yup.string().max(100, 'Address is too long'), // Optional field
      country: yup.string('Enter your country').required('Country is required'),
    }),
  }),
  2: yup.object().shape({
    payment: yup.object().shape({
      type: yup.mixed().oneOf(['delivery', 'card', 'paypal']).required('Type of payment is required'),
      details: yup.string().max(500, 'Details must be at most 500 characters'), // Optional
      card: yup.object().when('type', {
        is: 'card',
        then: yup.object().shape({
          name: yup.string().required('Name on card is required'),
          number: yup
            .string()
            .matches(/^\d+$/, 'Card number must contain only numbers')
            .required('Card number is required'),
          expiryDate: yup
            .string()
            .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format')
            .test('is-valid-date', 'Expiry date must be valid and in the future', (value) => {
              if (!value) return false
              const [month, year] = value.split('/')
              const expiryDate = dayjs(`20${year}-${month}-01`)
              return expiryDate.isValid() && expiryDate.isAfter(dayjs())
            })
            .required('Expiry date is required'),
          ccv: yup
            .string()
            .matches(/^\d{3,4}$/, 'CCV must be 3 or 4 digits')
            .required('CCV is required'),
        }),
        otherwise: yup.object().shape({
          name: yup.string().nullable(),
          number: yup.string().nullable(),
          expiryDate: yup.string().nullable(),
          ccv: yup.string().nullable(),
        }),
      }),
    }),
  }),
}
