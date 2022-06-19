import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setErrorNotification } from './notificationReducer'

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
    window.localStorage.clear()
    dispatch(loggedInUser(null))
  }
}

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(setUser(user))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (error) {
      dispatch(setErrorNotification('wrong credentials', 5000))
      dispatch(resetUser())
    }
  }
}

export const { loggedInUser } = userSlice.actions
export default userSlice.reducer
