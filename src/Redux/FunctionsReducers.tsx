import { listType } from "../types";

interface typeActions {
    type: string;
    payload: { 
        settoRollReducer: void;
        getUsuariosReducer:listType,
        toRoll:boolean,
        index:number
    };
}

const initial = {
    settoRollReducer : ()=>{},
    getUsuariosReducer:{},
    toRoll:false,
    index:-1
}

const  FunctionsRedcer = (state=initial,action: typeActions)=> {
    switch (action.type) {
        case 'functions':
            return {...state,
                 settoRollReducer:action.payload.settoRollReducer,
                 getUsuariosReducer:action.payload.getUsuariosReducer,
                 toRoll:action.payload.toRoll,
                 index:action.payload.index
                }
    
        default:
            break;
    }
    return state
}

export default FunctionsRedcer