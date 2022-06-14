import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: likes + 1
    }
    setLikes(updatedBlog.likes)
    blogService.update(updatedBlog, blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex' }}>
        <div>{blog.title} {blog.author} </div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div style={{ display: 'flex' }}>
          <div>{likes} likes</div>
          <button onClick={handleLike} >like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog