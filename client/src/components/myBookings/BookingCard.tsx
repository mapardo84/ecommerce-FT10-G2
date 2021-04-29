import React, { useState } from 'react'
import "./BookingCard.less"
import { BiCalendarCheck, BiCalendarX } from "react-icons/bi";
import { IconContext } from 'react-icons/';
import BookingDetails from './BookingDetails';
import { cancelUserBooking } from "../../actions/Booking/userBookings";
import { Button, Modal } from 'antd';
import { supabase } from '../../SupaBase/conection';
import { useDispatch } from 'react-redux';

const BookingCard = (userData: any) => {

    const dispatch = useDispatch()
    var { bookingId, checkin, checkout, roomNumber, category, type, totalPrice, actual, userId, moneyBack, status } = userData.userData

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModalCancel = () => {
        setIsCancelModalVisible(true)
    }

    const handleCancelModal = () => {
        setIsCancelModalVisible(false)
    }

    const bookingCancel = () => {
        dispatch(cancelUserBooking(bookingId, totalPrice, userId, moneyBack))
        setIsCancelModalVisible(false)
    }

    return (
        <div className="booking_Container">{!status &&
            <span className="booking_Cancelled">CANCELLED</span>}
            <IconContext.Provider value={{ size: '19px', style: { verticalAlign: 'top' } }}>
                <div className="booking_Title">BOOKING {bookingId}</div>

                <div className="booking_Row1">

                    <div className="booking_Category">
                        <div style={{ fontWeight: 550 }}>{category}</div>
                        <div>{type}</div>
                    </div>
                    <div style={{ fontWeight: 500 }} >ROOM {roomNumber}</div>
                </div>
                <div className="booking_Dates">
                    <div><BiCalendarCheck /><b style={{ fontWeight: 600 }}> Check In:</b> {checkin}</div>
                    <div><BiCalendarX /><b style={{ fontWeight: 600 }}>Check Out:</b> {checkout}</div>
                </div>
                <div className="booking_Price">TOTAL:  ${totalPrice}</div>
                <div className="booking_More" >

                    {actual && status ? <Button onClick={showModalCancel} type="primary">CANCEL</Button> : <Button></Button>}
                    <Button type="link" onClick={showModal}>More Details</Button>
                </div>

            </IconContext.Provider >

            <Modal
                footer={[<Button type="primary" onClick={handleCancel}>BACK</Button>]}
                className="booking_Modal"
                visible={isModalVisible}
                onCancel={handleCancel}>
                <BookingDetails userData={userData.userData} />
            </Modal>

            {/* CANCEL WARNING */}
            <Modal
                footer={[
                    <Button type="primary" onClick={handleCancelModal}>BACK</Button>,
                    <Button type="primary" onClick={bookingCancel}>CONFIRM</Button>
                ]}
                className="booking_Modal"
                visible={isCancelModalVisible}
                onCancel={handleCancelModal}>
                <h2>WARNING!</h2>
                {
                    moneyBack ?

                        <div>Are you sure you want to cancel this booking? The payment done will be added to your postive balance, this will be used in your next booking. This action cannot be undone. </div>
                        :
                        <div>Are you sure you want to cancel this booking? We will not refund any payment done. You are elegible to recieve the payment as positive balance if you cancel the reservation more than 7 days before the checkin date.</div>
                }
            </Modal>
        </div>
    )
}

export default BookingCard
