const blogsRouter = require('express').Router()
const { result } = require('lodash')

const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    if (request.token === null) {
      return response.status(401).json({ error: 'not allowed' })
    }

    if (blog.title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    }

    if (blog.author === undefined) {
      return response.status(400).json({ error: 'author missing' })
    }

    if (blog.likes === undefined) {
      blog.likes = 0
    }


    const user = await User.findById(request.user)
    blog.user = user.id
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    return response.status(201).json(result)
  } catch (error) { next(error) }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.user)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json('not allowed')
    }
  } catch (error) { next(error) }

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