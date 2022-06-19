import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector((state) => state.users)
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <td></td>
        <td>
          <b>blogs created</b>
        </td>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.username}</td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default UserList
