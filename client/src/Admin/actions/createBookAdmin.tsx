import { supabase } from "../../SupaBase/conection"
import { Dispatch } from 'react'
import { categoryType, roomType } from '../../components/booking/accomodationsSelect/AccomodationsSelect';
import { getBookingsId, getDataBooking, getPaxId, getPayments } from "./bookingsActions";

export const GET_CATEGORIES_AD = 'GET_CATEGORIES_AD'
export const GET_TYPES_AD = 'GET_TYPES_AD'
export const GET_PAX_INFO = 'GET_PAX_INFO'
export const LETS_BOOK_ROOM = 'LETS_BOOK_ROOM'
export const FREE_ROOMS = 'FREE_ROOMS'

export const searchOrCreatePax = (iden: any ) => {
    console.log(iden)
    return async (dispatch: Dispatch<any>) => {
        const {data}:any = await supabase
            .from('paxes')
            .select('*')
            .eq('uuid', `${iden}`)
            console.log(data)
            if(data) {
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
    return async ( dispatch: Dispatch<any> ) =>{
        try {
            const {data}:any=await supabase
            .from("categories")
            .select(`*`)
            dispatch(dataCategories(data))

            const types :any=await supabase
            .from("types")
            .select(`*`)
            dispatch(dataTypes(types.data))

            
        } catch (e) {
          console.log(e)
        }
    }
}

// export const fastFilterCategories = (guests:number) => {
//     return async ( dispatch: Dispatch<any> ) => {
//         //Traer los Types que cumple con el criterio de guests
//         const { data: types } = await supabase
//         .from("types")
//         .select("*")
//         .gte("capacity", guests );
//         dispatch(dataTypes(types))
// }
// }
// ACTION EJECUTADA POR EL BOTON NEXT DEL COMPONENTE GUEST FORM

export const getRoomsAvailable = (guests: number, range:string[]) => {
    console.log(guests, range)
    return async (dispatch: any) => {
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

        const freeRooms = rooms?.filter((room: any) => {
            if (!habitacionesDescartadas.includes(room.id)) {
                return room
            }
        })

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
    // user                     checkin                   checkout
    // room      ckin   ckout
    // room             ckin               ckout
    // room                         ckin            ckout
    // room                                ckin                    ckout
    // room                                                 ckin            ckout
}

const dataFreeRooms = (payload: any) => {
    return {
        type: FREE_ROOMS,
        payload
    }
}

// export const getRoomsAvailable = (guests: number, range:string[]) => {
//     console.log(guests, range)
//         return async ( dispatch: Dispatch<any> ) => {
//             let checkin = range[0]
//             let checkout = range[1]
            
//             //Traer los Types que cumple con el criterio de guests
//             const { data: types } = await supabase
//             .from("types")
//             .select("*")
//             .gte("capacity", guests );
//             dispatch(dataTypes(types))

//             //Traer los Rooms que pertencen a los types recibidos en el paso anterior
//             const rooms:any = [];
//             if( types?.length ) {
//                 for ( let i = 0; i < types.length; i++ ) {
//                     const { data: room } = await supabase
//                     .from("rooms")
//                     .select('*')
//                     .eq("type_id", types[i].id);
//                     rooms.push(room);
//                 }
//             }
    
//             //Trae los Rooms que están disponibles en las fechas dadas por el usuario
//             let freeRooms:roomType[] = [];
//             for (let i:number = 0; i < rooms.length; i ++) {
//                 for (let j:number = 0; j < rooms[i].length; j ++) {
//                     let { data: bookingRoom } = await supabase
//                     .from('bookings')
//                     .select('*')
//                     .eq("room_id", rooms[i][j].id);
//                     if ( !bookingRoom?.length ) freeRooms.push(rooms[i][j]);
//                     else {
//                         if ( bookingRoom[0].checkout <= checkin ) {
//                             freeRooms.push(rooms[i][j]);
//                         }
//                         else if ( bookingRoom[0].checkin >= checkout ) {
//                             freeRooms.push(rooms[i][j]);
//                         }
//                         else if ( bookingRoom[0].checkin < checkin && bookingRoom[0].checkout > checkin ) {
//                             console.log('se descarta');
//                         }
//                         else if ( bookingRoom[0].checkin >= checkin && bookingRoom[0].checkout <= checkout ) {
//                             console.log('se descarta');
//                         }
//                         else if ( bookingRoom[0].checkin <= checkout && bookingRoom[0].checkout >= checkout ) {
//                             console.log('se descarta');
//                         }
//                     }
//                 }
//             }
    
//             //Seleccionar categorias correspondientes a los rooms libres
//             let result:any=[]
//             for(let i = 0; i < freeRooms.length; i++){
//                 if(!result.some( (x:categoryType) => x.id === freeRooms[i].category_id )){
//                     let { data: categories } = await supabase
//                     .from('categories')
//                     .select('*')
//                     .eq("id",freeRooms[i].category_id);
//                     result.push(categories?.pop());
//                 }
//             }
//             console.log(result)
//         }
//         dispatch(dataCategories(result));
    
//         // dispatch(freeRoomsAD(freeRooms));
//     // user                     checkin                   checkout
//     // room      ckin   ckout
//     // room             ckin               ckout
//     // room                         ckin            ckout
//     // room                                ckin                    ckout
//     // room                                                 ckin            ckout
    
// }

// const freeRoomsAD = (payload:any) =>{
//     return{
//         type: FREE_ROOMS,
//         payload
//     }
// } 
// export const getTypesForSelect = () => {
    
//         return async (dispatch: Dispatch<any>) => {
//             try {
//                 const { data } = await supabase
//                     .from('types')
//                     .select('*')
//                         dispatch(dataTypes(data))
//             } catch (err) {
//                 console.log(err)
//             }
//         }
    
// }
// export const roomSelectedAD = (categoryPax:any, freeRooms:roomType[])=>{
//     return ( dispatch:any ) =>{
//         console.log(categoryPax);
//         console.log(freeRooms);
//         const roomSelected = freeRooms.find( (r:roomType) => { 
//             return (r.category_id === categoryPax.category.id && r.type_id === categoryPax.type.id)
//         })
//         dispatch(dataBookRoom(roomSelected?.id));
//     }
// }

// const dataBookRoom = (payload:any) => {
//     return {
//         type: LETS_BOOK_ROOM,
//         payload
//     }
// }

const dataTypes = (payload:any) => {
    return {
        type: GET_TYPES_AD,
        payload
    }
}

const dataCategories = (payload:any) => {
    return {
        type: GET_CATEGORIES_AD,
        payload
    }
}

// address: "Avenida General Paz 7142 entre Av Mosconi y Benito Juarez"
// birth_date: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Thu Apr 15 2021 13:28:13 GMT-0300 (hora estándar de Argentina), …}
// category: 6
// country: ["argentina"]
// early_check: true
// first_name: "Malena"
// guests: 2
// last_name: "Goñi"
// late_check: undefined
// phone: "132416123"
// range-picker: (2) ["2021-04-25", "2021-04-28"]
// type: 1
// uuid: "41614951"

// availability: "available"
// category_id: 3
// curent_booking: null
// curent_pax: null
// description: null
// floor: 3
// id: 18
// name: "306"
// type_id: 1

export const finalCreateBooking = (infoBookPax:any, {payment_status, totalPrice, payment_method}:any, room:any) => {
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

// const {payment_status, totalPrice} = infoPayment

    return async (dispatch:Dispatch<any>) => {
        let paxid = id;

            let paxCreate:any;

                if( !id ) {

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
            
            const {data:booking, error:bookingError} = await supabase
                .from('bookings')
                .insert([
                    {
                        checkin,
                        checkout,
                        room_id : room.id,
                        paxes_amount: guests,
                        paxTitular_id: paxid,
                        status: true,
                        early_check,
                        late_check 
                    }
                ])
                console.log(booking, bookingError)

                if(booking) {
                    const {data:bookPax, error} = await supabase
                            .from('booking_pax')
                            .insert([
                                {
                                    pax_id: paxid,
                                    booking_id: booking[0].id
                                }
                            ])
                    
                        if(!error) {
                            const {data:paymen, error:pay} = await supabase
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
                                console.log(paymen, pay)
                        }

                }

                

                dispatch(getDataBooking('all')) //BOOKING_PAX
                dispatch(getBookingsId()) //BOOKINGS    
                dispatch(getPayments()) //PAYMENTS
                dispatch(getPaxId()) //PAXES

    }

}


export const inactiveBooking = (id:number) => {
    console.log(id)
    return async (dispatch: Dispatch<any>) => {
        const { data, error } = await supabase
            .from('bookings')
            .update({ status: false })
            .eq('id', id)

            // dispatch(getDataBooking('all')) //BOOKING_PAX
            dispatch(getBookingsId()) //BOOKINGS    
    }
}