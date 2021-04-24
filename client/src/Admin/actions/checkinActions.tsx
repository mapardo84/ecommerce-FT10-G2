import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import moment from 'moment';

export const ROOM_SELECTED = 'ROOM_SELECTED'
export const ROOM_NEXT_BOOKING = 'ROOM_NEXT_BOOKING'
export const ROOM_BOOKING = 'ROOM_BOOKING'
export const ROOM_PAYMENTS = 'ROOM_PAYMENTS'
export const ROOM_NEXT_DATE = 'ROOM_NEXT_DATE'

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
                .select('*,paxTitular_id(*)')
                .eq('room_id', roomId)
                .eq('status', true)
                .gte('checkin', today)
                .order('checkin', { ascending: true })
                .limit(1)
                .single()
            if (!error) {
                dispatch(nextBooking(data))
            } else {
                dispatch(nextBookingDate(moment().add(1, 'year').format('YYYY-MM-DD')))
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

interface IRoomUpdate {
    room_id: number,
    curent_pax: number,
    curent_booking: string,
    paxes: any
}

export const updatePaxRoom = async (data: IRoomUpdate) => {
    try {
        const { error } = await supabase
            .from('rooms')
            .update({
                availability: 'not available',
                curent_pax: data.curent_pax,
                curent_booking: data.curent_booking
            })
            .eq('id', data.room_id)
        if (error) {
            console.log(error)
            errorMsg("Checkout error. Try again")
        } else {
            console.log("Los pasajeros", data.paxes)
            const prom = data.paxes.map((pax: any) => {
                return supabase
                    .from('booking_pax')
                    .insert([{
                        pax_id: pax.id,
                        booking_id: data.curent_booking,
                    },
                    ])
            })
            Promise.all(prom)
        }
    } catch (err) {
        errorMsg("Internal server error. Try again")
    }
}

export const createBookingAndUpdateRoom = async (newData: any) => {
    try {
        const { error, data } = await supabase
            .from('bookings')
            .insert([{
                checkin: moment().format('YYYY-MM-DD'),
                checkout: newData.checkout,
                room_id: newData.room_id,
                paxes_amount: newData.paxes.length + 1,
                paxTitular_id: newData.curent_pax
            },
            ])
        if (data) {
            updatePaxRoom({
                room_id: newData.room_id,
                curent_pax: newData.curent_pax,
                curent_booking: data[0].id,
                paxes: [...newData.paxes, { id: newData.curent_pax }]
            })
        }
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

export const nextBookingDate = (data: any) => ({
    type: ROOM_NEXT_DATE,
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

