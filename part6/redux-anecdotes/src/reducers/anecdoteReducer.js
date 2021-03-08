import anecdotesService from '../services/anecdotes'
const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  if (action.type === 'NEW_ANECDOTE') {
    return state.concat(action.data)
  }else if (action.type === 'VOTE') {
    return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
  }else if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return state
}

export const createAnecdote = content => {
  return async dispatch => {
    const mewAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: mewAnecdote,
    })
  }
}

export const voteAnecdote = toupdate => {
  return async dispatch => {
    const changedAnecdote = {
      ...toupdate,
      votes: toupdate.votes+1
    }
    const newanecdote = await anecdotesService.updateAnecdote(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: newanecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer
