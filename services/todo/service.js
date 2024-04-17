const { Todo } = require('../../db/models')

const getTodos = () => {
  return Todo.findAll()
}

/**
 * @method to create new todo
 * @param { Object } data to create todo
 * @returns todo
 */
const addNewTodo = async (data) => {
  const todo = await Todo.create({ ...data })

  return todo
}

module.exports = {
  getTodos,
  addNewTodo
}
