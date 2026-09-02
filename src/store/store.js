import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginSlice'
import questionsReducer from './questionsSlice'
import usersReducer from './usersSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    questions: questionsReducer,
    users: usersReducer,
  },
})

export default store
