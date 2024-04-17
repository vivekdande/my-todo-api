const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const sequelize = require('./db/dbconfig')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const routes = require('./services/routes')
const cookieParser = require('cookie-parser')
const compression = require('compression')

const app = express()

// Sync the model with the database
sequelize.sync().then(() => {
  console.log('Database synchronized')
})

app.options('*', cors())

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

// set response headers
app.use(helmet())

// Limit request from user api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour'
})

app.use(limiter)

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ limit: '20kb' }))

// set response headers
app.use(helmet())

app.use(cookieParser())

// sanitize against xss
app.use(xss())

// Prevent Parameter pollution/ duplicate paramaters in the url as query params
app.use(
  hpp({
    whitelist: ['duration', 'price']
  })
)

app.use(compression())

app.get('/api/info', (req, res) => {
  res.status(200).send({ message: 'Todo Application v1.0.0' })
})

app.use('/api/v1', routes)

app.on('error', onError)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors
  switch (error.code) {
    case 'EACCES':
      console.error(`Port: ${3000} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`Port: ${3000} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

module.exports = app
