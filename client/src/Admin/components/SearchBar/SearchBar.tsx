import { AutoComplete, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getByBookingID, getByPaxID, getFirstName, getLastName } from '../../../actions/SearchBookings/action_searchBookings'

export const SearchBooking = () => {

    const dispatch = useDispatch()
    const bookingStore = useSelector((state: any) => state.booking_pax)
    // const bookingStore={
    //     byFirstName:[{name:"Elba"},{name:"gila"}],
    //     byID:[{name:5},{name:10}],
    //     byLastName:[{name:"Gallo"},{name:"deMierda"}]
    // }
    const [search, setSearch] = useState("")



    useEffect(() => {
        
        dispatch(getByPaxID(search))
        dispatch(getByBookingID(search))
        dispatch(getFirstName(search))
        dispatch(getLastName(search))
    
    }, [dispatch, search])

    const onChange = (value: any) => {
        setSearch(value)

    }


    const renderTitle = (title:string) => (
        <span key={title}>
            {title}
        </span>
    );
    
    
    let i =0;
    const renderItem = (title:any) => {
        i++
        return({
        value: `${i}.${title}`,
        label: (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
            </div>
        ),
    });
    }
    

    const mapeoByPaxID = (array:any[]) => {
        return array?array.map((x) => renderItem(x.pax_id?.id)):[]
    }
    const mapeoByBookingId = (array:any[]) => {        
        return array?array.map((x) =>renderItem(x.booking_id?.id)):[]   
    }
    const mapeoByFirstName = (array:any[]) => {
        return array?array.map((x) =>renderItem(x.pax_id?.first_name)):[]
    }
    const mapeoByLastName = (array:any[]) => {
        return array?array.map((x) => renderItem(x.pax_id?.last_name)):[]
    }

    const options = [
        {
            label: renderTitle('By Pax'),
            options: mapeoByPaxID(bookingStore?.bypaxID)?mapeoByPaxID(bookingStore?.bypaxID):[],
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


    const onSelect = (value: any) => {
        console.log('onSelect', value);
        let selected = value.split('.')
        setSearch(selected[1])
        console.log('onSelect', value);
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
        >
            <Input.Search size="large" placeholder="input here" onSearch={onSelect}  enterButton />
        </AutoComplete>
    );
};