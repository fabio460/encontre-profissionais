const initialState = {
   nome:'',
   email:'',
   senha:'',
   confirmSenha:'',
   cep:'123'
}

interface typeReducer{
  type:string,
  payload:{
    nome:string,
    email:string,
    senha:string,
    confirmSenha:string,
    cep:string
  }
}

export default (state = initialState, { type, payload }:typeReducer) => {
  switch (type) {

  case 'input':
    return { ...state,
       nome:payload.nome,
       email:payload.email,
       senha:payload.senha,
       confirmsenha:payload.confirmSenha,
       cep:payload.cep
    }

  default:
    return state
  }
}
