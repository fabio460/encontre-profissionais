const initialState = {
    btnUpdate:false
}

interface typeReducer{
    type:string,
    payload:any
}
const BtnUpdateReducer = (state = initialState, { type, payload }:typeReducer) => {
  switch (type) {

  case 'btnUpdate':
    return { ...state, btnUpdate: payload.btnUpdate }

  default:
    return state
  }
}

export default BtnUpdateReducer