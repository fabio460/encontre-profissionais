const initialState = {
   valid:false
}

interface actionType{
    type:string,
    payload:{
        valid:boolean
    }
}

export default (state = initialState, { type, payload }:actionType) => {
  switch (type) {

  case 'valid':
    return { ...state, valid:payload.valid }

  default:
    return state
  }
}
