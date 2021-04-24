import { GET_INPROGRESS, GET_PRE_BOOKING, SET_EMPTY } from "../actions/Booking/pre_booking_action";

const initialState={
    pre_booking:[]
}

interface Pre_Booking{
    type:string,
    payload:{
        id:number,
        preference_id?:string,
        user_email:string,
        guests_nights:string,
        acomodation_step?:string
    }}

export const pre_booking_reducer=(state=initialState,action:Pre_Booking)=>{
    switch(action.type){
        case GET_PRE_BOOKING:
            return{
                ...state,
                pre_booking:action.payload
            }
        case GET_INPROGRESS:
            return{
                ...state,
                pre_booking:action.payload
            }
        case SET_EMPTY:
            return{
                ...state,
                pre_booking:action.payload
            }
        default:
            return state
    }
}
