import { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
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
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
    } else {
      setMessage('wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = (newBlog) => {
    if (newBlog !== null) {
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      setMessage('missing info')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} error={error} />
        <Login login={login}
        />
      </div>)
  } else {
    return (
      <div>
        <Notification message={message} error={error} />
        <p> {user.username} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>blogs</h2>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
          )
        }
        <Togglable buttonLabel="create new" ref={blogFormRef}>
          <NewBlogForm createBlog={createBlog} />
        </Togglable>
      </div >
    )
  }
}

export default App
