const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/UserModel')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '365d' })
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body

  if (!name || !email || !password || !phone) {
    res.status(400)
    throw new Error('Please enter all fields')
  }

  const isStrongPassword = password.length >= 8

  const userExists = (await User.findOne({ email })) || (await User.findOne({ phone }))

  if (!isStrongPassword) {
    res.status(400)
    throw new Error('Your password is weak! It should be minimum 8 characters')
  }

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  })

  if (user) {
    res.status(200).json({
      message: 'User was created successfully',
      user,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      message: `Welcome back, ${user.name}!`,
      user,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  res.json({ user })
})

const updateMe = asyncHandler(async (req, res) => {
  const { phone = req.user.phone, name = req.user.name } = req.body

  const userWithSamePhone = await User.findOne({ phone })

  if (userWithSamePhone && userWithSamePhone._id.toString() !== req.user._id.toString()) {
    res.status(400)
    throw new Error('User with same phone exists')
  } else {
    const user = await User.findByIdAndUpdate(req.user._id, { phone, name }, { new: true })
    res.json({ user, message: 'Profile was updated' })
  }
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password')

  if (user) {
    res.json({ user, message: `${user.email} is affiliated with this profile` })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateMyActiveStatus = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { active: !req.user.active })
  res.json({ message: `Your account is now ${req.user.active ? 'deactivated' : 'activated'}` })
})

const getUsers = asyncHandler(async (req, res) => {
  const { page: pageFromParams, itemsPerPage = 10 } = req.query

  const page = +pageFromParams >= 1 ? +pageFromParams - 1 : 0

  const users = await User.find()
    .sort({ createdAt: 'desc' })
    .limit(+itemsPerPage)
    .skip(+itemsPerPage * page)
    .select('-password')

  const total = await User.find().countDocuments()

  if (users.length) {
    res.json({
      result: users,
      page,
      productsPerPage: +itemsPerPage,
      total,
      pages: total < +itemsPerPage ? 1 : Math.ceil(total / +itemsPerPage),
    })
  } else {
    res.status(404).json({ result: [], page, productsPerPage: +itemsPerPage, message: 'No users found' })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body

  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(400)
    throw new Error('Invalid request')
  }

  const isStrongPassword = newPassword.length >= 6
  const isPasswordTheSame = await bcrypt.compare(newPassword, user.password)

  if (!isStrongPassword) {
    res.status(400)
    throw new Error('Your password is weak! It should be minimum 6 characters')
  }

  if (isPasswordTheSame) {
    res.status(400)
    throw new Error('Password cannot be the same as the old one')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)

  await user.updateOne({
    password: hashedPassword,
  })

  res.json({ message: 'Password was changed successfully, you can login with your new password' })
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUser,
  updateMe,
  updateMyActiveStatus,
  getUsers,
  resetPassword,
}
