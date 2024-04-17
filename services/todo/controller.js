const { addNewTodo, getTodos } = require('./service')
const schema = require('./schemas/todo')
const Ajv = require('ajv')
const ajv = new Ajv()

const createTodo = async (req, res) => {
  const todo = req.body
  const validate = ajv.compile(schema)
  const valid = validate(todo)
  if (!valid) return res.status(400).send({ message: 'todo is required and should be string', error: validate.errors })

  try {
    const data = await addNewTodo(todo)
    return res.status(200).send(data)
  } catch (error) {
    return res.status(error.code || 500).send({
      message: error.message,
      errorDetails: error
    })
  }
}

const getTodo = async (req, res) => {
  try {
    const todos = await getTodos()
    return res.status(200).send(todos)
  } catch (error) {
    res.status(500).send({
      message: error.message,
      errorDetails: error
    })
  }
}

module.exports = {
  createTodo,
  getTodo
}
