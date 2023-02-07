const asyncHandler = require('express-async-handler')

const Category = require('../models/CategoryModel')

const getCategories = asyncHandler(async (req, res) => {
  const parentCategories = await Category.find({ parent: null })
  const nestedCategories = await Category.find({ parent: { $ne: null } })

  const total = await Category.find().countDocuments()

  let result = []
  for (let i = 0; i < parentCategories.length; i++) {
    const parentCategory = parentCategories[i]._id
    const children = nestedCategories.filter((nestedCategory) => nestedCategory.parent === parentCategory)
    result.push({ ...parentCategories[i].toObject(), parent: null, children })
  }

  if (parentCategories.length) {
    res.json({
      result,
      total
    })
  } else {
    res.status(200).json({ result: [], message: 'No categories found' })
  }
})

const getCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  const category = await Category.findById(categoryId)
  const isNestedCategory = await Category.findOne({ parent: categoryId })

  if (!isNestedCategory) {
    res.json({ ...category.toObject(), parent: null })
  } else {
    const nestedCategories = await Category.find({ parent: categoryId })
    const children = nestedCategories.filter((nestedCategory) => nestedCategory.parent === categoryId)

    res.json({ ...category.toObject(), parent: null, children })
  }

  if (!category) {
    res.status(404).json({ message: 'Category not found' })
  }
})

module.exports = {
  getCategories,
  getCategory
}
