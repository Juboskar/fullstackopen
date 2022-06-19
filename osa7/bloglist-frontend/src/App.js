import { useRef, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import Togglable from './components/Togglable'
import NavBar from './components/NavBar'
import {
  setErrorNotification,
  setInfoNotification,
} from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON)
      dispatch(setUser(u))
    }
  }, [])

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

  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <Login />
      </div>
    )
  } else {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Notification />
          <h1>Blogs</h1>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <BlogList />
                  <Togglable buttonLabel="create new" ref={blogFormRef}>
                    <NewBlogForm createBlog={createNewBlog} />
                  </Togglable>
                </div>
              }
            />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App
