const express = require('express')
const router = express.Router()

const {
  getProducts,
  getProduct,
  getMultipleProducts,
  updateProduct,
  createProduct
} = require('../controller/productController')
const { protect, isAdmin } = require('../middleware/auth')

router.get('/', protect, getProducts)
router.get('/by-ids', protect, getMultipleProducts)
router.get('/:productId', protect, getProduct)
router.put('/:productId', protect, isAdmin, updateProduct)
router.post('/create', protect, isAdmin, createProduct)

module.exports = router
