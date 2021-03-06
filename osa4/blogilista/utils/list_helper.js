const lodash = require('lodash')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return Object.keys(blogs).reduce((sum, key) => {
    return sum + blogs[key].likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs[Object.keys(blogs).reduce((a, b) => {
    return (blogs[a].likes > blogs[b].likes) ? a : b
  })]
}

const mostBlogs = (blogs) => {
  const blogAuthors = lodash.map(blogs, 'author')
  const mostCommon = lodash.chain(blogAuthors).countBy()
    .toPairs().max(lodash.last).head().value()
  const appearances = lodash.countBy(blogs, 'author')
  return {
    'author': mostCommon,
    'blogs': appearances[mostCommon]
  }
}

const mostLikes = (blogs) => {
  const mostLikes = lodash(blogs).groupBy('author').map((objs, key) => ({
    'author': key,
    'likes': lodash.sumBy(objs, 'likes')
  }))
    .value()

  return lodash.maxBy(mostLikes, 'likes')
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, usersInDb
}