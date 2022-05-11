const listHelper = require('../utils/list_helper')
const blogs = require('../test_data')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('max likes', () => {
  test('blog with maximum likes equals right object', () => {
    const favorite = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
    expect(listHelper.favoriteBlog(blogs)).toEqual(favorite)
  })
})

describe('most common', () => {
  test('most common blog equals right object', () => {
    const mostCommon = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(listHelper.mostBlogs(blogs)).toEqual(mostCommon)
  })
})

describe('most likes', () => {
  test('most liked blog equals right object', () => {
    const mostLikes = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(listHelper.mostLikes(blogs)).toEqual(mostLikes)
  })
})