import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { resetUser } from '../reducers/userReducer'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = () => {
    dispatch(resetUser())
    navigate('/')
  }

  return (
    <div>
      <Link to={'/'} style={{ display: 'inline' }}>
        blogs&nbsp;
      </Link>
      <Link to={'/users/'} style={{ display: 'inline' }}>
        users&nbsp;
      </Link>
      <p style={{ display: 'inline' }}>{user.name} logged in&nbsp;</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default NavBar
