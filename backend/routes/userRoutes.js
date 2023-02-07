const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  getMe,
  getUser,
  updateMe,
  updateMyActiveStatus,
  getUsers,
  resetPassword,
} = require('../controller/userController')
const { protect, isAdmin } = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/get-all', protect, isAdmin, getUsers)
router.get('/:userId', protect, isAdmin, getUser)
router.put('/', protect, updateMe)
router.put('/active-status', protect, updateMyActiveStatus)
router.put('/change-password', protect, resetPassword)

module.exports = router
