import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', visible: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const message = action.payload
      return { message, visible: true }
    },
    hideNotification(state, action) {
      return { message: '', visible: false }
    }
  }
})

let timeoutID = null

export const setNotification = (message, time) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch(showNotification(message))
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer