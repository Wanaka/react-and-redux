import { useSelector } from 'react-redux'
import { Navigate, useSearchParams } from 'react-router-dom'

function GuestRoute({ children }) {
  const user = useSelector((state) => state.login.user)
  const [searchParams] = useSearchParams()

  if (user) {
    const next = searchParams.get('next') || '/'
    return <Navigate to={next} replace />
  }

  return children
}

export default GuestRoute
