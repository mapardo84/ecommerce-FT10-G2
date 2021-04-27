import { ConsoleSqlOutlined } from "@ant-design/icons"
import { Dispatch } from "react"
import { PaxValues } from "../../components/booking/paxForm/PaxForm"
import { BookingValues, PaymentValues } from "../../components/MercadoPago/SuccessPayment"
import { supabase } from "../../SupaBase/conection"

export const GET_PRE_BOOKING = "GET_PREBOOKING"
export const GET_INPROGRESS ="GET_INPROGRESS"
export const SET_EMPTY = "SET_EMPTY"
export const GET_USER_BALANCE ="GET_USER_BALANCE"


export const post_pax_booking_payment = (pax: PaxValues, booking: BookingValues, payment: PaymentValues) => {
    return async (dispatch: Dispatch<any>) => {
        let paxId;
        let bookingId;
        let paymentId;

        if(localStorage.getItem("Unique_id")){
            bookingId=Number(localStorage.getItem("Unique_id"))
        }
        if(localStorage.getItem("Payment")){
            paymentId=Number(localStorage.getItem("Payment"))
        }
        console.log(bookingId,paymentId)


        const { uuid, first_name, last_name, phone, country, birth_date, address } = pax;

        const { data: pax_exist }: any = await supabase
            .from("paxes")
            .select("*")
            .eq("uuid", `${pax.uuid}`)
        if (pax_exist[0]?.id) {
            paxId = pax_exist[0]?.id
        } else {
            /*-----------------HASTA ACA SE CREA MIRA SI EL PAX EXISTE,EN ESE CASO SE GUARDA EL ID-----------------*/
            const { data: new_pax }: any = await supabase
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
            paxId = new_pax[0]?.id
        }
        /*---------------------EN ESTE MOMENTO YA HAY UN PAX PARA RELACIONAR LA BOOKING-------------------------*/
        const { checkin, checkout, paxes_amount, room_id} = booking

        const { data: booking_exist }: any = await supabase
            .from("bookings")
            .select("*")
            .eq("id", `${bookingId}`)
        if (booking_exist) {
            bookingId = booking_exist[0]?.id
            /*--------------------SE CORROBORA SI YA HAY UNA RESERVA CON ESA REFERENCIA DE PAGO-----------------*/
        } else {
            const { data: new_booking }: any = await supabase
                .from("bookings")
                .insert([
                    {
                        checkin,
                        checkout,
                        room_id,
                        paxes_amount,
                        paxTitular_id: paxId,
                    }
                ])
            
            bookingId = new_booking[0]?.id
            localStorage.setItem("Unique_id",JSON.stringify(new_booking[0]?.id))
        }
        /*--------------------------------HASTA ACA YA HAY UNA RESERVA CREADA--------------------------------------*/
        const { totalPrice, payment_method, payment_status} = payment

        const { data: payment_exist }: any = await supabase
            .from("payments")
            .select("*")
            .eq("id", paymentId)
        if (payment_exist) {
            paymentId = payment_exist[0].id
        } else {
            console.log(totalPrice,payment_method,payment_status)
            const { data: new_payment }: any = await supabase
                .from("payments")
                .insert([
                    {
                        totalPrice,
                        booking_id: bookingId,
                        payment_method,
                        payment_status,
                    }
                ])
                if(new_payment){
                localStorage.setItem("Payment",JSON.stringify(new_payment[0]?.id))}
        }
        const { data: booking_pax_exist }: any = await supabase
            .from("booking_pax")
            .select("*")
            .eq("booking_id", `${bookingId}`)

        if (booking_pax_exist[0]?.id) {
            return
        } else {
            const { data: relation_create }: any = await supabase
                .from("booking_pax")
                .insert([
                    {
                        booking_id: bookingId,
                        pax_id: paxId
                    }
                ])
        }
    }
}

export const setGuests=(user_email:any,guests_nights?:any|undefined,accomodation?:any)=>{
    return async(dispatch:Dispatch<any>)=>{
        if(accomodation){
            const {data:acomodation_prebooking}:any=await supabase
            .from("pre_booking")
            .update({acomodation_step:`${accomodation}`})
            .eq('user_email',`${user_email}`)
            localStorage.setItem("Accomodation",accomodation)            
        }else{
            const{data:existPreBooking}:any=await supabase
            .from("pre_booking")
            .select("*")
            .eq("user_email",`${user_email}`)
            if(existPreBooking.length>0){
                const {data:guests_prebooking}=await supabase
                .from("pre_booking")
                .update({
                        user_email:`${user_email}`
                        ,guests_nights:`${guests_nights}`
                    })
                .eq('user_email',`${user_email}`)
                localStorage.setItem("Check&Guests",guests_nights)            
            }else{
                const {data:createPreBooking}=await supabase
        .from("pre_booking")
        .insert([
            {
                user_email,
                guests_nights
            }
        ])}}
    }
}


export const get_pre= (user_email?: string | undefined, preference_id?: string) => {
    return async (dispatch: Dispatch<any>) => {
        if(user_email){
            const {data:inProgress}:any=await supabase
            .from("pre_booking")
            .select("*")
            .eq("user_email",`${user_email}`)
           dispatch(pre_booking_action(inProgress))
        }
        if (preference_id) { //si se le pasa preference id, se utiliza como metodo de seguridad para corroborar si es el mismo que lleva el link de mercado pago
            const { data: prefer } = await supabase
                .from("pre_booking")
                .select("*")
                .eq("preference_id", `${preference_id}`)
                dispatch(get_preference(prefer))
        }
    }
}

const get_preference = (payload: any) => {     //Se utiliza para la comparacion del preference id post pago
    return {
        type: GET_PRE_BOOKING,
        payload
    }
}

export const pre_booking_empty=(payload:any=[])=>{
    return {
        type: SET_EMPTY,
        payload
    }
}

const pre_booking_action = (payload: any) => {    //Trae toda la pre-booking en base al email
    return {
        type: GET_INPROGRESS,
        payload
    }
}

export const delete_pre_booking=(user_email:string|undefined)=>{
    return async()=>{
        const {data:delete_pb}:any=await supabase
        .from("pre_booking")
        .delete()
        .eq("user_email",`${user_email}`)
    }
}

export const getUserBalance=(email:string | undefined)=>{
    return async(dispatch:Dispatch<any>)=>{        
        const {data:balance}:any=await supabase
        .from("users")
        .select("*")
        .eq("email",`${email}`)
        dispatch(user_balance(balance))
    }
}

const user_balance=(payload:any)=>{
    return {
        type:GET_USER_BALANCE,
        payload,
    }
}

export const update_balance=(email_user:string | undefined,amount:number)=>{
    return async()=>{
        const {data:updateBalance}:any=await supabase
        .from("users")
        .update({positive_balance:amount})
        .eq("email",`${email_user}`)
        console.log(updateBalance)
    }
}