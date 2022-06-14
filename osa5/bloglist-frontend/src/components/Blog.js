import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleDelete, handleLike }) => {
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
  const removeButtonStyle = { display: blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex' }} className="shownContent">
        <div style={{ display: 'flex' }}>{blog.title}&nbsp;</div>
        <div>{blog.author}&nbsp;</div>
        <div style={hideWhenVisible}>
          <button id="viewButton" onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>
      <div style={showWhenVisible} className="hiddenContent">
        <div>{blog.url}</div>
        <div style={{ display: 'flex' }}>
          <div>{blog.likes}&nbsp;</div><div>likes&nbsp;</div>
          <button id="likeButton" onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button id="removeButton" style={removeButtonStyle} onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
}

export default Blog