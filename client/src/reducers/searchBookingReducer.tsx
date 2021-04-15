import {BOOKING_PAX} from '../actions/SearchBookings/action_searchBookings'

const initialState={
    booking_pax:[]    
}

export const searchBookingReducer=(state:{booking_pax:any}=initialState,action:{type:string,payload:any})=>{
    switch(action.type){
        case BOOKING_PAX:
            return{
                ...state,
                booking_pax:action.payload
            }
        default:
            return state
    }
}