const notificaionReducer = (state = '', action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  if(action.type==='SET_NOTIFICATION'){
    return action.data
  } if(action.type==='REMOVE_NOTIFICATION'){
    return ''
  }
  return state
}

export const removeNotification = (content) => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}
export const setNotification = (content,time) => {
  return async (dispatch,getState) => {
    const  timeoutid  = getState().notification.timeoutid
    clearTimeout(timeoutid)
    const newid = setTimeout(()=>dispatch(removeNotification()), 1000*time)
    dispatch( {
      type: 'SET_NOTIFICATION',
      data: {content, timeoutid:newid}
    })
  }
}

export default notificaionReducer
