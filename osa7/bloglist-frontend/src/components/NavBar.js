import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { resetUser } from '../reducers/userReducer'

const NavBar = ({ name }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(resetUser())
  }

  return (
    <div>
      <Link to={'/'} style={{ display: 'inline' }}>
        blogs&nbsp;
      </Link>
      <Link to={'/users/'} style={{ display: 'inline' }}>
        users&nbsp;
      </Link>
      <p style={{ display: 'inline' }}>{name} logged in&nbsp;</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default NavBar
