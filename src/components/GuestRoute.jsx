import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function GuestRoute({ children }) {
  const user = useSelector((state) => state.login.user)

  if (user) return <Navigate to="/" />

  return children
}

export default GuestRoute
