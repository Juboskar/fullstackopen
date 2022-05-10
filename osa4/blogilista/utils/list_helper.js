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

module.exports = {
  dummy, totalLikes, favoriteBlog
}