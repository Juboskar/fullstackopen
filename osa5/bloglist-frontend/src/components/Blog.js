import { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const removeButtonStyle = { display: blog.user.name === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    await blogService.update(updatedBlog, blog.id)
    const i = blogs.findIndex((obj => obj.id === blog.id))
    blogs[i].likes = blogs[i].likes + 1
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    setBlogs([...blogs])
  }

  const handleDelete = async () => {
    window.confirm(`delete ${blog.title} by ${blog.author}`)
    await blogService.deleteBlog(blog.id)
    const i = blogs.findIndex((obj => obj.id === blog.id))
    blogs.splice(i, 1)
    setBlogs([...blogs])
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex' }}>
        <div>{blog.title} {blog.author} </div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div style={{ display: 'flex' }}>
          <div>{blog.likes} likes</div>
          <button onClick={handleLike} >like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={removeButtonStyle} onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

export default Blog