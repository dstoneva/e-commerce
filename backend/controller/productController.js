const asyncHandler = require('express-async-handler')
const ObjectId = require('mongoose').Types.ObjectId

const Product = require('../models/ProductModel')

const getProducts = asyncHandler(async (req, res) => {
  const { page: pageFromParams, productsPerPage = 10 } = req.query

  const page = +pageFromParams >= 1 ? +pageFromParams - 1 : 0

  const products = await Product.find()
    .sort({ id: 'asc' })
    .limit(+productsPerPage)
    .skip(+productsPerPage * page)
    .select('-id')

  const total = await Product.find().countDocuments()

  if (products.length) {
    res.json({
      result: products,
      page,
      productsPerPage: +productsPerPage,
      total,
      pages: total < +productsPerPage ? 1 : Math.ceil(total / +productsPerPage)
    })
  } else {
    res.status(404).json({ result: [], page, productsPerPage: +productsPerPage, message: 'No products found' })
  }
})

const getMultipleProducts = asyncHandler(async (req, res) => {
  const { productIds } = req.query

  if (Array.isArray(productIds) || ObjectId.isValid(productIds)) {
    const query = { _id: { $in: productIds } }
    const products = await Product.find(query).sort({ createdAt: 'desc' }).select('-id')

    const total = await Product.find(query).countDocuments()

    if (products.length) {
      res.json({
        result: products,
        total
      })
    } else {
      res.status(200).json({ result: [], total: 0, message: 'No products found' })
    }
  } else {
    res.status(400).json({ result: [], total: 0, message: 'Query param for products is malformed' })
  }
})

const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params

  const product = await Product.findById(productId)

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: "Product doesn't exist" })
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params
  const { title, description, price, discountPercentage, stock, brand, category } = req.body

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      title,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category
    },
    { new: true }
  )

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: "Product doesn't exist" })
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, discountPercentage, stock, brand, category } = req.body

  if (!title || !description || !price || !brand || !category) {
    res.status(400)
    throw new Error('Please enter all required fields')
  }

  const product = await Product.create({
    title,
    description,
    price,
    discountPercentage,
    stock,
    brand,
    category
  })

  if (product) {
    res.status(200).json({
      message: 'Product was created successfully',
      product
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

module.exports = {
  getMultipleProducts,
  updateProduct,
  getProducts,
  getProduct,
  createProduct
}
