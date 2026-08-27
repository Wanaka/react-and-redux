import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginSlice'
import questionsReducer from './questionsSlice'
import usersReducer from './usersSlice'

const savedUser = JSON.parse(localStorage.getItem('user'))

const store = configureStore({
  reducer: {
    login: loginReducer,
    questions: questionsReducer,
    users: usersReducer,
  },
  preloadedState: {
    login: { user: savedUser },
  },
})

store.subscribe(() => {
  const { user } = store.getState().login
  localStorage.setItem('user', JSON.stringify(user))
})

export default store
