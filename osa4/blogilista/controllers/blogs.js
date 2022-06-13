const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',  { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
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

  // temporary way of finding user id
  const users = await User.find({})

  const userId = users[0]._id
  blog.user = userId
  const result = await blog.save()

  const user = await User.findById(userId)
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  catch (error) { next(error) }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
  } catch (error) { next(error) }
})

module.exports = blogsRouter