import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    dispatch(setBlogs(blogs))
  }
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((a) => (a.id !== id ? a : changedBlog))
    },
    deleteById(state, action) {
      const id = action.payload
      const i = state.findIndex((obj) => obj.id === id)
      state.splice(i, 1)
      setBlogs([...state])
    },
    appendBlog(state, action) {
      const anecdote = action.payload
      return state.concat(anecdote).sort((a, b) => (a.likes < b.likes ? 1 : -1))
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = ({ content, votes, id }) => {
  return async (dispatch) => {
    await blogService.update({ content, votes: votes + 1 }, id)
    dispatch(like(id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteById(id))
  }
}

export const { like, appendBlog, setBlogs, deleteById } = blogSlice.actions
export default blogSlice.reducer