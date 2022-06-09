const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = require('../utils/test_data')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()
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

  await api
    .post('/api/blogs')
    .send(newBlog)
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

  await api
    .post('/api/blogs')
    .send(newBlog)
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

  await api
    .post('/api/blogs')
    .send(newBlog)
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

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

})

test('a blog can be deleted', async () => {
  await api.delete('/api/blogs/5a422bc61b54a676234d17fc')
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length-1)
})

afterAll(() => {
  mongoose.connection.close()
})