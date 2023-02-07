const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    _id: String,
    name: String,
    parent: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Category', categorySchema)
