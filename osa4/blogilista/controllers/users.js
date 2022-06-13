const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const blogs = await User.find({}).populate('blogs',  { url: 1, title: 1, author: 1, id: 1 })
  response.json(blogs)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username === undefined) {
    return response.status(400).json({ error: 'username missing' })
  }
  if (name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  if (password === undefined) {
    return response.status(400).json({ error: 'password missing' })
  }
  if (username.length < 3) {
    return response.status(400).json({ error: 'username too short' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password too short' })
  }

  const existUsername = await User.findOne({ username: username })
  if (existUsername !== null) {
    return response.status(400).json({ error: 'username already exists' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter