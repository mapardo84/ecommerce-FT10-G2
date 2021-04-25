import { ConsoleSqlOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { strict } from 'node:assert'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { idText } from 'typescript'
import { delete_pre_booking, get_pre, post_pax_booking_payment } from '../../actions/Booking/pre_booking_action'
import {supabase} from '../../SupaBase/conection'
import { PaxValues } from '../booking/paxForm/PaxForm'
import './SuccessPayment.less'


export interface BookingValues{
    checkin:Date;
    checkout:Date;
    room_id:number;
    paxes_amount:number;
    paxTitular_id?:number;
    preference_id:string
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
    

    useEffect(() => {
        let preference_id:any;
        window.location.search.split("&")
            .map(e=>e.split("="))
            .filter(e=>{
            if(e[0].includes("preference_id")){
                preference_id=e[1]
                }
            }
        )
        dispatch(get_pre(preference_id))
        
        let str:any=localStorage.getItem("BookingInfo")
        if(str){
            str=JSON.parse(str)
        }

        if(str){
        const paxInfo:PaxValues={
            uuid:str.uuid,
            first_name:str.first_name,
            last_name:str.last_name,   
            phone:str.phone,     
            country:str.country[0],
            birth_date:new Date(str.birth_date),
            address:str.address
        }
    
        const bookingInfo:BookingValues={
            checkin:new Date(str.checkin),
            checkout:new Date(str.checkout),
            room_id:str.room_id,
            paxes_amount:str.paxes,
            preference_id
            }
    
        const payment:PaymentValues={
            totalPrice:str.nights * str.unit_price,
            payment_method:"mercadopago",
            payment_status:"Approved",
            preference_id,
        }

        dispatch(post_pax_booking_payment(paxInfo,bookingInfo,payment))}
        localStorage.removeItem("Check&Guests")
        localStorage.removeItem("Accomodation")
        dispatch(delete_pre_booking(supabase.auth.user()?.email))        
    }, [])

    let str:any=localStorage.getItem("BookingInfo")
        if(str){
            str=JSON.parse(str)
        }


    const onClick=()=>{
        localStorage.removeItem("BookingInfo")
    }

    
    
    return (
        <>
             {str?<div className="scc">
                 <h2>Booking Info</h2>
                 <br/>
                <div><strong>First name :</strong>{str.first_name}</div>
                <div><strong>Last name :</strong>{str.last_name}</div>
                <div><strong>Uuid :</strong>{str.uuid}</div>
                <div><strong>Paxes :</strong>{str.paxes}</div>
                <div><strong>Checkin :</strong>{str.checkin}</div>
                <div><strong>Checkout :</strong>{str.checkout}</div>
                <div><strong>Category & type of room</strong>{str.category} - {str.type}</div>
                <Link to="/home">
                    <br/>
                    <br/>
                    <Button onClick={onClick}>Finish booking</Button>
                </Link>
            </div>
            :
            <Link to="/home">
                <Button>Go Home Please</Button>    
            </Link>}
           
            
        </>
        
    )
    }
