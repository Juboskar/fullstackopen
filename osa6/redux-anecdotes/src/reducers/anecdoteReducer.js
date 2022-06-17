import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changedAnecdote
      )
    },
    createAnecdote(state, action) {
      const anecdote = action.payload
      return state.concat(anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer