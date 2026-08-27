import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '8px' }}>
      <h1 style={{ fontSize: '8rem', margin: '0 0 32px 0', fontWeight: 'bold', letterSpacing: '-4px' }}>404</h1>
      <h2 style={{ margin: 0, fontWeight: 'normal' }}>Page not found</h2>
      <p style={{ color: '#888', margin: '4px 0 24px' }}>The page you are looking for does not exist.</p>
      <Link
        to="/"
        style={{ backgroundColor: 'green', color: 'white', textDecoration: 'none', padding: '10px 24px', borderRadius: '6px' }}
      >
        Go home
      </Link>
    </div>
  )
}

export default NotFound
