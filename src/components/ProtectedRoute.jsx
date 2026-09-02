import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.login.user)
  const loggedOut = useSelector((state) => state.login.loggedOut)
  const location = useLocation()

  if (!user) {
    if (loggedOut) return <Navigate to="/login" replace />
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} />
  }

  return children
}

export default ProtectedRoute
