const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return Object.keys(blogs).reduce((sum, key) => {
    return sum + blogs[key].likes
  }, 0)
}

module.exports = {
  dummy, totalLikes
}