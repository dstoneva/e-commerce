const express = require('express')
const router = express.Router()

const { getCategories, getCategory } = require('../controller/categoryController')
const { protect } = require('../middleware/auth')

router.get('/', protect, getCategories)
router.get('/:categoryId', protect, getCategory)

module.exports = router
