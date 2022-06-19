import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { login } from '../reducers/userReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(
      login({
        username,
        password,
      })
    )
    if (loggedIn !== null) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedIn))
      setUsername('')
      setPassword('')
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
