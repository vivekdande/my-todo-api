const express = require('express')
const todoRoutes = require('./todo/routes')
const router = express.Router()

router.use(
  todoRoutes
)

module.exports = router
