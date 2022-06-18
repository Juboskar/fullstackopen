import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, error: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const message = action.payload.message
      const error = action.payload.error
      return { message, error }
    },
    hideNotification() {
      return { message: null, error: false }
    },
  },
})

let timeoutID = null

export const setInfoNotification = (message, time) => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(showNotification({ message, error: false }))
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}

export const setErrorNotification = (message, time) => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(showNotification({ message, error: true }))
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
