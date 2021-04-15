import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooking_Pax } from '../../../actions/SearchBookings/action_searchBookings'

export const SearchBooking = () => {

    const dispatch = useDispatch()
    const bookingStore = useSelector((state: any) => state.booking_pax)
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        dispatch(getBooking_Pax())
    }, [dispatch])

    const onSearch=(values:any)=>{
        console.log(values)
    }

    const tirateUnPaso=()=>{
        const mapeo= bookingStore.booking_pax.map((e:any)=>console.log(e.booking_id))
    }

    return (
        <>
            <Input.Search style={{ display: "flex", margin: "auto", width: 200 }} onSearch={onSearch}></Input.Search>
            <Button onClick={tirateUnPaso}>asdasdsa</Button>
        </>
    )
}

