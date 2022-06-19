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
      return state
        .map((a) => (a.id !== id ? a : changedBlog))
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
    },
    deleteById(state, action) {
      const id = action.payload
      const i = state.findIndex((obj) => obj.id === id)
      state.splice(i, 1)
      setBlogs([...state].sort((a, b) => (a.likes < b.likes ? 1 : -1)))
    },
    appendBlog(state, action) {
      const blog = action.payload
      return state.concat(blog).sort((a, b) => (a.likes < b.likes ? 1 : -1))
    },
    setBlogs(state, action) {
      return action.payload
    },
    setComment(state, action) {
      const id = action.payload.blog
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat(action.payload),
      }
      return state
        .map((a) => (a.id !== id ? a : changedBlog))
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
    },
  },
})

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = ({ content, likes, id }) => {
  return async (dispatch) => {
    await blogService.update({ content, likes: likes + 1 }, id)
    dispatch(like(id))
  }
}

export const commentBlog = ({ comment, id }) => {
  return async (dispatch) => {
    const resp = await blogService.comment({ content: comment }, id)
    dispatch(setComment(resp))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteById(id))
  }
}

export const { like, appendBlog, setBlogs, deleteById, setComment } =
  blogSlice.actions
export default blogSlice.reducer
