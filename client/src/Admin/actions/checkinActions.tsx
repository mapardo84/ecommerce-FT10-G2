import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import moment from 'moment';

export const ROOM_SELECTED = 'ROOM_SELECTED'
export const ROOM_NEXT_BOOKING = 'ROOM_NEXT_BOOKING'
export const ROOM_BOOKING = 'ROOM_BOOKING'
export const ROOM_PAYMENTS = 'ROOM_PAYMENTS'

const errorMsg = (msg: string, time: number = 3) => {
    message.error(msg, time);
};

const success = (mensaje: string) => {
    message.success({
        content: mensaje,
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

export const nextBookingRoom = (roomId: number) => {
    //const today = new Date()
    const today = moment().format('YYYY-MM-DD')
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error, data } = await supabase
                .from('bookings')
                .select('*')
                .eq('room_id', roomId)
                .gte('checkin', today)
                .limit(1)
                .single()
            if (!error) {
                dispatch(nextBooking(data.checkin))
            } else {
                dispatch(nextBooking('N/A'))
            }
        } catch (err) {
            errorMsg("Internal server error. Try again")
        }
    }
}

export const getRoomBooking = (bookingId: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error, data } = await supabase
                .from('bookings')
                .select('*')
                .eq('id', bookingId)
                .limit(1)
                .single()
            if (!error) {
                dispatch(roomBooking(data))
            }
        } catch (err) {
            errorMsg("Internal server error. Try again")
        }
    }
}

export const getPaimentsOfBooking = (bookingId: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error, data } = await supabase
                .from('payments')
                .select('*')
                .eq('booking_id', bookingId)
            if (!error) {
                dispatch(roomPayments(data))
            }
        } catch (err) {
            errorMsg("Internal server error. Try again")
        }
    }
}

export const checkout = async (roomId: number) => {
    try {
        const { error } = await supabase
            .from('rooms')
            .update({
                availability: 'cleaning',
                curent_pax: null,
                curent_booking: null
            })
            .eq('id', roomId)
        if (!error) {
            success('Check-Out success')
            //dispatch(roomPayments(data))
        } else {
            errorMsg(JSON.stringify(error))
        }
    } catch (err) {
        errorMsg("Internal server error. Try again")
    }
}

export const createPayment = async (newData: any) => {

    try {
        const { error } = await supabase
            .from('payments')
            .insert([{
                totalPrice: newData.totalPrice,
                booking_id: newData.booking_id,
                payment_method: newData.payment_method,
                payment_status: 'Approved',
                preference_id: newData.booking_id
            },
            ])
        if (error) {
            console.log(error)
            errorMsg("Checkout error. Try again")
        }
    } catch (err) {
        errorMsg("Internal server error. Try again")
    }

}


export const saveRoomSelected = (data: any) => ({
    type: ROOM_SELECTED,
    payload: data
})

export const nextBooking = (data: any) => ({
    type: ROOM_NEXT_BOOKING,
    payload: data
})

export const roomBooking = (data: any) => ({
    type: ROOM_BOOKING,
    payload: data
})

export const roomPayments = (data: any) => ({
    type: ROOM_PAYMENTS,
    payload: data
})

