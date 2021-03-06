import { supabase } from "../../SupaBase/conection"
import moment from 'moment';
import { Dispatch } from "react";

export const DATA_BOOKING = 'GET_DATA_BOOKING'
export const DATA_PAX = 'DATA_PAX'
export const BOOKING_ID = 'BOOKING_ID'
export const DATA_PAYMENTS = 'DATA_PAYMENTS'
export const DATA_PAXES = 'DATA_PAXES'

export const getDataBooking = (param: string, type: string | boolean, value: string | boolean) => {
    const today = moment().format('YYYY-MM-DD')
    if (param) {

        if (param === 'all') {
            return async (dispatch: Dispatch<any>) => {

                const { data } = await supabase
                    .from("booking_pax")
                    .select(`*`)
                dispatch(dataBookingPax(data))
            }
        }
        if (param === 'next') {
            return async (dispatch: Dispatch<any>) => {

                const books = await supabase
                    .from("bookings")
                    .select(`*`)
                    .gte('checkin', today)



                const booksPax = books.data?.map((e: any) => {
                    return supabase
                        .from("booking_pax")
                        .select('*')
                        .eq('booking_id', `${e.id}`)
                })
                const dataConcatenada: any[] = []

                if (!booksPax) return

                Promise.all(booksPax).then(res => res.forEach((e: any) => dataConcatenada.push(e.data)))
                    .then(() => dispatch(dataBookingPax(dataConcatenada.flat())))
            }
        }
        if (param === 'prev') {
            return async (dispatch: Dispatch<any>) => {

                const books = await supabase
                    .from("bookings")
                    .select(`*`)
                    .lte('checkout', today)
                const booksPax = books.data?.map((e: any) => {
                    return supabase
                        .from("booking_pax")
                        .select('*')
                        .eq('booking_id', `${e.id}`)
                })
                const dataConcatenada: any[] = []

                if (!booksPax) return

                Promise.all(booksPax)
                    .then(res => res.forEach((e: any) => dataConcatenada.push(e.data)))
                    .then(() => dispatch(dataBookingPax(dataConcatenada.flat())))
            }
        }
    }

    if (type && value) {
        console.log('aca tmb xd ')

        if (type === 'uuid' || type === 'first_name' || type === 'last_name') {
            return async (dispatch: Dispatch<any>) => {
                console.log(type, value)

                const bookByPax = await supabase
                    .from('paxes')
                    .select('*')
                    .eq(type, value)
                console.log(bookByPax)

                if (!bookByPax) { return }

                const booksPax = bookByPax.data?.map((e: any) => {
                    return supabase
                        .from("booking_pax")
                        .select('*')
                        .eq('pax_id', `${e.id}`)
                })
                const dataConcatenada: any[] = []

                if (!booksPax) return

                Promise.all(booksPax)
                    .then(res => res.forEach((e: any) => dataConcatenada.push(e.data)))

                    .then(() => {
                        console.log(dataConcatenada.flat())
                        dispatch(dataBookingPax(dataConcatenada.flat()))
                    })
            }
        }

        if (type === 'booking_id') {
            return async (dispatch: Dispatch<any>) => {
                const booking = await supabase
                    .from('booking_pax')
                    .select('*')
                    .eq(type, value)

                dispatch(dataBookingPax(booking.data))

            }
        }
    }


}

export const getBookingsId = () => {
    // const today = moment().format('YYYY-MM-DD')
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data }: any = await supabase
                .from("bookings")
                .select(`*, rooms(name, category_id(name), type_id(name))`)
            dispatch(dataBookingId(data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getPaxId = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data }: any = await supabase
                .from("paxes")
                .select(`*`)
            dispatch(dataPaxes(data))
        } catch (e) {
            console.log(e)
        }
    }
}


export const getPayments = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data }: any = await supabase
                .from("payments")
                .select(`*`)
            dispatch(dataPayments(data))
        } catch (e) {
            console.log(e)
        }
    }
}


const dataBookingPax = (payload: any) => {
    //console.log(payload)
    return {
        type: DATA_BOOKING,
        payload
    }
}

const dataPaxes = (payload: any) => {
    return {
        type: DATA_PAXES,
        payload
    }
}

const dataPayments = (payload: any) => {
    return {
        type: DATA_PAYMENTS,
        payload
    }
}
const dataBookingId = (payload: any) => {
    return {
        type: BOOKING_ID,
        payload
    }
}