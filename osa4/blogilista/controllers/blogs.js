const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }

  if (blog.author === undefined) {
    return response.status(400).json({ error: 'author missing' })
  }

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  catch (error) { next(error) }
})

module.exports = blogsRouter