import { promises } from "dns";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { supabase } from "../../SupaBase/conection";

export const GET_USER_BOOKINGS = 'GET_USER_BOOKINGS';

export const getUserBookings = () => {

    return async (dispatch: Dispatch<any>) => {

        const user: any = supabase.auth.user()

        if (user?.aud === "authenticated") {

            let userEmail: any = await supabase
                .from('users')
                .select('uuid , id')
                .eq('email', user.email)

            let paxes: any = await supabase
                .from('paxes')
                .select('id')
                .eq("uuid", userEmail.data[0].uuid)

            let paxBookingsId: any = await supabase
                .from('booking_pax')
                .select('booking_id')
                .eq("pax_id", paxes.data[0].id)

            let userBookings: any = []

            const bx: any = paxBookingsId.data.map((booking: any) => {

                return (
                    supabase
                        .from('bookings')
                        .select('*, payments(totalPrice, payment_method), room_id(name, category_id(name, price), type_id(name, beds))')
                        .eq("id", booking.booking_id)
                )
            })

            Promise.all(bx).then((r: any) => {

                r.forEach((bookings: any) => {

                    console.log("BOOKINGS:", bookings)

                    if (bookings.data[0].status) {
                        const bookingDetails = {
                            bookingId: bookings.data[0]?.id,
                            checkin: bookings.data[0]?.checkin,
                            checkout: bookings.data[0]?.checkout,
                            roomNumber: bookings.data[0]?.room_id.name,
                            category: bookings.data[0]?.room_id.category_id.name,
                            type: bookings.data[0]?.room_id.type_id.name,
                            totalPrice: bookings.data[0]?.payments[0]?.totalPrice,
                            paymentMethod: bookings.data[0]?.payments[0]?.payment_method,
                            paxes: bookings.data[0]?.paxes_amount,
                            actual: false,
                            userId: userEmail.data[0]?.id
                        }
                        userBookings.push(bookingDetails)
                    }
                })

                dispatch(saveUserBookings(userBookings))
                console.log(userBookings)
            }
            )
        }
    }
}

const saveUserBookings = (params: any) => {
    return {
        type: GET_USER_BOOKINGS,
        payload: params
    }
}


export const cancelUserBooking = (bookingId: number, price: number, userId: number) => {

    return async (dispatch: Dispatch<any>) => {

        await supabase
            .from('bookings')
            .update({ status: false })
            .eq("id", bookingId)
        dispatch(getUserBookings())

        let positiveBalance: any = await supabase
            .from('users')
            .select('positive_balance')
            .eq('id', userId)

        await supabase
            .from('users')
            .update({ positive_balance: positiveBalance.data[0].positive_balance + price })
            .eq("id", userId)
    }
}

