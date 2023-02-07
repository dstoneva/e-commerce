const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const userGroups = require('../config/userGroups')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id).select('-password')

      req.user = user

      if (user.banned) {
        res.status(401)
        throw new Error('Unauthorized')
      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Unauthorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Unauthorized')
  }
})

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.userGroup === userGroups.admin) {
    try {
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Unauthorized')
    }
  } else {
    res.status(401)
    throw new Error('Unauthorized')
  }
})

const isActive = asyncHandler(async (req, res, next) => {
  if (req.user.active) {
    try {
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Unauthorized')
    }
  } else {
    res.status(401)
    throw new Error('Your account is deactivated. You need to reactivate it to complete this operation.')
  }
})

module.exports = { protect, isAdmin, isActive }
