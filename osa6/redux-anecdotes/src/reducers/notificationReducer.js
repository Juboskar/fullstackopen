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
      const message = action.payload
      return { message, visible: false }
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer