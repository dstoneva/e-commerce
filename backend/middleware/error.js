const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  const productionResponse = {
    message: err.message
  }

  const developmentResponse = {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  }

  res.json(process.env.NODE_ENV === 'production' ? productionResponse : developmentResponse)
}

module.exports = {
  errorHandler
}
