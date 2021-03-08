const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  if(action.type==='CHANGE_FILTER'){
    return action.data
  }
  return state
}


export const changeFilter = (content) => {
  return async (dispatch) => {
    dispatch( {
      type: 'CHANGE_FILTER',
      data: content
    })
  }
}

export default filterReducer
