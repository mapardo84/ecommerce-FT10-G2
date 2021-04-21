import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import moment from 'moment';

export const ROOM_SELECTED = 'ROOM_SELECTED'
export const ROOM_NEXT_BOOKING = 'ROOM_NEXT_BOOKING'

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
                .select('checkin')
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

export const saveRoomSelected = (data: any) => ({
    type: ROOM_SELECTED,
    payload: data
})

export const nextBooking = (data: any) => ({
    type: ROOM_NEXT_BOOKING,
    payload: data
})