const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

const Todo = sequelize.define('Todo', {
  todo: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  }
})

module.exports = Todo
