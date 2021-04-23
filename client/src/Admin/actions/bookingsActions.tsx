import { supabase } from "../../SupaBase/conection"
import moment from 'moment';

export const DATA_BOOKING = 'GET_DATA_BOOKING'  
export const DATA_PAX = 'DATA_PAX'
export const BOOKING_ID = 'BOOKING_ID'
export const DATA_PAYMENTS = 'DATA_PAYMENTS'
export const DATA_PAXES = 'DATA_PAXES'

// export const getDataBooking = () => {
//     return async (dispatch:any)=>{
        
//         const {data}:any=await supabase
//         .from("booking_pax")
//         .select(`*`)
//         console.log('hola',data)
//         dispatch(dataBookingPax(data))
//     }
// }
export const getDataBooking = (param: string) => {
    const today = moment().format('YYYY-MM-DD')
    if(param === 'all') {
        return async (dispatch:any)=>{
        
                    const {data}:any=await supabase
                    .from("booking_pax")
                    .select(`*`)
                    dispatch(dataBookingPax(data))
                }
    }
    if(param === 'next') {
        return async (dispatch:any)=>{
                
            const books:any=await supabase
            .from("bookings")
            .select(`*`)
            .gte('checkin', today)
            const booksPax = books.data.map((e:any)=>{
                return supabase
                .from("booking_pax")
                .select('*')
                .eq('booking_id',`${e.id}`)
                })
                const dataConcatenada:any[]=[]
                Promise.all(booksPax).then(res=>res.forEach((e:any)=>dataConcatenada.push(e.data)))
                .then(()=>dispatch(dataBookingPax(dataConcatenada.flat()))).then(res => console.log(res))
        }
    }
    if(param === 'prev') {
        return async (dispatch:any)=>{
                
            const books:any=await supabase
            .from("bookings")
            .select(`*`)
            .lte('checkout', today)
            const booksPax = books.data.map((e:any)=>{
                return supabase
                .from("booking_pax")
                .select('*')
                .eq('booking_id',`${e.id}`)
                })
                const dataConcatenada:any[]=[]
                Promise.all(booksPax)
                .then(res=>res.forEach((e:any)=>dataConcatenada.push(e.data)))
                .then(()=>dispatch(dataBookingPax(dataConcatenada.flat())))
        }
    }
}
// if (previus) {
    //     return async (dispatch:any)=>{
        //         try {
            //             const {data}:any=await supabase
            //             .from("bookings")
            //             .select(`*, rooms(name, category_id(name), type_id(name))`)
            //             .gte('checkin', today)
            //             console.log('previus', data)
            //             dispatch(dataBookingId(data))
            //         } catch (e) {
                //           console.log(e)
                //         }
                // }
                
                
                
    export const getBookingsId = () => {
    // const today = moment().format('YYYY-MM-DD')
        return async (dispatch:any)=>{
            try {
                const {data}:any=await supabase
                .from("bookings")
                .select(`*, rooms(name, category_id(name), type_id(name))`)
                dispatch(dataBookingId(data))
            } catch (e) {
              console.log(e)
            }
    }
}
export const getPaxId = () => {
    return async (dispatch:any)=>{
        try {
            const {data}:any=await supabase
            .from("paxes")
            .select(`*`)
            dispatch(dataPaxes(data))
        } catch (e) {
          console.log(e)
        }
    }
}


export const getPayments = () => {
    return async (dispatch:any)=>{
        try {
            const {data}:any=await supabase
            .from("payments")
            .select(`*`)
            dispatch(dataPayments(data))
        } catch (e) {
          console.log(e)
        }
    }
}


const dataBookingPax = (payload:any) => {
    return {
        type: DATA_BOOKING,
        payload
    }
}

const dataPaxes = (payload:any) => {
    return {
        type: DATA_PAXES,
        payload
    }
}

const dataPayments = (payload:any) => {
    return {
        type: DATA_PAYMENTS,
        payload
    }
}
const dataBookingId = (payload:any) => {
    return {
        type: BOOKING_ID,
        payload
    }
}