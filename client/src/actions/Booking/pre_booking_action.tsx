
import axios from "axios"
import { Dispatch } from "react"
import { PaxValues } from "../../components/booking/paxForm/PaxForm"
import { BookingValues, ConfirmationEmail, PaymentValues } from "../../components/MercadoPago/SuccessPayment"
import { supabase } from "../../SupaBase/conection"

export const GET_PRE_BOOKING = "GET_PREBOOKING"
export const GET_INPROGRESS = "GET_INPROGRESS"
export const SET_EMPTY = "SET_EMPTY"
export const GET_USER_BALANCE = "GET_USER_BALANCE"


export const post_pax_booking_payment = (pax: PaxValues, booking: BookingValues, info: ConfirmationEmail, payment?: PaymentValues | undefined, withBalance?: PaymentValues) => {
    return async (dispatch: Dispatch<any>) => {
        let paxId;
        let bookingId;
        let user_id;
        let paymentId;
        let with_ballance;

        if (localStorage.getItem("Unique_id")) {
            bookingId = Number(localStorage.getItem("Unique_id"))
        }
        if (localStorage.getItem("Payment")) {
            paymentId = Number(localStorage.getItem("Payment"))
        }


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
                        country: country[0],
                        birth_date,
                        address,
                    }
                ])
            paxId = new_pax[0]?.id
        }
        /*---------------------EN ESTE MOMENTO YA HAY UN PAX PARA RELACIONAR LA BOOKING-------------------------*/
        user_id = await supabase
            .from("users")
            .select("id")
            .eq("email", supabase.auth.user()?.email)
        if (!user_id.data) return

        const { checkin, checkout, paxes_amount, room_id, early_checkin, late_checkout } = booking

        const { data: booking_exist }: any = await supabase
            .from("bookings")
            .select("*")
            .eq("id", `${bookingId}`)
        if (booking_exist) {
            bookingId = booking_exist[0]?.id
            /*--------------------SE CORROBORA SI YA HAY UNA RESERVA CON ESA REFERENCIA DE PAGO-----------------*/
        } else {
            const { data: new_booking } = await supabase
                .from("bookings")
                .insert([
                    {
                        checkin,
                        checkout,
                        room_id,
                        paxes_amount,
                        paxTitular_id: paxId,
                        early_check: early_checkin,
                        late_check: late_checkout,
                        user_id: user_id?.data[0]?.id
                    }
                ])
            if (new_booking) {
                bookingId = new_booking[0]?.id
                localStorage.setItem("Unique_id", JSON.stringify(new_booking[0]?.id))
            }
        }
        /*--------------------------------HASTA ACA YA HAY UNA RESERVA CREADA--------------------------------------*/
        if (payment && payment.totalPrice) {
            const { totalPrice, payment_method, payment_status } = payment

            const { data: payment_exist } = await supabase
                .from("payments")
                .select("*")
                .eq("id", paymentId)
            if (payment_exist) {
                paymentId = payment_exist[0].id
            } else {
                const { data: new_payment } = await supabase
                    .from("payments")
                    .insert([
                        {
                            totalPrice,
                            booking_id: bookingId,
                            payment_method,
                            payment_status,
                        }
                    ])
                if (new_payment) {
                    localStorage.setItem("Payment", JSON.stringify(new_payment[0]?.id))
                }
            }
        }
        if (withBalance) {
            const { data: payWithBalance } = await supabase
                .from("payments")
                .select("*")
                .eq("id", with_ballance)
            if (payWithBalance) {
                paymentId = payWithBalance[0].id
            } else {
                const { data: newBallancePay } = await supabase
                    .from("payments")
                    .insert([
                        {
                            totalPrice: withBalance.totalPrice,
                            booking_id: bookingId,
                            payment_method: withBalance.payment_method,
                            payment_status: withBalance.payment_status
                        }
                    ])
                if (newBallancePay) {
                    localStorage.setItem("WithBalance", JSON.stringify(newBallancePay[0]?.id))
                }
            }
        }

        const { data: email_status } = await supabase
            .from("bookings")
            .select("email_send")
            .eq('id', `${bookingId}`)
        if (email_status) {
            if (!email_status[0].email_send) {
                const sendEmail = axios.post('http://localhost:4000/emails/', info)
                const { data: control_email } = await supabase
                    .from("bookings")
                    .update({ "email_send": true })
                    .eq('id', `${bookingId}`)
            }
        }



        const { data: booking_pax_exist } = await supabase
            .from("booking_pax")
            .select("*")
            .eq("booking_id", `${bookingId}`)

        if(booking_pax_exist) {
            console.log("entre")
            if(booking_pax_exist.length>0){
                console.log("entre tambien")
                return}
                else {
                    const { data: relation_create } = await supabase
                        .from("booking_pax")
                        .insert([
                            {
                                booking_id: bookingId,
                                pax_id: paxId
                            }
                        ])
                    console.log(relation_create)
                }
        }




    }
}

export const setGuests = (user_email: any, guests_nights?: any | undefined, accomodation?: any) => {
    return async (dispatch: Dispatch<any>) => {
        if (guests_nights) {
            const { data: existPreBooking }: any = await supabase
                .from("pre_booking")
                .select("*")
                .eq("user_email", `${user_email}`)
            if (existPreBooking.length > 0) {
                const { data: guests_prebooking } = await supabase
                    .from("pre_booking")
                    .update({
                        user_email: `${user_email}`
                        , guests_nights: `${guests_nights}`
                    })
                    .eq('user_email', `${user_email}`)
                localStorage.setItem("Check&Guests", guests_nights)
            } else {
                const { data: createPreBooking } = await supabase
                    .from("pre_booking")
                    .insert([
                        {
                            user_email,
                            guests_nights
                        }
                    ])
            }
        }
        if (accomodation) {
            const { data: acomodation_prebooking }: any = await supabase
                .from("pre_booking")
                .update({ acomodation_step: `${accomodation}` })
                .eq('user_email', `${user_email}`)
            localStorage.setItem("Accomodation", accomodation)
        }
    }
}


export const get_pre = (user_email?: string | undefined, preference_id?: string) => {
    return async (dispatch: Dispatch<any>) => {
        if (user_email) {
            const { data: inProgress }: any = await supabase
                .from("pre_booking")
                .select("*")
                .eq("user_email", `${user_email}`)
                dispatch(pre_booking_action(inProgress))
            //     if(inProgress.length<1){
            //     if(localStorage.getItem("Check&Guests")){
                    
            //     }
            // }else{
            //         console.log("toyaca")
            //     }
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

export const pre_booking_empty = (payload: any = []) => {
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

export const create_pre_booking = (check?:string|null,accomodation?:string|null)=>{
    return async () => {
        const {data:pre_booking_exist}=await supabase
        .from("pre_booking")
        .select("*")
        .eq("user_email",supabase.auth.user()?.email)
        console.log(pre_booking_exist)
        if(pre_booking_exist){
            if(pre_booking_exist.length===0){
                console.log("entre")
                if(check && accomodation){
                    return await supabase
                    .from("pre_booking")
                    .insert([{
                        'user_email':supabase.auth.user()?.email,
                        'guests_nights':check,
                        'acomodation_step':accomodation
                    }])
                }if(!accomodation){
                    console.log("tambien entre")
                    return await supabase
                    .from("pre_booking")
                    .insert([{
                        'user_email':supabase.auth.user()?.email,
                        'guests_nights':check,
                    }])                    
                }
            }
        }
    }
}

export const delete_pre_booking = (user_email: string | undefined) => {
    return async () => {
        const { data: delete_pb }: any = await supabase
            .from("pre_booking")
            .delete()
            .eq("user_email", `${user_email}`)
    }
}

export const getUserBalance = (email: string | undefined) => {
    return async (dispatch: Dispatch<any>) => {
        const { data: balance }: any = await supabase
            .from("users")
            .select("*")
            .eq("email", `${email}`)
        dispatch(user_balance(balance))
    }
}

const user_balance = (payload: any) => {
    return {
        type: GET_USER_BALANCE,
        payload,
    }
}

export const update_balance = (email_user: string | undefined, amount: number) => {
    return async () => {
        const { data: updateBalance }: any = await supabase
            .from("users")
            .update({ positive_balance: amount })
            .eq("email", `${email_user}`)
    }
}