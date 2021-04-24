import React from 'react'

export const Pre_booking = () => {
    let local_Guests: any = localStorage.getItem("Check&Guests")
    local_Guests=JSON.parse(local_Guests)
    let local_Rooms:any = localStorage.getItem("Accomodation")
    local_Rooms=JSON.parse(local_Rooms)

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
                    <strong>Total Price :{local_Rooms?<span>{local_Rooms.total_price}</span>:<span>Seleccionando...</span>}</strong>
                </li>
            </ul>
        </>
    )
}
