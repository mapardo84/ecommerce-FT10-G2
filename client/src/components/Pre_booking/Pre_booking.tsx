import { Affix, Collapse } from 'antd'
import { BADFLAGS } from 'node:dns'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBalance } from '../../actions/Booking/pre_booking_action'
import { supabase } from '../../SupaBase/conection'
import "./Pre_booking.less"

export const Pre_booking = () => {

    const { Panel } = Collapse;

    let local_Guests: any = localStorage.getItem("Check&Guests")
    local_Guests = JSON.parse(local_Guests)
    let local_Rooms: any = localStorage.getItem("Accomodation")
    local_Rooms = JSON.parse(local_Rooms)

    const pre_booking = useSelector((state: any) => state.pre_booking)
    const { user_data } = pre_booking
    const dispatch = useDispatch()

    const [balance, setBalance] = useState(0)
    useEffect(() => {
        if (supabase.auth.user()?.email) {
            dispatch(getUserBalance(supabase.auth.user()?.email))
        }
    }, [])

    useEffect(() => {
        if (user_data.length > 0) {
            setBalance(user_data[0].positive_balance)
        }
    }, [user_data])

    let total_price = 0

    if (local_Rooms) {
        if (local_Guests?.early_check ^ local_Guests?.late_check) {
            total_price = (local_Rooms?.total_price * local_Guests?.nights) + (local_Rooms?.total_price / 2)
        } else if (local_Guests?.early_check && local_Guests?.late_check) {
            total_price = (local_Rooms?.total_price * local_Guests?.nights) + local_Rooms?.total_price
        } else {

            total_price = local_Rooms?.total_price * local_Guests?.nights

        }
    }
    if (balance) {
        total_price = total_price - balance
    }

    return (
        <>
            <div className="prueba1243">
                <Affix offsetTop={110}>
                    <Collapse defaultActiveKey={['1']} >
                        <Panel header="My book" key="1">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <strong>Checkout : </strong>{local_Guests ? <span>{local_Guests.in_out[1]}</span> : <span>Seleccionando...</span>}
                                <strong>Guests : </strong>{local_Guests ? <span>{local_Guests.paxes}</span> : <span>Seleccionando...</span>}
                            </div>
                        </Panel>
                    </Collapse>
                </Affix>
            </div>

            {/* 

            <ul>
                <li>
                    <strong>Checkin : </strong>{local_Guests ? <span>{local_Guests.in_out[0]}</span> : <span>Seleccionando...</span>}</li>
                <li>
                    {local_Guests ? <span>checkin {local_Guests.in_out[0]}</span> : null}</li>

                <li>
                    <strong>Checkout : </strong>{local_Guests ? <span>{local_Guests.in_out[1]}</span> : <span>Seleccionando...</span>}</li>
                <li>
                    <strong>Guests : </strong>{local_Guests ? <span>{local_Guests.paxes}</span> : <span>Seleccionando...</span>}</li>
                <li>
                    <strong>Nights : </strong>{local_Guests ? <span>{local_Guests.nights}</span> : <span>Seleccionando...</span>}
                </li>
                <li>
                    <strong>Category & Type : </strong>{local_Rooms ? <span>{local_Rooms?.category_type.category.name} - {local_Rooms.category_type.type.name}</span> : <span>Seleccionando...</span>}
                </li>
                {local_Guests?.early_check ?
                    <li>
                        <strong> Early check-in : </strong><span> ${local_Rooms?.total_price ? local_Rooms.total_price / 2 : <div>Seleccionando...</div>}</span>
                    </li> : null}
                {local_Guests?.late_check ?
                    <li>
                        <strong>Late check-out : </strong><span> ${local_Rooms?.total_price ? local_Rooms.total_price / 2 : <div>Seleccionando...</div>}</span>
                    </li> : null}
                <li>
                    <strong>Unit Price : </strong>{local_Rooms ? <span>{local_Rooms.total_price}</span> : <span>Seleccionando...</span>}
                </li>

                <li>
                    <strong>Positive Balance :</strong>{balance}
                </li>
                <li>
                    <strong>Total Price : </strong>{local_Rooms ? <span>{total_price}</span> : <span>Seleccionando...</span>}
                </li>
            </ul> */}
        </>
    )
}
