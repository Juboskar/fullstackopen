import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    [...state.anecdotes].sort((a, b) => a.votes < b.votes ? 1 : -1))
  const dispatch = useDispatch()

  const voteAnecdote = (id, content) => {
    dispatch(vote(id))
    dispatch(showNotification('voted ' + content))
    setTimeout(() => {
      dispatch(hideNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
