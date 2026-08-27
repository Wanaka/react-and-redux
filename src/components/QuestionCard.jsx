import { useNavigate } from 'react-router-dom'

function QuestionCard({ id, authorName, timestamp }) {
  const navigate = useNavigate()
  const date = new Date(timestamp).toLocaleDateString()

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <span style={{ color: '#888', fontSize: '14px' }}>{date}</span>
      <span>{authorName}</span>
      <button
        onClick={() => navigate(`/questions/${id}`)}
        style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', marginLeft: 'auto' }}
      >
        Show
      </button>
    </div>
  )
}

export default QuestionCard
