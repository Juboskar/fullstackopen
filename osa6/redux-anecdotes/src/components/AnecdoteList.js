import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state =>
    [...state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))]
      .sort((a, b) => a.votes < b.votes ? 1 : -1))
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {

    dispatch(vote(anecdote))
    dispatch(showNotification('voted ' + anecdote.content))
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
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
