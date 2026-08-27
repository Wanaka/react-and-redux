import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAddQuestion } from '../hooks/useAddQuestion'

function NewQuestion() {
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const currentUser = useSelector((state) => state.login.user)
  const { mutate: addQuestion } = useAddQuestion()
  const navigate = useNavigate()

  const isDisabled = optionOne.trim() === '' || optionTwo.trim() === ''

  function handleSubmit(e) {
    e.preventDefault()
    addQuestion(
      { optionOneText: optionOne, optionTwoText: optionTwo, author: currentUser.id },
      { onSuccess: () => navigate('/') }
    )
  }

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Would you rather</h1>
      <p style={{ color: '#888' }}>Create your own poll</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="optionOne">Option One</label>
          <input
            id="optionOne"
            type="text"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            placeholder="Enter option one"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="optionTwo">Option Two</label>
          <input
            id="optionTwo"
            type="text"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            placeholder="Enter option two"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          style={{
            padding: '10px 24px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isDisabled ? '#ccc' : 'green',
            color: 'white',
            fontSize: '1rem',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewQuestion
