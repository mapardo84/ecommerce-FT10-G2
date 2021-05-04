import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { delete_pre_booking, get_pre, post_pax_booking_payment, update_balance } from '../../actions/Booking/pre_booking_action'
import { supabase } from '../../SupaBase/conection'
import { PaxValues } from '../booking/paxForm/PaxForm'
import './SuccessPayment.less'
import { FiCheckCircle } from "react-icons/fi";
import { IconContext } from 'react-icons'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'


export interface BookingValues {
    checkin: Date;
    checkout: Date;
    early_checkin: boolean;
    late_checkout: boolean;
    room_id: number;
    paxes_amount: number;
    paxTitular_id?: number;
}

export interface PaymentValues {
    totalPrice: number;
    booking_id?: number;
    payment_method: string;
    payment_status: string;
}

export interface ConfirmationEmail {
    first_name: string;
    last_name: string;
    uuid: string;
    country: string;
    category: string;
    type: string;
    checkin: Date;
    checkout: Date;
    paxes: number;
    email: string | undefined
}


export function SuccessPayment() {
    const dispatch = useDispatch()


    useEffect(() => {

        if (Number(localStorage.getItem("total_price")) > 0) {
            dispatch(update_balance(supabase.auth.user()?.email, 0))
        }
        let preference_id: any;
        window.location.search.split("&")               //Seteo el preference id proveniente del param
            .map(e => e.split("="))
            .filter(e => e[0].includes("preference_id") ? preference_id = e[1] : null)

        if (preference_id) {                 //Si existe, despacho la creacion de la reserva directamente corroborando que haya id de booking en el storage
            dispatch(get_pre(preference_id))
        }


        let str: any = localStorage.getItem("BookingInfo")
        if (str) {
            str = JSON.parse(str)
        }

        if (str) {
            const paxInfo: PaxValues = {
                uuid: str.uuid,
                first_name: str.first_name,
                last_name: str.last_name,
                phone: str.phone,
                country: str.country,
                birth_date: new Date(str.birth_date),
                address: str.address
            }

            const bookingInfo: BookingValues = {
                checkin: new Date(str.checkin),
                checkout: new Date(str.checkout),
                early_checkin: str.early_checkin,
                late_checkout: str.late_checkout,
                room_id: str.room_id,
                paxes_amount: str.paxes,
            }
            const pay_with_balance: PaymentValues = {
                totalPrice: localStorage.getItem("payWithBalance") ? Number(localStorage.getItem("payWithBalance")) : 0,
                payment_method: "Positive Balance",
                payment_status: "Approved",
            }

            const payment: PaymentValues = {
                totalPrice: Number(localStorage.getItem("total_price")) !== 0 ? Number(localStorage.getItem("total_price")) : 0,
                payment_method: "mercadopago",
                payment_status: "Approved",
            }

            const email: ConfirmationEmail = {
                first_name: str.first_name,
                last_name: str.last_name,
                uuid: str.uuid,
                country: str.country,
                checkin: str.checkin,
                checkout: str.checkout,
                category: str.category,
                type: str.type,
                paxes: str.paxes,
                email: supabase.auth.user()?.email
            }
            console.log(str.country)



            if (localStorage.getItem("payWithBalance") && localStorage.getItem("payWithBalance")) {
                console.log(payment)
                dispatch(post_pax_booking_payment(paxInfo, bookingInfo, email, payment, pay_with_balance))
            } else {
                dispatch(post_pax_booking_payment(paxInfo, bookingInfo, email, payment))
            }
        }
        localStorage.removeItem("Check&Guests")
        localStorage.removeItem("Accomodation")
        localStorage.removeItem("total_price")
        localStorage.removeItem("payWithBalance")

        dispatch(delete_pre_booking(supabase.auth.user()?.email))
    }, [dispatch])

    let str: any = localStorage.getItem("BookingInfo")
    if (str) {
        str = JSON.parse(str)
    }

    useEffect(() => {
        return () => {

            localStorage.removeItem("BookingInfo")
            localStorage.removeItem("Unique_id")
            localStorage.removeItem("Payment")
            localStorage.removeItem("WithBalance")
        };
    }, []);


    return (
        <>
            {/* {str ? */}
            <div className="ContainerBookingSuccess">
                <div style={{ display: "flex" }}>
                    <IconContext.Provider value={{ color: 'green', size: '40px', style: { verticalAlign: 'middle' } }}>
                        <FiCheckCircle />
                    </IconContext.Provider>
                    <div className="bookingSuccessTitle">BOOKING CONFIRMED</div>
                </div>
                <div className="bookingsuccessText">An email was sent with your booking information</div>
                <br />
                <h2>Details</h2>
                <br />
                <div className="bookingSuccessDetails">
                    <div><strong>First name :</strong>{str?.first_name}</div>
                    <div><strong>Last name :</strong>{str?.last_name}</div>
                    <div><strong>Uuid :</strong>{str?.uuid}</div>
                    <div><strong>Paxes :</strong>{str?.paxes}</div>
                    <div><strong>Checkin :</strong>{str?.checkin}</div>
                    <div><strong>Checkout :</strong>{str?.checkout}</div>
                    <div><strong>Category & type of room</strong>{str?.category} - {str?.type}</div>
                </div>
                <div style={{ textAlign: "center" }}><NavLink to="/myBookings"><Button type="primary">BOOKINGS</Button></NavLink></div>
            </div>
            {/* :
                <Redirect to="/home"></Redirect>} */}
        </>

    )
}
