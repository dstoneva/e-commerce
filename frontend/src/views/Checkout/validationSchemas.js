import * as yup from 'yup'

export const validationSchemas = {
  1: yup.object().shape({
    address: yup.object().shape({
      fullName: yup
        .string('Enter your name')
        .matches(/^([^0-9]*)$/, 'Name should not contain numbers')
        .required('Full name is required'),
      phone: yup
        .string('Enter your Phone')
        .required('Phone is required')
        .matches(/^\s*\+?\s*([0-9][\s-]*){9,}$/, 'Enter a valid phone'),
      email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
      zip: yup.string('Enter your zip code').required('Zip code is required'),
      address1: yup.string('Enter your address').required('Address is required'),
      country: yup.string('Enter your country').required('Country is required'),
    }),
  }),
  2: yup.object().shape({
    payment: yup.object().shape({
      type: yup.mixed().oneOf(['delivery', 'card', 'paypal']).required('Type of payment is required'),
      card: yup.object().when('type', {
        is: (card) => card !== 'card',
        then: yup.object().shape({
          name: yup.string(),
          expiryDate: yup.string(),
          number: yup.number(),
          ccv: yup.number(),
        }),
        otherwise: yup.object().shape({
          name: yup.string().required('Name on card is required'),
          expiryDate: yup.string().required('Expiry date is required'),
          number: yup.number().required('Card number is required'),
          ccv: yup.number().required('CCV is required'),
        }),
      }),
      details: yup.string(),
    }),
  }),
}