const initialState = {
    value:''
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'search':
    return { ...state,value: payload.value }

  default:
    return state
  }
}
