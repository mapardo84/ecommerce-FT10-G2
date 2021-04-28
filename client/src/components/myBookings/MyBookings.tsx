import React, { useEffect, useState } from 'react'
// import { supabase } from '../../SupaBase/conection'
import { getUserBookings, setLoading } from "../../actions/Booking/userBookings";
import { useDispatch, useSelector } from 'react-redux';
import BookingCard from './BookingCard';
import "./MyBookings.less"
import { Button, Divider, Pagination } from 'antd';
import { NavLink } from 'react-router-dom';


const MyBookings = () => {

    const pageSize = 4
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(pageSize)

    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getUserBookings())
    }, [dispatch])


    const userBookings = useSelector((state: any) => state.userBookings.data);
    const loading = useSelector((state: any) => state.userBookings.loading);

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

    const handleChange = (page: any) => {
        setMinIndex((page - 1) * pageSize)
        setMaxIndex(page * pageSize)
    };



    if (loading) {
        return (
            <div className="userBookingEmpty">
                Loading...
            </div>
        )
    }
    if (userBookings.length !== 0) {
        return (
            <div className="globalBooking">
                <div className="myBookingContainer">
                    <Divider><div className="myBooking_State">CURRENT</div></Divider>

                    {actualBookings.length !== 0 ?
                        actualBookings.map((user: any, id: any) => {
                            return (
                                <BookingCard userData={user} key={id} />
                            )
                        })
                        :
                        <div className="noCurrentBooking">You don't have current bookings</div>
                    }
                    <Divider className="myBookingDivider"><div className="myBooking_State">PAST</div></Divider>

                    {pastBookings.length !== 0 ?
                        pastBookings?.slice(minIndex, maxIndex).map((user: any, id: any) => {
                            return (
                                <BookingCard userData={user} key={id} />
                            )
                        })
                        :
                        <div className="noCurrentBooking">You don't have past bookings</div>
                    }

                    <Pagination
                        pageSize={pageSize}
                        defaultCurrent={1}
                        total={pastBookings.length}
                        onChange={handleChange}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="userBookingEmpty">
                Sorry, you haven't done any bookings yet
                <NavLink to="/booking"><Button style={{ marginTop: "25px" }} type="primary" size="large">BOOK NOW</Button></NavLink>
            </div>
        )
    }
}


export default MyBookings

