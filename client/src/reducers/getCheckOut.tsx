import {GET_CHECKOUT} from '../actions/getUserIdByMail/index';

export interface GetCheckoutInterface{
    checkOut:any
}

// interface actionProps {
//     type:string,
//     payload:[]
// }

const initialState:GetCheckoutInterface = {
    checkOut: []
}



export function getCheckOutReducer (state:GetCheckoutInterface = initialState,action:any){
    if(action.type === GET_CHECKOUT){
        return{
            ...state,
            checkOut: action.payload
        }
    }
    return state
}