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

// const success = (mensaje: string) => {
//     message.success({
//         content: mensaje,
//         className: "custom-class",
//         style: {
//             marginTop: "20vh",
//         },
//     });
// };

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

