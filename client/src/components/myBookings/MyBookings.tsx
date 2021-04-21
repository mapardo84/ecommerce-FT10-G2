import React, { useEffect } from 'react'
import { supabase } from '../../SupaBase/conection'
import { getUserBookings } from "../../actions/Booking/userBookings";
import { useDispatch, useSelector } from 'react-redux';
import BookingCard from './BookingCard';
import "./MyBookings.less"


const MyBookings = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    const userBookings = useSelector((state: any) => state.userBookings.data);

    let actualBookings: any = [];
    let pastBookings: any = [];

    userBookings.filter((booking: any) => {
        let checkin: any = new Date(booking.checkin.replaceAll("-", ","));

        if (checkin > Date.now()) {
            booking.actual = true;
            actualBookings.push(booking)
        } else {
            pastBookings.push(booking)
        }
    })

    return (
        <div className="globalBooking">
            <div className="myBookingContainer">
                <div className="myBooking_State">CURRENT</div>
                {actualBookings?.map((user: any, id: any) => {
                    return (
                        <BookingCard userData={user} key={id} />
                    )
                }
                )}

                <div className="myBooking_State">PAST</div>
                {pastBookings?.map((user: any, id: any) => {
                    return (
                        <BookingCard userData={user} key={id} />
                    )
                }
                )}
            </div>
        </div>
    )
}

export default MyBookings

