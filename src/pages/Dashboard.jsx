import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuestions } from '../hooks/useQuestions'
import { useUsers } from '../hooks/useUsers'
import QuestionCard from '../components/QuestionCard'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('unanswered')
  const user = useSelector((state) => state.login.user)
  const { data: questions, isLoading: loadingQuestions } = useQuestions()
  const { data: users, isLoading: loadingUsers } = useUsers()

  if (loadingQuestions || loadingUsers) return <p>Loading...</p>

  const questionList = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)

  const newQuestions = questionList.filter(
    (q) => !q.optionOne.votes.includes(user.id) && !q.optionTwo.votes.includes(user.id)
  )

  const doneQuestions = questionList.filter(
    (q) => q.optionOne.votes.includes(user.id) || q.optionTwo.votes.includes(user.id)
  )

  const tabStyle = (tab) => ({
    padding: '10px 24px',
    border: 'none',
    borderBottom: activeTab === tab ? '3px solid green' : '3px solid transparent',
    background: 'none',
    fontWeight: activeTab === tab ? 'bold' : 'normal',
    fontSize: '1rem',
    cursor: 'pointer',
    color: activeTab === tab ? 'green' : '#555',
  })

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '24px' }}>
        <button style={tabStyle('unanswered')} onClick={() => setActiveTab('unanswered')}>
          Unanswered
        </button>
        <button style={tabStyle('answered')} onClick={() => setActiveTab('answered')}>
          Answered
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activeTab === 'unanswered' && newQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            authorName={users[question.author]?.name}
            timestamp={question.timestamp}
          />
        ))}
        {activeTab === 'answered' && doneQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            authorName={users[question.author]?.name}
            timestamp={question.timestamp}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
