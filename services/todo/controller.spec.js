const { createTodo, getTodo } = require('./controller')

const mockRequest = () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    return req
}

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    res.cookie = jest.fn().mockReturnValue(res)
    return res
}

describe('Todo controller', () => {
    let req
    let res

    beforeEach(() => {
        req = mockRequest()
        res = mockResponse()
    })

    afterEach(() => {
        req = null
        res = null
    })

    it('should create a todo', async () => {
        req.body = {
            todo: 'Complete training',
            status: 'In progress'
        }
        await createTodo(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    })

    it('should return a todo', async () => {
        await getTodo(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    })
})
