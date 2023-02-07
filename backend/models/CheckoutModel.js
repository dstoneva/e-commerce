const mongoose = require('mongoose')

const checkoutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: Number
      }
    ],
    address: {
      fullName: String,
      phone: String,
      email: String,
      zip: String,
      address1: String,
      address2: String,
      country: String
    },
    payment: {
      type: {
        type: String,
        enum: ['card', 'delivery', 'paypal'],
        default: 'card'
      },
      card: {
        number: Number,
        name: String,
        epxiryDate: Date,
        ccv: Number
      },
      details: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Checkout', checkoutSchema)
