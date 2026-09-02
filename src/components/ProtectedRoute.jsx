import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.login.user)
  const location = useLocation()

  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} />

  return children
}

export default ProtectedRoute
