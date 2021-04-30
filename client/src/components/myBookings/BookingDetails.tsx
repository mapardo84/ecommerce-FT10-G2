import { /*Button, Modal,*/ Divider } from 'antd'
import React /*,{ useState }*/ from 'react'
import { IconContext } from 'react-icons'
import { BiCalendarCheck, BiCalendarX } from 'react-icons/bi'
import "./BookingDetails.less"

const BookingDetails = (userData: any) => {

    var { bookingId, checkin, checkout, roomNumber, category, type, totalPrice, paxes, paymentMethod } = userData.userData
    console.log(userData.userData)

    return (
        <IconContext.Provider value={{ size: '19px', style: { verticalAlign: 'top' } }}>
            <div className="booking_Title">BOOKING {bookingId}</div>
            <Divider className="booking_Dividers">ROOM INFORMATION</Divider>
            <div className="room_Container">
                <div>
                    <div style={{ display: "flex" }}><div className="details_Titles">Room:</div>{roomNumber}</div>
                    <div style={{ display: "flex" }}><div className="details_Titles">Guests Amount:</div>{paxes}</div>
                </div>
                <div>
                    <div style={{ display: "flex" }}><div className="details_Titles">Type:</div>{type}</div>
                    <div style={{ display: "flex" }}><div className="details_Titles">Category:</div>{category}</div>
                </div>
            </div>
            <Divider className="booking_Dividers">Dates</Divider>
            <div className="booking_Dates">
                <div><BiCalendarCheck /><b style={{ fontWeight: 600 }}> Check In:</b> {checkin}</div>
                <div><BiCalendarX /><b style={{ fontWeight: 600 }}>Check Out:</b> {checkout}</div>
            </div>
            <Divider className="booking_Dividers">Payment</Divider>
            <div className="payment_DetailsContainer"> 
                <div style={{ display: "flex" }}><div className="details_Titles">Payment Method: </div>{paymentMethod}</div>
                <div style={{ display: "flex" }}><div className="details_Titles">Total Price: </div>${totalPrice}</div>
            </div>
        </IconContext.Provider >

    )
}

export default BookingDetails
