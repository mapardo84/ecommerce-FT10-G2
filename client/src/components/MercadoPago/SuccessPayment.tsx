import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { get_pre, post_pax_booking_payment } from '../../actions/Booking/pre_booking_action'
import {supabase} from '../../SupaBase/conection'
import { PaxValues } from '../booking/paxForm/PaxForm'
import './SuccessPayment.less'


export interface BookingValues{
    checkin:Date;
    checkout:Date;
    room_id:number;
    paxes_amount:number;
    paxTitular_id?:number;
}

export interface PaymentValues{
    totalPrice:number;
    booking_id?:number;
    payment_method:string;
    payment_status:string;
    preference_id:string
}


export function SuccessPayment() {




    const dispatch = useDispatch()
    const {pre_booking}  = useSelector((state:any) => state.pre_booking)    

    let preference_id:any;
    let payment_type:string;

    const paxInfo:PaxValues={
        uuid:"",
        first_name:"",
        last_name:"",   
        phone:"",     
        country:"",
        birth_date:new Date(),
        address:""
    }

    const bookingInfo:BookingValues={
        checkin:new Date(),
        checkout:new Date(),
        room_id:0,
        paxes_amount:0
        }

    const payment:PaymentValues={
        totalPrice:1,
        payment_method:"",
        payment_status:"Approved",
        preference_id,
    }

    const extras:{category:string;type:string}={
        category:"",
        type:""
    }

    const query= window.location.search
    const storage=localStorage.getItem("BookingInfo")

    useEffect(() => {
        dispatch(get_pre(preference_id))
        dispatch(post_pax_booking_payment(paxInfo,bookingInfo,payment))
        console.log(paxInfo,bookingInfo,payment)
    }, [])

    query.split("&")
    .map(e=>e.split("="))
    .filter(e=>{
        if(e[0]==="preference_id"){
            preference_id=e[1]
        }else if(e[0]==="payment_type"){
            payment.payment_method=e[1]
        }
    }
    )
    
    storage?.split(",")
    .map(e=>e.split(":"))
    .filter(e=>{
        if(e[0].includes("first_name")){
            let name:string=e[1].split('"')[1]
            paxInfo.first_name=name
        }else if(e[0].includes("last_name")){
            paxInfo.last_name=e[1].split('"')[1]
        }else if(e[0].includes("uuid")){
            paxInfo.uuid=e[1].split('"')[1] 
        }else if(e[0].includes("address")){
            paxInfo.address=e[1].split('"')[1]
        }else if(e[0].includes("country")){
            paxInfo.country=e[1].split('"')[1]
        }else if(e[0].includes("phone")){
            paxInfo.phone=e[1].split('"')[1]
        }else if(e[0].includes("birth_date")){
            paxInfo.birth_date=new Date(e[1].split("T")[0].split('"')[1])
        }
        else if(e[0].includes("checkin")){
            bookingInfo.checkin=new Date(e[1])
        }else if(e[0].includes("checkout")){
            bookingInfo.checkout=new Date(e[1])
        }else if(e[0].includes("room")){
            bookingInfo.room_id=Number(e[1])
        }else if(e[0].includes("paxes")){
            bookingInfo.paxes_amount=Number(e[1])
        }
        else if(e[0].includes("category")){
            extras.category=e[1]
        }else if(e[0].includes("type")){
            extras.type=e[1]
        }else if(e[0].includes("unit_price")){
            payment.totalPrice*=Number(e[1])
        }else if(e[0].includes("nights")){
            payment.totalPrice=Number(e[1])
        }
    })

   
    
    const onClick=()=>{
        localStorage.removeItem("BookingInfo")
        // dispatch(setBooking)
    }

    
    
    return (
        <>
             <div className="scc">
            {/*    {pre_booking[0]?.preference_id===preferenceId?
                <div>
                    <div className="pre_booking_title">
                    <h1>Booking Info</h1>        
                    </div>
                    <ul>
                        <li>
                        <strong>First Name:   </strong> {information.firstName.split('"')}
                        </li>
                        <li>
                        <strong>Last Name:   </strong>  {information.lastName.split('"')}
                        </li>
                        <li>
                        <strong>Uuid:   </strong>   {information.uuid.split('"')}
                        </li>
                        <li>
                        <strong>Checkin: </strong>    {information.checkin.split('"')}
                        </li>
                        <li>
                        <strong>Checkout: </strong>    {information.checkout.split('"')}
                        </li>
                        {/* <li>
                        <strong>Room: </strong>{information.room.split('"')}
                        </li> }
                        <li>
                        <strong>Category & type: </strong>    {information.category.split('"')} - {information.type.split('"')}
                        </li>
                        <li>
                        <strong>Total price: </strong>   U$D {Number(information.nights.split('"'))*Number(information.unit_price.split('"'))}
                        </li>
                        
                        
                    </ul>
                    <div className="pre_booking_confirm">
                    <Link to="/home">
                        <Button onClick={onClick}>GO HOME</Button>
                    </Link>
                    </div>
                        </div>:<div>Error, revisa tu e-mail para ver el detalle de la reserva</div>}*/}
            </div>
        </>
        
    )
    }
