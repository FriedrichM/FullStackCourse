const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)


let token =''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await api.post('/api/users').send({
    name: 'testuser',
    username: 'testuser',
    password: 'testpassword'
  })
  token=(await api.post('/api/login').send({
    username: 'testuser',
    password: 'testpassword'
  })).body.token
  await api.post('/api/blogs')
    .set('Authorization','bearer '+token)
    .send({
      title:'setup',
      author:'setup',
      url:'setup',
      likes:1337
    })
})

describe('blogs api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blogs id property is present', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
  test('post adds a blog', async () => {
    const response = await api.get('/api/blogs')
    const oldlength = response.body.length
    await api.post('/api/blogs')
      .set('Authorization','bearer '+token)
      .send({
        title:'test3',
        author:'test3',
        url:'url3',
        likes:5
      })

    const newblogs = await api.get('/api/blogs')
    const contents = newblogs.body.map(n => n.title)
    expect(newblogs.body.length).toBe(oldlength+1)
    expect(contents).toContain('test3')
  })
  test('blogs likes is 0 by default', async () => {
    const blogwithoutlikes={
      title:'testabc',
      author:'test3',
      url:'url3',
    }
    await api.post('/api/blogs').set('Authorization','bearer '+token).send(blogwithoutlikes)
    const response = await api.get('/api/blogs')

    expect(response.body.find(blog => blog.title==='testabc').likes).toBe(0)
  })

  test('post returns 400 when not title or url', async () => {
    const blogwithouttitle={
      author:'test3',
      url:'',
    }
    await api.post('/api/blogs').set('Authorization','bearer '+token).send(blogwithouttitle).expect(400)
  })

  test('no token -> no blog added ', async () => {
    const response = await api.get('/api/blogs')
    const oldlength = response.body.length
    await api.post('/api/blogs')
      .send({
        title:'test3',
        author:'test3',
        url:'url3',
        likes:5
      }).expect(401)
    const newblogs = await api.get('/api/blogs')
    expect(newblogs.body.length).toBe(oldlength)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
