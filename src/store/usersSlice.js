import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { _getUsers } from '../../_DATA'
import { addQuestion, voteOnQuestion } from './questionsSlice'

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  return await _getUsers()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: {},
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        const question = action.payload
        state.data[question.author].questions.push(question.id)
      })
      .addCase(voteOnQuestion.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload
        state.data[authedUser].answers[qid] = answer
      })
  },
})

export default usersSlice.reducer
