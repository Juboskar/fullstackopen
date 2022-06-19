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

  const path = window.location.pathname
  const toggleWhenUsersSelected = {
    paddingTop: 10,
    border: path.includes('/users') ? 0 : 'solid 1px black',
  }
  const untoggleWhenUsersSelected = {
    padding: 10,
    border: path.includes('/users') ? 'solid 1px black' : 0,
  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          backgroundColor: 'lightgreen',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          border: '1px solid',
        }}
      >
        <div
          className="container"
          style={{
            padding: 10,
          }}
        >
          <Link to={'/'} style={toggleWhenUsersSelected}>
            blogs&nbsp;
          </Link>
          <Link to={'/users/'} style={untoggleWhenUsersSelected}>
            users&nbsp;
          </Link>
          <p style={{ marginBottom: 0 }}>
            <b> {user.name} logged in&nbsp; </b>
          </p>
          <button className="btn btn-sm btn-outline-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
