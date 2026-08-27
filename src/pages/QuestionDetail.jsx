import { useParams, Navigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuestions } from '../hooks/useQuestions'
import { useUsers } from '../hooks/useUsers'
import { useVote } from '../hooks/useVote'

function QuestionDetail() {
  const { id } = useParams()
  const currentUser = useSelector((state) => state.login.user)
  const { data: questions, isLoading: loadingQuestions } = useQuestions()
  const { data: users, isLoading: loadingUsers } = useUsers()
  const { mutate: vote } = useVote()

  if (loadingQuestions || loadingUsers) return <p>Loading...</p>

  const question = questions[id]

  if (!question) return <Navigate to="/404" />

  const author = users[question.author]

  const votesOne = question.optionOne.votes.length
  const votesTwo = question.optionTwo.votes.length
  const totalVotes = votesOne + votesTwo

  const hasVoted =
    question.optionOne.votes.includes(currentUser.id) ||
    question.optionTwo.votes.includes(currentUser.id)

  const votedOne = question.optionOne.votes.includes(currentUser.id)
  const votedTwo = question.optionTwo.votes.includes(currentUser.id)

  const percentOne = totalVotes === 0 ? 0 : Math.round((votesOne / totalVotes) * 100)
  const percentTwo = totalVotes === 0 ? 0 : Math.round((votesTwo / totalVotes) * 100)

  function handleVote(answer) {
    vote({ authedUser: currentUser.id, qid: id, answer })
  }

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'left' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          ← Back
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <img src={author?.avatarURL} alt={author?.name} width={120} style={{ borderRadius: '50%' }} />
        <p style={{ color: '#888', margin: 0 }}>Asked by: {author?.name}</p>
      </div>
      <h1 style={{ fontSize: '2rem', margin: '16px 0 24px' }}>Would you rather</h1>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '24px', backgroundColor: votedOne ? '#e6f4ea' : 'transparent' }}>
          <p>{question.optionOne.text}</p>
          {hasVoted ? (
            <div style={{ marginTop: '12px', color: '#555' }}>
              <p>{votesOne} {votesOne === 1 ? 'vote' : 'votes'}</p>
              <p>{percentOne}% of votes</p>
            </div>
          ) : (
            <button
              onClick={() => handleVote('optionOne')}
              style={{ marginTop: '12px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}
            >
              Vote
            </button>
          )}
        </div>

        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '24px', backgroundColor: votedTwo ? '#e6f4ea' : 'transparent' }}>
          <p>{question.optionTwo.text}</p>
          {hasVoted ? (
            <div style={{ marginTop: '12px', color: '#555' }}>
              <p>{votesTwo} {votesTwo === 1 ? 'vote' : 'votes'}</p>
              <p>{percentTwo}% of votes</p>
            </div>
          ) : (
            <button
              onClick={() => handleVote('optionTwo')}
              style={{ marginTop: '12px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}
            >
              Vote
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionDetail
