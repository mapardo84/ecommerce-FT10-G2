import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getByBookingID, getByPaxID, getFirstName, getLastName } from '../../../actions/SearchBookings/action_searchBookings'

export const SearchBooking = () => {

    const dispatch = useDispatch()
    const bookingStore = useSelector((state: any) => state.booking_pax)

    // useEffect(() => {
    //     dispatch(getBooking_Pax(booking))
    // }, [dispatch])
    let booking:any;

    const onSearch=(values:any)=>{

            booking = values;

            console.log(`se seteo el booking STRING con ${values}`)

            dispatch(getFirstName(values))
            dispatch(getLastName(values))

            console.log(`se seteo el booking NUMBER con ${values}`)

            dispatch(getByBookingID(booking))
            dispatch(getByPaxID(booking))
        
    }

    const tirateUnPaso=()=>{
        // if(booking === bookingStore.booking_pax.id) {

        // }
        console.log(bookingStore)
    }

    return (
        <>
            <Input.Search style={{ display: "flex", margin: "auto", width: 200 }} onSearch={onSearch}></Input.Search>
            <Button onClick={tirateUnPaso}>STATE</Button>
            <div>RESERVAS</div>
            {
                
            }
            <div>ID PAX</div>
            {
                bookingStore?.bypaxID?.map( (book: any, i:number) => {
                    return (
                        <>
                        <div>Pax: {i}</div>
                        <div key={i}>{JSON.stringify(book)}</div>
                        </>
                    )
                })
                }
            <div>ID BOOKING </div>
            {
                bookingStore?.bybookingID?.map( (book: any, i:number) => {
                    return (
                        <>
                        <div>Reserva: {i}</div>
                        <div key={i}>{JSON.stringify(book)}</div>
                        </>
                    )
                })
                }
            <div>NOMBRE/APELLIDO</div>
            {
                bookingStore?.byFirstName?.map( (book: any, i: number) => {
                    return (
                        <>
                        <div>Pax {i}</div>
                        <div key={i}>First Name:{JSON.stringify(book)}</div>
                        </>
                    )
                })
                }
            {
                bookingStore?.byLastName?.map( (book: any, i: number) => {
                    return (
                        <>
                        <div>Pax {i}</div>
                        <div key={i}>Last Name:{JSON.stringify(book)}</div>
                        </>
                    )
                })
                }
        </>
    )
}

