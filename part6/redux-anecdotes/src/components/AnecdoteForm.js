import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`'${content}' was created`,5)
  }

  return (
    <div >
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input  name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default connect(null,{ createAnecdote,  setNotification })(AnecdoteForm)
