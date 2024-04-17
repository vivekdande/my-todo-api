const express = require('express')
const router = express.Router()
const { getTodo, createTodo } = require('./controller')

router.get('/todo', getTodo)
router.post('/todo', createTodo)

module.exports = router
