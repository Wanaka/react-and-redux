import { useUsers } from '../hooks/useUsers'

function Leaderboard() {
  const { data: users, isLoading, isError } = useUsers()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load users.</p>

  const ranked = Object.values(users)
    .map((user) => ({
      ...user,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
      score: Object.keys(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.score - a.score)

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>User</th>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Answered</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Created</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((user, index) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee', backgroundColor: index === 0 ? '#e6f4ea' : 'transparent' }}>
              <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={user.avatarURL} alt={user.name} width={40} style={{ borderRadius: '50%' }} />
                <span>{user.name}</span>
              </td>
              <td style={{ padding: '12px', color: '#888', fontSize: '14px' }}>{user.id}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{user.answered}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{user.created}</td>
              <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
