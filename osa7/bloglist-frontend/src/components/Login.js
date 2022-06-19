import loginService from '../services/login'
import { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { setUser } from '../reducers/userReducer'
import { setErrorNotification } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const login = (u) => {
    if (u !== null) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(u))
      dispatch(setUser(u))
    } else {
      dispatch(setErrorNotification('wrong credentials', 5000))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      login(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      login(null)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
