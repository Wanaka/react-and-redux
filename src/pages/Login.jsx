import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/loginSlice'
import { useUsers } from '../hooks/useUsers'

function Login() {
  const dispatch = useDispatch()
  const { data: users, isLoading, isError } = useUsers()

  if (isLoading) return <p>Loading users...</p>
  if (isError) return <p>Failed to load users.</p>

  const userList = Object.values(users)

  function handleSelect(user) {
    dispatch(loginUser({ id: user.id, name: user.name, avatarURL: user.avatarURL }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {userList.map((user) => (
          <Link
            key={user.id}
            to="/"
            onClick={() => handleSelect(user)}
            style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
          >
            <img src={user.avatarURL} alt={user.name} width={80} />
            <p>{user.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Login
