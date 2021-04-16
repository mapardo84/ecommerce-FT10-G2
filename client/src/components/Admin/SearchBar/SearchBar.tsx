import { Button, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooking_Pax } from '../../../actions/SearchBookings/action_searchBookings'

export const SearchBooking = () => {

    const dispatch = useDispatch()
    const { booking_pax } = useSelector((state: any) => state.booking_pax)
    const [booking, setBooking] = useState<any>(null)

    let table
    useEffect(() => {
        dispatch(getBooking_Pax())
    }, [dispatch])


    const onSearch = async(values: any) => {
        let culo=Number(values)
        setBooking(culo)    
    }

    const tirateUnPaso = async() => {
        await dispatch(getBooking_Pax(booking))
        console.log(booking_pax)
    }
    return (
        <>
            <Input.Search style={{ display: "flex", margin: "auto", width: 200 }} onSearch={onSearch}></Input.Search>
            
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
        </>
    )
                    }
