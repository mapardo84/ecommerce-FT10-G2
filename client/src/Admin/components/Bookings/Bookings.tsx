import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataBooking, getBookingsId, getPayments, getPaxId } from '../../actions/bookingsActions'

export let loading = false;

export const Bookings = () => {

    // const filterData = (data: any) => {
    //     return data.map((book: any) => {
    //         return { text: book.id, value: book.id }
    //     })
    // }
    
        const storeBooking= useSelector((state:any) => state?.bookingsAdminR)
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'booking_id',
            key: 'booking_id',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.id}</>),
            // filters: filterData(storeBooking.bookings),
            // onFilter: (value: any, books: any) => {
            //     return books.booking_id === value
            // }
        },
        {
            title: 'First Name',
            dataIndex: 'pax_id',
            key: 'firstname',
            render: (pax_id: number) => (<>{storeBooking?.paxes?.find((pax: any) => pax.id === pax_id)?.first_name}</>),
            // sorter: (a: any, b: any) => a.name - b.name,
        },
        {
            title: 'Last Name',
            dataIndex: 'pax_id',
            key: 'lastname',
            render: (pax_id: number) => (<>{storeBooking?.paxes?.find((pax: any) => pax.id === pax_id)?.last_name}</>)
        },
        {
            title: 'UUID',
            dataIndex: 'pax_id',
            key: 'uuid',
            render: (pax_id: number) => (<>{storeBooking?.paxes?.find((pax: any) => pax.id === pax_id)?.uuid}</>)
        },
        {
            title: 'Titular',
            dataIndex: 'pax_id',
            key: 'titular',
            render: (pax_id: number, booking_id: any) => { 
                    let actualBooking = storeBooking?.bookings?.find((book: any) => book.id === booking_id?.booking_id)
                        if(actualBooking?.paxTitular_id === pax_id) {
                            return (<div>Yes</div>)
                        } else {
                            return (<div>No</div>)
                        }
        }
        },
        {
            title: 'Check In',
            dataIndex: 'booking_id',
            key: 'checkin',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.checkin}</>)
        },
        {
            title: 'Check Out',
            dataIndex: 'booking_id',
            key: 'checkout',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.checkout}</>)
        },
        {
            title: 'Room',
            dataIndex: 'booking_id',
            key: 'roomname',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.rooms?.name}</>),
            // filters: filterData(storeBooking?.bookings),
            // onFilter: (value: any, books: any) => {
            //     return books.booking_id === value
            // }
        },
        {
            title: 'Category',
            dataIndex: 'booking_id',
            key: 'categoryname',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.rooms?.category_id?.name}</>)
        },
        {
            title: 'Type',
            dataIndex: 'booking_id',
            key: 'typename',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.rooms?.type_id?.name}</>)
        },
        {
            title: 'Status',
            dataIndex: 'booking_id',
            key: 'payment_status',
            render: (booking_id: number) => (<>{storeBooking?.payments?.find((book: any) => book.booking_id === booking_id)?.payment_status}</>)
        },
        {
            title: 'Total Price',
            dataIndex: 'booking_id',
            key: 'totalPrice',
            render: (booking_id: number) => (<>{storeBooking?.payments?.find((book: any) => book.booking_id === booking_id)?.totalPrice}</>)
        },

    ]

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        //all bookings
        //all categories
        //all types
        //all rooms
        //all booking_pax
        //all paxes
        dispatch(getDataBooking('all')) //BOOKING_PAX
        dispatch(getBookingsId()) //BOOKINGS    
        dispatch(getPayments()) //PAYMENTS
        dispatch(getPaxId()) //PAXES
        // setState({...state, data: bkStore.paxesData})
    }, [dispatch])
    
    useEffect(()=> {
        if(storeBooking?.bookingPax?.length > 0 && storeBooking?.bookings?.length> 0 && storeBooking?.paxes?.length > 0 && storeBooking?.payments?.length > 0) {
            setLoading(false)
        }
    }, [storeBooking.bookingPax, storeBooking.bookings, storeBooking.paxes, storeBooking.payments ])

    const onSelectAll = () => {
        dispatch(getDataBooking('all'))
    }

    const onSelectNext = () => {
        dispatch(getDataBooking('next'))
    }
    const onSelectPrev = () => {
        dispatch(getDataBooking('prev'))
    }
            

    


    
    return (
        <>
        <h1>Seeee</h1>
        <Button onClick={onSelectPrev}>Previus Reservations</Button>
        <Button onClick={onSelectAll}>All</Button>
        <Button onClick={onSelectNext}>Pending Reservations</Button>
        
           <Table 
           columns={columns} 
           dataSource={storeBooking?.bookingPax} 
           loading={loading}
           />
        
        </>
    )
}