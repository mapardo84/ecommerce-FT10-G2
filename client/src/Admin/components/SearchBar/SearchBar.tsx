import { AutoComplete, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataBooking } from '../../actions/bookingsActions';
import { getByBookingID,  getByPaxUuid, getFirstName, getLastName } from '../../actions/searchBarActions'

export const SearchBooking = () => {

    const dispatch = useDispatch()
    const bookingStore = useSelector((state: any) => state.booking_pax)
    
    const [search, setSearch] = useState("")
    
    useEffect(() => {
        
        // dispatch(getByPaxID(search))
        dispatch(getByPaxUuid(search))
        dispatch(getByBookingID(search))
        dispatch(getFirstName(search))
        dispatch(getLastName(search))

        
        // dispatch(getDataBooking('not', selected[0], search))
        
    }, [dispatch, search])

    const onChange = (value: string) => {
        if(value === '') {
            // dispatch(getDataBooking('all', false, false))
        }
        setSearch(value)
        console.log(value)
        // let selected = value.split('.')
        // console.log(selected)
        // console.log('onSelect', search);
        // dispatch(getDataBooking('not', selected[0], selected[2]))
    }

    const renderTitle = (title:string) => (
        <span key={title}>
            {title}
        </span>
    );
    
    
    let i = 0;
    const renderItem = (title:string | number, label: string ) => {
        i++
        return({
        value: `${label}.${i}.${title}`,
        label: (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {title}
            </div>
        ),
    });
    }
    

    const mapeoByPaxUUID = (array:any[]) => {
        return array?array.map((x) => renderItem(x?.uuid, 'uuid')):[]
    }
    const mapeoByBookingId = (array:any[]) => {        
        return array?array.map((x) =>renderItem(x.booking_id?.id, 'booking_id')):[]   
    }
    const mapeoByFirstName = (array:any[]) => {
        return array?array.map((x) =>renderItem(x?.first_name, 'first_name')):[]
    }
    const mapeoByLastName = (array:any[]) => {
        return array?array.map((x) => renderItem(x?.last_name, 'last_name')):[]
    }

    const options = [
        {
            label: renderTitle('By Pax UUID'),
            options: mapeoByPaxUUID(bookingStore?.byLastUuid)?mapeoByPaxUUID(bookingStore?.byLastUuid):[],
        },
        {
            label: renderTitle('By Booking'),
            options: mapeoByBookingId(bookingStore?.bybookingID)?mapeoByBookingId(bookingStore?.bybookingID):[],
        },
        {
            label: renderTitle('By First Name'),
            options: mapeoByFirstName(bookingStore?.byFirstName),
        },
        {
            label: renderTitle('By Last Name'),
            options: mapeoByLastName(bookingStore?.byLastName)
        },
    ];

    const onSelect = (value: string) => {
        console.log('onSelect', value);
        let selected = value.split('.')
        console.log(selected)
        setSearch('')
        console.log('onSelect', search);
        dispatch(getDataBooking('not', selected[0], selected[2]))
    };
    

    return (
        <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
                width: 300,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={onChange}
            value={search}
            placeholder="Search Booking"
        >
            {/* <Input.Search size="large" placeholder="Search Booking" onSearch={onChange} enterButton /> */}
        </AutoComplete>
    );
};