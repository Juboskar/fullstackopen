import { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import {
  setErrorNotification,
  setInfoNotification,
} from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = (user) => {
    if (user !== null) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
    } else {
      dispatch(setErrorNotification('wrong credentials', 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      const updatedBlog = await blogService.create(newBlog)
      console.log(updatedBlog)
      updatedBlog.user = { username: user.username, name: user.name }
      setBlogs(blogs.concat(updatedBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setInfoNotification(
          `a new blog ${updatedBlog.title} by ${updatedBlog.author} added`,
          5000
        )
      )
    } catch (error) {
      dispatch(setErrorNotification('missing info', 5000))
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    await blogService.update(updatedBlog, blog.id)
    const i = blogs.findIndex((obj) => obj.id === blog.id)
    blogs[i].likes = blogs[i].likes + 1
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    setBlogs([...blogs])
  }

  const handleDelete = async (blog) => {
    window.confirm(`delete ${blog.title} by ${blog.author}`)
    await blogService.deleteBlog(blog.id)
    const i = blogs.findIndex((obj) => obj.id === blog.id)
    blogs.splice(i, 1)
    setBlogs([...blogs])
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
            setBlogs={setBlogs}
            blogs={blogs}
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
        <Togglable buttonLabel="create new" ref={blogFormRef}>
          <NewBlogForm createBlog={createBlog} />
        </Togglable>
      </div>
    )
  }
}

export default App
