import { BADFLAGS } from 'node:dns'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBalance } from '../../actions/Booking/pre_booking_action'
import { supabase } from '../../SupaBase/conection'

export const Pre_booking = () => {


    const [guests, setGuests] = useState<any>(localStorage.getItem("Check&Guests"))
    const [acomodation, setAcomodation] = useState<any>(localStorage.getItem("Accomodation"))
    const pre_booking = useSelector((state:any) => state.pre_booking)
    const {user_data}=pre_booking
    const dispatch = useDispatch()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        setGuests((e:any)=>JSON.parse(e))
        setAcomodation((e:any)=>JSON.parse(e))
    }, [])


    useEffect(() => {
        if(supabase.auth.user()?.email){
            dispatch(getUserBalance(supabase.auth.user()?.email))
        }
    }, [])

    useEffect(() => {
        if(user_data.length>0){
            setBalance(user_data[0].positive_balance)
          }
    }, [user_data])


    // useEffect(() => {
    //     if(pre_booking){
    //     console.log(pre_booking)
    //     }
    // }, [pre_booking])

    let total_price=0
    
    if(acomodation){
        console.log(acomodation.original_price)
        if(guests?.early_check ^ guests?.late_check){
        total_price=(acomodation?.total_price * guests?.nights) + (acomodation?.original_price / 2)
    }else if(guests?.early_check && guests?.late_check){
        total_price=(acomodation?.total_price * guests?.nights) + acomodation?.original_price
    }else{
        
        total_price=acomodation?.total_price * guests?.nights
      
      } 
    }
    if(balance){
        if(total_price-balance<0){
            total_price=0
        }else{
            total_price=total_price-balance
        }
    }
    if(typeof guests==="string"){
       return <div> asd </div>
    }
    // console.log(JSON.parse(guests))
    return (
        <>
            <ul>
                <li>
                    <strong>Checkin : </strong>{guests?<span>{guests?.in_out[0]}</span>:<span>Seleccionando...</span>}</li>
                <li>
                    <strong>Checkout : </strong>{guests?<span>{guests?.in_out[1]}</span>:<span>Seleccionando...</span>}</li>
                <li>
                    <strong>Guests : </strong>{guests?<span>{guests?.paxes}</span>:<span>Seleccionando...</span>}</li>
                <li>
                    <strong>Nights : </strong>{guests?<span>{guests?.nights>0?guests?.nights:1}</span>:<span>Seleccionando...</span>}
                </li>
                <li>
                    <strong>Category & Type : </strong>{acomodation?<span>{acomodation?.category_type.category.name} - {acomodation?.category_type.type.name}</span>:<span>Seleccionando...</span>}
                </li>
                {guests?.early_check?
                <li>
                    <strong> Early check-in : </strong><span> ${acomodation?acomodation.original_price/2:<div>Seleccionando...</div>}</span>
                </li>:null}
                {guests?.late_check?
                <li>
                    <strong>Late check-out : </strong><span> ${acomodation?acomodation.original_price/2:<div>Seleccionando...</div>}</span>
                </li>:null}
                <li>
                    <strong>Unit Price : </strong>{acomodation?<span>{acomodation?.total_price}</span>:<span>Seleccionando...</span>}
                </li>
                
                <li>
                    <strong>Positive Balance :</strong>{balance}
                </li>
                <li>
                    <strong>Total Price : </strong>{acomodation ?<span>{total_price}</span>:<span>Seleccionando...</span>}
                </li>
            </ul>
        </>
    )
}
