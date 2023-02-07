const express = require('express')
const router = express.Router()

const { getCheckouts, getCheckout, createCheckout } = require('../controller/checkoutController')
const { protect, isAdmin } = require('../middleware/auth')

router.get('/', protect, isAdmin, getCheckouts)
router.get('/:checkoutId', protect, getCheckout)
router.post('/create', protect, createCheckout)

module.exports = router
