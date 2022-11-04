const initialState = {
    msgRecebidas:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'msgRecebidas':
    return { ...state, msgRecebidas:payload.msgRecebidas }

  default:
    return state
  }
}
