import {supabase} from '../../SupaBase/conection'

export const BOOKING_PAX:string="GET_BOOKING_PAX"

export function getBooking_Pax(id?:any){
    return async (dispatch:any)=>{
        if(id){const relacional:any=await supabase
        .from("bookings")
        .select(`*`)
        dispatch(get_bookingPax(relacional.data))
    }else{
        const relacional:any=await supabase
        .from("booking_pax")
        .select(`*,booking_id(*),pax_id(*))`)
        dispatch(get_bookingPax(relacional.data))
    }
    }
}

const get_bookingPax=(payload:any)=>{
    return{
        type:BOOKING_PAX,
        payload
    }

}