const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/error')
const connectDatabase = require('./config/db')
require('colors')
require('dotenv').config()

connectDatabase()
const PORT = process.env.PORT || 8080
const API_ROUTE = process.env.API_ROUTE || '/api'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(`${API_ROUTE}/user`, require('./routes/userRoutes'))
app.use(`${API_ROUTE}/products`, require('./routes/productRoutes'))
app.use(`${API_ROUTE}/categories`, require('./routes/categoryRoutes'))
app.use(`${API_ROUTE}/checkouts`, require('./routes/checkoutRoutes'))
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
