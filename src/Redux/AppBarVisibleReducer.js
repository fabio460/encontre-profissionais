const initialState = {
    inputVisible:true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'inputVisible':
    return { ...state, inputVisible:payload.inputVisible }

  default:
    return state
  }
}
