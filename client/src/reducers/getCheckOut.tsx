import {GET_CHECKOUT} from '../actions/getUserIdByMail/index';

interface Icheckout{
    checkOut:any
}

// interface actionProps {
//     type:string,
//     payload:[]
// }

const initialState:Icheckout = {
    checkOut: []
}



export function getCheckOut (state = initialState,action:any){
    if(action.type === GET_CHECKOUT){
        return{
            ...state,
            checkOut: action.payload
        }
    }
    return state
}