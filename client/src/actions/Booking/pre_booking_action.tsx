import { Dispatch } from "react"
import { PaxValues } from "../../components/booking/paxForm/PaxForm"
import { BookingValues, PaymentValues } from "../../components/MercadoPago/SuccessPayment"
import { supabase } from "../../SupaBase/conection"

export const GET_PREBOOKING="GET_PREBOOKING"


export const post_pax_booking_payment=(pax:PaxValues,booking:BookingValues,payment:PaymentValues)=>{
    return async(dispatch:Dispatch<any>)=>{
    let paxId;

    const {uuid,first_name,last_name,phone,country,birth_date,address}=pax;

    const {data:pax_exist,error}:any=await supabase
    .from("paxes")
    .select("*")
    .eq("uuid",`${pax.uuid}`)
        if(pax_exist[0].id){
            paxId=pax_exist[0]?.id
        }else{
            const {data:new_pax}:any=await supabase
            .from("paxes")
            .insert([
                {
                    uuid,
                    first_name,
                    last_name,
                    phone,
                    country,
                    birth_date,
                    address,                           
                }
                ])
            paxId=new_pax[0]?.id
        }
    //HASTA ACA SE CREA MIRA SI EL PAX EXISTE, EN ESE CASO SE GUARDA EL ID, sino, SE CREA
    const{checkin,checkout,paxes_amount,room_id}=booking
    const {data:new_booking}:any=await supabase
    .from("bookings")
    .insert([
        {
            checkin,
            checkout,
            room_id,
            paxes_amount,
            paxTitular_id:paxId
        }
    ])
    const bookingId=new_booking[0]?.id
    console.log(bookingId)

    //SE CREA LA BOOKING RELACIONANDOLA CON EL PAX DE ARRIBA
    const {totalPrice,payment_method,payment_status}=payment
    const {data:new_payment}:any=await supabase
    .from("payments")
    .insert([
        {
            totalPrice,
            booking_id:bookingId,
            payment_method:"mercadopago",
            payment_status
        }
    ])
    console.log(new_payment)

        




    }
    
}


export const get_pre=(preference_id:string)=>{
    return async(dispatch:Dispatch<any>)=>{
        const {data:prefer}=await supabase
        .from("pre_booking")
        .select("*")
        .eq("preference_id",`${preference_id}`)
        dispatch(get_prebookk(prefer))
    }
}

const get_prebookk =(payload:any)=>{
    return{
        type:GET_PREBOOKING,
        payload
    }
}