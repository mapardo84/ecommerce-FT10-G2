import { CalendarOutlined, UserOutlined } from '@ant-design/icons'
import { Affix, Collapse, Divider } from 'antd'
import { BADFLAGS } from 'node:dns'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBalance } from '../../actions/Booking/pre_booking_action'
import { supabase } from '../../SupaBase/conection'
import "./Pre_booking.less"

export const Pre_booking = (type: any) => {

    var { type } = type;
    console.log("TYPE", type)

    const { Panel } = Collapse;


    const [guests, setGuests] = useState<any>(localStorage.getItem("Check&Guests"))
    const [acomodation, setAcomodation] = useState<any>(localStorage.getItem("Accomodation"))
    const pre_booking = useSelector((state: any) => state.pre_booking)
    const { user_data } = pre_booking
    const dispatch = useDispatch()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        setGuests((e: any) => JSON.parse(e))
        setAcomodation((e: any) => JSON.parse(e))
    }, [])


    useEffect(() => {
        if (supabase.auth.user()?.email) {
            dispatch(getUserBalance(supabase.auth.user()?.email))
        }
    }, [])

    useEffect(() => {
        if (user_data.length > 0) {
            setBalance(user_data[0].positive_balance)
        }
    }, [user_data])

    let total_price = 0

    if (acomodation) {
        if (guests?.early_check ^ guests?.late_check) {
            total_price = (acomodation?.total_price * guests?.nights) + (acomodation?.total_price / 2)
        } else if (guests?.early_check && guests?.late_check) {
            total_price = (acomodation?.total_price * guests?.nights) + acomodation?.total_price
        } else {

            total_price = acomodation?.total_price * guests?.nights

        }
    }
    if (balance) {
        total_price = total_price - balance
    }

    if (typeof guests === "string") {
        return <div></div>
    }

    if (type == 0) {
        return (
            <>
                <div className="containerBookingData">
                    <Affix offsetTop={100}>
                        <Collapse style={{ backgroundColor: "#5296a5", color: "white" }}>
                            <Panel style={{ color: "white" }} header="My booking" key="1">
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {guests ? <span><strong>Check-in:</strong> {guests.in_out[0]}</span> : null}
                                    {guests ? <span><strong>Check-out:</strong> {guests.in_out[1]}</span> : null}
                                    {guests ? <span><strong>Guests:</strong>  {guests.paxes}</span> : null}
                                    {guests ? <span><strong>Nights:</strong> {guests.nights}</span> : null}
                                    <span><strong>Category & Type : </strong>{acomodation ? <span>{acomodation?.category_type.category.name} - {acomodation.category_type.type.name}</span> : null}</span>

                                    <span>
                                        {guests?.early_check ?
                                            <span><strong> Early check-in : </strong><span> ${acomodation?.total_price ? acomodation.total_price / 2 : null}</span></span> : null}
                                    </span>

                                    <span>
                                        {guests?.late_check ?
                                            <span><strong>Late check-out : </strong><span> ${acomodation?.total_price ? acomodation.total_price / 2 : null}</span> </span> : null}
                                    </span>

                                    <span><strong>Unit Price : </strong>{acomodation ? <span>{acomodation.total_price}</span> : <span>Seleccionando...</span>}</span>

                                    <span><strong>Positive Balance :</strong>{balance}</span>

                                    <span><strong>Total Price : </strong>{acomodation ? <span>{total_price}</span> : null}</span>

                                </div>
                            </Panel>
                        </Collapse>
                    </Affix>
                </div>
            </>
        )

    } else {
        return (
            <div className="bookingPaymentContainer" >
                <h1 className="Login">MY BOOKING</h1>
                <Divider className="dividerBookingCard">Date</Divider>

                <div className="row1ContainerPayment">
                    {guests ? <span><strong>Check-in:</strong> {guests.in_out[0]}</span> : null}
                    {guests ? <span><strong>Check-out:</strong> {guests.in_out[1]}</span> : null}
                </div>

                <Divider className="dividerBookingCard">Info</Divider>

                <div className="row2ContainerPayment">
                    {guests ? <span className=""><UserOutlined /><strong> Guests:</strong>  {guests.paxes}</span> : null}
                    {guests ? <span><CalendarOutlined /><strong> Nights:</strong> {guests.nights}</span> : null}
                </div>

                <Divider className="dividerBookingCard">Accommodation</Divider>
                <div className="row3ContainerPayment" >
                    <span><strong>Category & Type   : </strong>{acomodation ? <span>{acomodation?.category_type.category.name} - {acomodation.category_type.type.name}</span> : null}</span>

                    <span>
                        {guests?.early_check ?
                            <span><strong> Early check-in: </strong><span> ${acomodation?.total_price ? acomodation.total_price / 2 : null}</span></span> : null}
                    </span>

                    <span>
                        {guests?.late_check ?
                            <span><strong>Late check-out: </strong><span> ${acomodation?.total_price ? acomodation.total_price / 2 : null}</span> </span> : null}
                    </span>
                </div>

                <Divider className="dividerBookingCard">Payment</Divider>

                <div className="row4ContainerPayment">
                    <span><strong>Positive Balance: </strong>${balance}</span>
                    <span><strong>Unit Price: </strong>{acomodation ? <span>${acomodation.total_price}</span> : null}</span>
                </div>
                <br />
                <div className="row5ContainerPayment">
                    <span><strong>Total Price: </strong>{acomodation ? <span>${total_price}</span> : null}</span>
                </div>

            </div>
        )
    }

}




{/* <ul>
                <li>
                    <strong>Checkin : </strong>{guests ? <span>{guests.in_out[0]}</span> : <span>Seleccionando...</span>}</li>
                <li>
                    {guests ? <span><strong>Checkin</strong> {guests.in_out[0]}</span> : null}</li>

                <li>
                    <strong>Checkout : </strong>{guests ? <span>{guests.in_out[1]}</span> : <span>Seleccionando...</span>}</li>
                <li>
                    <strong>Guests : </strong>{guests ? <span>{guests.paxes}</span> : <span>Seleccionando...</span>}</li>
                <li>
                    <strong>Nights : </strong>{guests ? <span>{guests.nights}</span> : <span>Seleccionando...</span>}
                </li>
                <li>
                    <strong>Category & Type : </strong>{acomodation ? <span>{acomodation?.category_type.category.name} - {acomodation.category_type.type.name}</span> : <span>Seleccionando...</span>}
                </li>
                {guests?.early_check ?
                    <li>
                        <strong> Early check-in : </strong><span> ${acomodation?.total_price ? acomodation.total_price / 2 : <div>Seleccionando...</div>}</span>
                    </li> : null}
                {guests?.late_check ?
                    <li>
                        <strong>Late check-out : </strong><span> ${acomodation?.total_price ? acomodation.total_price / 2 : <div>Seleccionando...</div>}</span>
                    </li> : null}
                <li>
                    <strong>Unit Price : </strong>{acomodation ? <span>{acomodation.total_price}</span> : <span>Seleccionando...</span>}
                </li>

                <li>
                    <strong>Positive Balance :</strong>{balance}
                </li>
                <li>
                    <strong>Total Price : </strong>{acomodation ? <span>{total_price}</span> : <span>Seleccionando...</span>}
                </li>
            </ul> */}