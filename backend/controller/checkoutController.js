const asyncHandler = require('express-async-handler')

const Checkout = require('../models/CheckoutModel')

const getCheckouts = asyncHandler(async (req, res) => {
  const { page: pageFromParams, itemsPerPage = 10 } = req.query

  const page = +pageFromParams >= 1 ? +pageFromParams - 1 : 0

  const checkouts = await Checkout.find()
    .populate({
      path: 'cart.product',
      select: '-images -rating -description -rate -comments'
    })
    .populate({
      path: 'user',
      select: '-password'
    })
    .sort({ createdAt: 'desc' })
    .limit(+itemsPerPage)
    .skip(+itemsPerPage * page)

  const total = await Checkout.find().countDocuments()

  if (checkouts.length) {
    res.json({
      result: checkouts,
      page,
      itemsPerPage: +itemsPerPage,
      total,
      pages: total < +itemsPerPage ? 1 : Math.ceil(total / +itemsPerPage)
    })
  } else {
    res.status(404).json({ result: [], page, itemsPerPage: +itemsPerPage, message: 'No checkouts found' })
  }
})

const getCheckout = asyncHandler(async (req, res) => {
  const { checkoutId } = req.params

  const checkout = await Checkout.findById(checkoutId)
    .populate({
      path: 'cart.product',
      select: '-images -rating -description -rate -comments'
    })
    .populate({
      path: 'user',
      select: '-password'
    })

  if (checkout) {
    res.json(checkout)
  } else {
    res.status(404).json({ message: "Checkout doesn't exist" })
  }
})

const createCheckout = asyncHandler(async (req, res) => {
  const { cart, address, payment } = req.body

  if (!cart || !cart.length) {
    res.status(400)
    throw new Error('Cart is empty')
  }

  if (!payment) {
    res.status(400)
    throw new Error('Payment details are necessary')
  }

  if (!address) {
    res.status(400)
    throw new Error('Address is necessary')
  }

  if (payment?.type !== 'card' && payment?.type !== 'delivery' && payment?.type !== 'paypal') {
    res.status(400)
    throw new Error('Payment type is corrupted')
  }

  if (
    payment?.type === 'card' &&
    !payment.card?.number &&
    !payment.card?.name &&
    !payment.card?.expiryDate &&
    !payment.card?.ccv
  ) {
    res.status(400)
    throw new Error('Please enter card details')
  }

  if (!address.fullName || !address.phone || !address.email || !address.zip || !address.address1 || !address.country) {
    res.status(400)
    throw new Error('Please fill your address completely')
  }

  const checkout = await Checkout.create({
    user: req.user._id,
    cart,
    payment: payment.type === 'card' ? payment : { type: payment.type, details: payment.details },
    address
  })

  if (checkout) {
    res.status(200).json({
      message: 'Order completed',
      id: checkout._id
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

module.exports = {
  getCheckouts,
  getCheckout,
  createCheckout
}
