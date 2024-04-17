const { addNewTodo, getTodos } = require('./service');

describe('Todo services', () => {

    it('should create a todo', async () => {
        const todo = {
            todo: "Complete training",
            status: "In progress"
        };
        const createdTodo = await addNewTodo(todo);
        expect(createdTodo.todo).toBe(todo.todo);
        expect(createdTodo.status).toBe(todo.status);
        expect(createdTodo).toHaveProperty('createdAt');
        expect(createdTodo).toHaveProperty('updatedAt');
        expect(createdTodo).toHaveProperty('id');
    })
    it('should return all todos', async () => {
        const allTodos = await getTodos();

        expect(allTodos[0]).toHaveProperty('createdAt');
        expect(allTodos[0]).toHaveProperty('updatedAt');
        expect(allTodos[0]).toHaveProperty('id');
    })
})