const blogsRouter = require('express').Router()
const { result } = require('lodash')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const token = getTokenFrom(request)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
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


    const user = await User.findById(decodedToken.id)
    blog.user = user.id
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    return response.status(201).json(result)
  } catch (error) { next(error) }
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