import {GET_IDBYMAIL} from '../actions/getUserIdByMail/index';


export interface IuserID{
    userId:[]
}

interface actionProps {
    type:string,
    payload:[]
}

const initialState:IuserID = {
    userId: []
}



export function getIdByEmailReducer (state = initialState,action:actionProps){
    if(action.type === GET_IDBYMAIL){
        return{
            ...state,
            userId: action.payload
        }
    }
    return state
}