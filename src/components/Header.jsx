import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { logoutUser } from '../store/loginSlice'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.login.user)

  function handleLogout() {
    dispatch(logoutUser())
    navigate('/login')
  }

  const navStyle = { textDecoration: 'none', color: 'inherit' }
  const activeStyle = { fontWeight: 'bold', textDecoration: 'underline' }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={user?.avatarURL} alt={user?.name} width={36} style={{ borderRadius: '50%' }} />
        <span>{user?.name}</span>
      </div>
      <nav style={{ display: 'flex', gap: '24px' }}>
        <NavLink to="/" end style={({ isActive }) => isActive ? { ...navStyle, ...activeStyle } : navStyle}>Home</NavLink>
        <NavLink to="/leaderboard" style={({ isActive }) => isActive ? { ...navStyle, ...activeStyle } : navStyle}>Leaderboard</NavLink>
        <NavLink to="/add" style={({ isActive }) => isActive ? { ...navStyle, ...activeStyle } : navStyle}>New</NavLink>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Header
