import { Button, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getByBookingID, getByPaxID, getFirstName, getLastName } from '../../../actions/SearchBookings/action_searchBookings'

export const SearchBooking = () => {

    const dispatch = useDispatch()
<<<<<<< HEAD
    const { booking_pax } = useSelector((state: any) => state.booking_pax)
    const [booking, setBooking] = useState<any>(null)

    let table
    useEffect(() => {
        dispatch(getBooking_Pax())
    }, [dispatch])


    const onSearch = async(values: any) => {
        let culo=Number(values)
        setBooking(culo)    
=======
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
>>>>>>> malena
    }

    const tirateUnPaso = async() => {
        await dispatch(getBooking_Pax(booking))
        console.log(booking_pax)
    }
    return (
        <>
            <Input.Search style={{ display: "flex", margin: "auto", width: 200 }} onSearch={onSearch}></Input.Search>
<<<<<<< HEAD
            
            <Button onClick={tirateUnPaso}>asdasdsa</Button>
            <div style={{display:"flex",margin:"auto",padding:"25px"}}>
                {/* <ul>
                    { booking_pax?.map((e: any) => (
                        <>
                            <li>
                                <div>Checkin:  <strong>{e.booking_id.checkin}</strong></div>
                            </li>
                            <li>
                                <div>Checkout:   <strong>{e.booking_id.checkout}</strong></div>
                            </li>
                            <li>
                                <div>Room:   <strong>{e.booking_id.room_id.name}</strong></div>
                            </li>
                            <li>    
                                <div>Pax_Name:   <strong>{e.pax_id.first_name}</strong></div>
                            </li>
                            <li>
                                <div>Pax_Lastname:  <strong> {e.pax_id.last_name}</strong></div>                        
                            </li>
                            <hr/>
                            <hr/>
                            <hr/>
                        </>
                        
                    ))}
                </ul> */}
            </div>
=======
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
>>>>>>> malena
        </>
    )
                    }
