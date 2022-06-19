import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, commentBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  const [comment, setComment] = useState('')

  const handleLike = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog({ comment, id: blog.id }))
    setComment('')
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>{blog.likes} likes</div>
      <button id="likeButton" onClick={handleLike}>
        like
      </button>
      <div>Added by {blog.user.name}</div>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>

      <form onSubmit={handleComment}>
        <div>
          comment:
          <input
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">comment</button>
      </form>
    </div>
  )
}

export default BlogView
