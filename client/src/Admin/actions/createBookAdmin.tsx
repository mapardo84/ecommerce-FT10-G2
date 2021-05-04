import { supabase } from "../../SupaBase/conection"
import { Dispatch } from 'react'
import { categoryType } from '../../components/booking/accomodationsSelect/AccomodationsSelect';
import { getBookingsId, getDataBooking, getPaxId, getPayments } from "./bookingsActions";

export const GET_CATEGORIES_AD = 'GET_CATEGORIES_AD'
export const GET_TYPES_AD = 'GET_TYPES_AD'
export const GET_PAX_INFO = 'GET_PAX_INFO'
export const LETS_BOOK_ROOM = 'LETS_BOOK_ROOM'
export const FREE_ROOMS = 'FREE_ROOMS'
export const successMSG = 'Your booking has been successful!'
export const errorMSG = 'Something went wrong! Please, try again!'

export const searchOrCreatePax = (iden: any) => {
    console.log(iden)
    return async (dispatch: Dispatch<any>) => {
        const { data }: any = await supabase
            .from('paxes')
            .select('*')
            .eq('uuid', `${iden}`)
        console.log(data)
        if (data) {
            dispatch(getPaxInfo(data))
        } else {
            dispatch(getPaxInfo(null))
        }
    }
}


const getPaxInfo = (payload: any) => {
    return {
        type: GET_PAX_INFO,
        payload
    }
}

export const getCategoriesForSelect = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data }: any = await supabase
                .from("categories")
                .select(`*`)
            dispatch(dataCategories(data))

            const types: any = await supabase
                .from("types")
                .select(`*`)
            dispatch(dataTypes(types.data))


        } catch (e) {
            console.log(e)
        }
    }
}
// ACTION EJECUTADA POR EL BOTON NEXT DEL COMPONENTE GUEST FORM

export const getRoomsAvailable = (guests: number, range: string[]) => {
    console.log(guests, range)
    return async (dispatch: Dispatch<any>) => {
        let checkin = range[0]
        let checkout = range[1]
        //Traer los Types que cumple con el criterio de guests
        const { data: types } = await supabase
            .from("types")
            .select("*")
            .gte("capacity", guests);



        //Traer los Rooms que pertencen a los types recibidos en el paso anterior
        let rooms: any = [];
        if (types?.length) {
            for (let i = 0; i < types.length; i++) {
                const { data: room } = await supabase
                    .from("rooms")
                    .select('*')
                    .eq("type_id", types[i].id);
                if (!room) return
                rooms = [...rooms, ...room]
            }
        }

        //bookings entre las 2 fechas

        const { data: booki } = await supabase
            .from("bookings")
            .select('*')
            .eq('status', true)
            .gte('checkout', checkin)
            .lte('checkin', checkout)
        console.log("bookings", booki)
        let habitacionesDescartadas: any = []
        booki?.forEach((book: any) => {
            if (!habitacionesDescartadas.includes(book.room_id)) {
                habitacionesDescartadas.push(book.room_id)
            }
        })

        const freeRooms = rooms?.filter((room: any) =>
            (!habitacionesDescartadas.includes(room.id))
        )

        if (!freeRooms) return

        //Seleccionar categorias correspondientes a los rooms libres
        let result: any = []
        let resultTypes: any = []
        for (let i = 0; i < freeRooms.length; i++) {

            if (!result.some((x: categoryType) => x.id === freeRooms[i].category_id)) {
                let { data: categories } = await supabase
                    .from('categories')
                    .select('*')
                    .eq("id", freeRooms[i].category_id);
                result.push(categories?.pop());
                //console.log('Categories: ', categories?.pop())
            }

            if (!resultTypes.some((x: any) => x.id === freeRooms[i].type_id)) {
                let { data: typesResults } = await supabase
                    .from('types')
                    .select('*')
                    .eq("id", freeRooms[i].type_id);
                resultTypes.push(typesResults?.pop());
            }

        }

        console.log(result)

        dispatch(dataTypes(resultTypes))
        dispatch(dataCategories(result));
        dispatch(dataFreeRooms(freeRooms));
    }
}

const dataFreeRooms = (payload: any) => {
    return {
        type: FREE_ROOMS,
        payload
    }
}


const dataTypes = (payload: any) => {
    return {
        type: GET_TYPES_AD,
        payload
    }
}

const dataCategories = (payload: any) => {
    return {
        type: GET_CATEGORIES_AD,
        payload
    }
}

// export interface IFinfoBookPax {
//     uuid : string,
//     first_name : string,
//     category: number,
//     type: number,
//     last_name: string,
//     phone: string,
//     country: string[],
//     address: string,
//     birth_date: any,
//     guests: string | number,
//     early_check: any,
//     late_check: any,
//     id: string,
//     'range-picker': string[]
// }

export interface payment {
    payment_status: string,
    totalPrice: string | number,
    payment_method: string
}

export const finalCreateBooking = (infoBookPax: any, { payment_status, totalPrice, payment_method }: payment, room: string | number) => {
    console.log(infoBookPax)
    const { uuid,
        first_name,
        last_name,
        phone,
        country,
        address,
        birth_date,
        guests,
        early_check,
        late_check,
        id } = infoBookPax

    const checkin = infoBookPax['range-picker'][0]
    const checkout = infoBookPax['range-picker'][1]


    return async (dispatch: Dispatch<any>) => {
        let paxid = id;

        let paxCreate: any;

        if (!id) {

            paxCreate = await supabase
                .from('paxes')
                .insert({
                    uuid,
                    first_name,
                    last_name,
                    phone,
                    country: country[0],
                    birth_date: birth_date,
                    address
                })

            console.log(paxCreate)

            paxid = paxCreate.data[0].id

        }
        console.log(paxid)

        const { data: booking } = await supabase
            .from('bookings')
            .insert([
                {
                    checkin,
                    checkout,
                    room_id: room,
                    paxes_amount: guests,
                    paxTitular_id: paxid,
                    status: true,
                    early_check,
                    late_check
                }
            ])

        if (booking) {
            const { error } = await supabase
                .from('booking_pax')
                .insert([
                    {
                        pax_id: paxid,
                        booking_id: booking[0].id
                    }
                ])

            if (!error) {
                await supabase
                    .from('payments')
                    .insert([
                        {
                            totalPrice,
                            booking_id: booking[0].id,
                            payment_status,
                            payment_method,
                            preference_id: booking[0].id
                        }
                    ])
                dispatch(successfulMSG(true))
            }

        }



        dispatch(getDataBooking('all', false, false)) //BOOKING_PAX
        dispatch(getBookingsId()) //BOOKINGS    
        dispatch(getPayments()) //PAYMENTS
        dispatch(getPaxId()) //PAXES

    }

}

export const successfulMSG = (payload: boolean) => {
    return {
        type: successMSG,
        payload

    }
}


export const inactiveBooking = (id: number) => {
    console.log(id)
    return async (dispatch: Dispatch<any>) => {
        await supabase
            .from('bookings')
            .update({ status: false })
            .eq('id', id)

        // dispatch(getDataBooking('all')) //BOOKING_PAX
        dispatch(getBookingsId()) //BOOKINGS    
    }
}