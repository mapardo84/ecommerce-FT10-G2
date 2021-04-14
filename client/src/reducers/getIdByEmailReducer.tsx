import {GET_IDBYMAIL} from '../actions/getUserIdByMail/index';


interface IuserID{
    userId:any
}

interface actionProps {
    type:string,
    payload:[]
}

const initialState:IuserID = {
    userId: ''
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