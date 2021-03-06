const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = require('../utils/test_data')

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const testUser = new User({
    username: 'testaaja',
    name: 'Testi User',
    passwordHash: await bcrypt.hash('salasana', 10),
  })
  await testUser.save()

  const user = await User.find({})
  userId = user[0].id

  for (let i = 0; i < initialBlogs.length; i++) {
    let blogObject = new Blog(initialBlogs[i])
    blogObject.user = userId
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Example Writer',
    url: 'http://example.com',
    likes: 42
  }


  const resp = await api
    .post('/api/login')
    .send({ username: 'testaaja', password: 'salasana' })
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + resp.body.token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'Test Title'
  )
})

test('likes is 0 when not defined', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Example Writer',
    url: 'http://example.com'
  }

  const resp = await api
    .post('/api/login')
    .send({ username: 'testaaja', password: 'salasana' })
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + resp.body.token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const content = response.body.filter(r => r.title === 'Test Title')

  expect(content[0].likes).toBe(0)
})

test('a blog with missing title can not be added', async () => {
  const newBlog = {
    author: 'Example Writer',
    url: 'http://example.com',
    likes: 42
  }

  const resp = await api
    .post('/api/login')
    .send({ username: 'testaaja', password: 'salasana' })
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + resp.body.token)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

})


test('a blog with missing author can not be added', async () => {
  const newBlog = {
    title: 'Test Title',
    url: 'http://example.com',
    likes: 42
  }

  const resp = await api
    .post('/api/login')
    .send({ username: 'testaaja', password: 'salasana' })
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + resp.body.token)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

})

test('a blog can be deleted', async () => {

  const resp = await api
    .post('/api/login')
    .send({ username: 'testaaja', password: 'salasana' })
    .expect('Content-Type', /application\/json/)

  await api.delete('/api/blogs/5a422bc61b54a676234d17fc')
    .set('Authorization', 'bearer ' + resp.body.token)
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Example Writer',
    url: 'http://example.com',
    likes: 42
  }

  const resp = await api
    .post('/api/login')
    .send({ username: 'testaaja', password: 'salasana' })
    .expect('Content-Type', /application\/json/)

  await api.put('/api/blogs/5a422bc61b54a676234d17fc')
    .send(newBlog)
    .set('Authorization', 'bearer ' + resp.body.token)
    .expect(200)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length)
  expect(contents).toContain(
    'Test Title'
  )
})

test('a blog cannot be added without token', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Example Writer',
    url: 'http://example.com',
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)

})

afterAll(() => {
  mongoose.connection.close()
})