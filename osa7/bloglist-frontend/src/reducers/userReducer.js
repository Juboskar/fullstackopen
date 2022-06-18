import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedInUser(state, action) {
      return action.payload
    },
  },
})

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(loggedInUser(user))
  }
}

export const resetUser = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    dispatch(loggedInUser(null))
  }
}

export const { loggedInUser } = userSlice.actions
export default userSlice.reducer
