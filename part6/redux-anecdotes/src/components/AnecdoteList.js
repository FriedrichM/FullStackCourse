import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filterStr = useSelector(state => state.filter)
  console.log(filterStr)
  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    }
    return  state.anecdotes.filter(anecdote => anecdote.content.includes(filterStr))
  })

  const handlevote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`'${anecdote.content}' was liked`,5))
  }

  return (
    <div >
      <h2>Anecdotes</h2>
      {
        anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handlevote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
