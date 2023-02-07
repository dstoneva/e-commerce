const mongoose = require('mongoose')
const validator = require('validator')
const userGroups = require('../config/userGroups')

const userSchema = mongoose.Schema(
  {
    userGroup: {
      type: Number,
      required: false,
      default: userGroups.customer,
    },
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error('Please enter a valid email address')
        }
      },
    },
    phone: {
      type: String,
      required: [true, 'Please enter your phone'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
