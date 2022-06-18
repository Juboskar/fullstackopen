import { useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {
  setErrorNotification,
  setInfoNotification,
} from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlog,
  createBlog,
  initializeBlogs,
  likeBlog,
} from './reducers/blogReducer'
import { setUser, resetUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON)
      dispatch(setUser(u))
    }
  }, [])

  const login = (u) => {
    if (u !== null) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(u))
      dispatch(setUser(u))
    } else {
      dispatch(setErrorNotification('wrong credentials', 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(resetUser())
  }

  const createNewBlog = async (newBlog) => {
    try {
      newBlog.user = { username: user.username, name: user.name }
      dispatch(createBlog(newBlog))

      blogFormRef.current.toggleVisibility()
      dispatch(
        setInfoNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          5000
        )
      )
    } catch (error) {
      dispatch(setErrorNotification('missing info', 5000))
    }
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    window.confirm(`delete ${blog.title} by ${blog.author}`)
    dispatch(deleteBlog(blog.id))
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login login={login} />
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <p> {user.username} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
        <Togglable buttonLabel="create new" ref={blogFormRef}>
          <NewBlogForm createBlog={createNewBlog} />
        </Togglable>
      </div>
    )
  }
}

export default App
