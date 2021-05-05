import {GET_IDBYMAIL} from '../actions/getUserIdByMail/index';
// import {GET_CHECKOUT} from '../actions/getUserIdByMail/index';

export interface IdByEmailReducer{
    userId:any
}

interface actionProps {
    type:string,
    payload:[]
}

const initialState:IdByEmailReducer = {
    userId: ''
}



export function getIdByEmailReducer (state:IdByEmailReducer = initialState,action:actionProps){
    if(action.type === GET_IDBYMAIL){
        return{
            ...state,
            userId: action.payload
        }
    }
    return state
}