import { useState } from "react"

const Blog = ({ blog }) => {
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

  const toggleVisibility = () => {
    setVisible(!visible)
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
        <div>{blog.likes} likes</div>
        <div>{blog.user.name}</div>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog