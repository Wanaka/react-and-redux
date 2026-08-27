import { useSelector } from 'react-redux'
import { useQuestions } from '../hooks/useQuestions'
import { useUsers } from '../hooks/useUsers'
import QuestionCard from '../components/QuestionCard'

function Dashboard() {
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

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>New Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {newQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            authorName={users[question.author]?.name}
            timestamp={question.timestamp}
          />
        ))}
      </div>

      <h2 style={{ marginTop: '40px' }}>Done</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {doneQuestions.map((question) => (
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
