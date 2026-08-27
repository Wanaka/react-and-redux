import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload 
    },
    logoutUser(state) {
      state.user = null
    },
  },
})

export const { loginUser, logoutUser } = loginSlice.actions
export default loginSlice.reducer
