import { GET_PREBOOKING } from "../actions/Booking/pre_booking_action";

const initialState={
    pre_booking:{}
}

interface Pre_Booking{
    type:string,
    payload:{
        id:number,
        preference_id:string,
        user_email:string
    }}

export const pre_booking_reducer=(state=initialState,action:Pre_Booking)=>{
    switch(action.type){
        case GET_PREBOOKING:
            return{
                ...state,
                pre_booking:action.payload
            }
        default:
            return state
    }
}
