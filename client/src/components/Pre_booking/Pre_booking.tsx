import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBalance } from '../../actions/Booking/pre_booking_action'
import { supabase } from '../../SupaBase/conection'

export const Pre_booking = () => {

    let local_Guests: any = localStorage.getItem("Check&Guests")
    local_Guests=JSON.parse(local_Guests)
    let local_Rooms:any = localStorage.getItem("Accomodation")
    local_Rooms=JSON.parse(local_Rooms)
    
    const pre_booking = useSelector((state:any) => state.pre_booking)
    const {user_data}=pre_booking
    const dispatch = useDispatch()

    useEffect(() => {
        if(supabase.auth.user()?.email){
        dispatch(getUserBalance(supabase.auth.user()?.email))}
        console.log(supabase.auth.user()?.email)
    }, [])

    useEffect(() => {
        if(pre_booking){
        console.log(pre_booking)
        }
    }, [pre_booking])

    let total_price=0
    
    if(local_Rooms){
        if(local_Guests?.early_check ^ local_Guests?.late_check){
        total_price=(local_Rooms?.total_price * local_Guests?.nights) + (local_Rooms?.total_price / 2)
    }else if(local_Guests?.early_check && local_Guests?.late_check){
        total_price=(local_Rooms?.total_price * local_Guests?.nights) + local_Rooms?.total_price
    }else{
        total_price=local_Rooms?.total_price * local_Guests?.nights
       
    }}

    return (
        <>
            <ul>
                <li>
                    <strong>Checkin : {local_Guests?<span>{local_Guests.in_out[0]}</span>:<span>Seleccionando...</span>}</strong></li>
                <li>
                    <strong>Checkout :{local_Guests?<span>{local_Guests.in_out[1]}</span>:<span>Seleccionando...</span>}</strong></li>
                <li>
                    <strong>Guests : {local_Guests?<span>{local_Guests.paxes}</span>:<span>Seleccionando...</span>}</strong></li>
                <li>
                    <strong>Nights : {local_Guests?<span>{local_Guests.nights}</span>:<span>Seleccionando...</span>}</strong>
                </li>
                <li>
                    <strong>Category & Type :{local_Rooms?<span>{local_Rooms.category_type.category.name} - {local_Rooms.category_type.type.name}</span>:<span>Seleccionando...</span>}</strong>
                </li>
                <li>
                    <strong>Early check-in :{local_Guests?<span>{local_Guests.early_check.toString()}</span>:<span>Seleccionando...</span>}</strong>
                </li>
                <li>
                    <strong>Late check-out :{local_Guests?<span>{local_Guests.late_check.toString()}</span>:<span>Seleccionando...</span>}</strong>
                </li>
                <li>
                    <strong>Unit Price :{local_Rooms?<span>{local_Rooms.total_price}</span>:<span>Seleccionando...</span>}</strong>
                </li>
                <li>
                    <strong>Total Price :{local_Rooms?<span>{total_price}</span>:<span>Seleccionando...</span>}</strong>
                </li>
            </ul>
        </>
    )
}
