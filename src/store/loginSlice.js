import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loggedOut: false,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload
      state.loggedOut = false
    },
    logoutUser(state) {
      state.user = null
      state.loggedOut = true
    },
  },
})

export const { loginUser, logoutUser } = loginSlice.actions
export default loginSlice.reducer
