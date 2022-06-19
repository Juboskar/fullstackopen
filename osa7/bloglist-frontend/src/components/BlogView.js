import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
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
      <button id="likeButton" onClick={() => handleLike(blog)}>
        like
      </button>
      <div>Added by {blog.user.name}</div>
    </div>
  )
}

export default BlogView
