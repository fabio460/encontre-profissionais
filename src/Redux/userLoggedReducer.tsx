import { ObjectLiteralElement } from "typescript";

const initial = {
    userLogged:{}
}

interface acionType{
    payload:{
        userLogged:Object
    },
    type:string
}
const UserLoggedReducer = (state=initial,action:acionType)=>{
   switch (action.type) {
    case 'userLogged':
        return {...state,userLogged:action.payload.userLogged}
        break;
   
    default:
        break;
   }
   return state
}

export default UserLoggedReducer