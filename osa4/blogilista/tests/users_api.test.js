const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/list_helper')

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'root',
      name: 'root',
      password: await bcrypt.hash('sekret', 10)
    })
    const user2 = new User({
      username: 'testaaja',
      name: 'Testi User',
      password: await bcrypt.hash('salasana', 10),
    })

    await user.save()
    await user2.save()

  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testaaja 2',
      name: 'Testi User 2',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a existing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testaaja',
      name: 'Testi User',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('creation fails with a too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'te',
      name: 'Testi User 2',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('creation fails with a too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testaaja 2',
      name: 'Testi User 2',
      password: 's',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('creation fails if username missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Testi User 2',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('creation fails if password missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testaaja 2',
      name: 'Testi User 2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })
})