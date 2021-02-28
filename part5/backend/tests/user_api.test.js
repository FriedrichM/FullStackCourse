  const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
beforeEach(async () => {
  await User.deleteMany({})

})


describe('user api', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('users id property is present', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
  test('post adds a users', async () => {
    const response = await api.get('/api/users')
    const oldlength = response.body.length
    await api.post('/api/users').send({
      username:'test3',
      name:'test3',
      password:'testabc',
    })

    const newusers = await api.get('/api/users')
    const contents = newusers.body.map(n => n.username)
    expect(newusers.body.length).toBe(oldlength+1)
    expect(contents).toContain('test3')
  })

  test('post returns 400 when not username too short', async () => {
    const oldlength = (await api.get('/api/users')).body.length
    const blogwithouttitle={
      username:'ab',
      name:'test3',
      password:'ab',
    }
    const newusers = await api.get('/api/users')
    expect(newusers.body.length).toBe(oldlength)
    const response = await api.post('/api/users').send(blogwithouttitle)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('password minimum length 3')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
