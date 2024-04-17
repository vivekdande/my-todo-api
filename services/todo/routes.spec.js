const request = require('supertest');
const routes = require('./routes');
const app = require('../../app')

describe('Testing todo router', () => {
  test('Get todo', async () => {
    await  request(app.use(routes))
      .get('/todo')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThan(0);
      })
  });

  test('create todo', async () => {
    await  request(app.use(routes))
      .post('/todo')
      .send({
        "todo": "Complete training",
        "status": "In progress"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('todo');
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body).toHaveProperty('id');
      })
  });
});