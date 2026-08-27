import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA'

export const fetchQuestions = createAsyncThunk('questions/fetch', async () => {
  return await _getQuestions()
})

export const addQuestion = createAsyncThunk('questions/add', async (question) => {
  return await _saveQuestion(question)
})

export const voteOnQuestion = createAsyncThunk('questions/vote', async (voteData) => {
  await _saveQuestionAnswer(voteData)
  return voteData
})

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    data: {},
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        const question = action.payload
        state.data[question.id] = question
      })
      .addCase(voteOnQuestion.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload
        state.data[qid][answer].votes.push(authedUser)
      })
  },
})

export default questionsSlice.reducer
