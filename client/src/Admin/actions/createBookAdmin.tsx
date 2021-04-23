import { supabase } from "../../SupaBase/conection"
import { Dispatch } from 'react'
import { categoryType, roomType } from '../../components/booking/accomodationsSelect/AccomodationsSelect';

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
            dispatch(getPaxInfo(data))
    }
}
// address: "Avenida General Paz 7142 entre Av Mosconi y Benito Juarez"
// birth_date: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Mon Apr 05 2021 14:15:49 GMT-0300 (hora estándar de Argentina), …}
// category: "Business"
// country: ["argentina"]
// first_name: "Malena"
// guests: 2
// last_name: "Goñi"
// phone: "65468942"
// prefix: "54"
// range-picker: (2) ["2021-04-30", "2021-05-01"]
// titular: undefined
// type: "Classic"
// uuid: 

export const finalCreateBooking = (infoBookPax:any) => {
    const { uuid, first_name, last_name, phone, prefix, country, address, birth_date, guests, category, type } = infoBookPax
    const checkin = infoBookPax['range-picker'][0]
    const checkout = infoBookPax['range-picker'][0]

    // return async (dispatch:Dispatch<any>) {
    //     const {data}:any = await supabase
    //             .from('pax')
    //             .insert()

    // }

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
export const getRoomsAvailable = (guests: number, range:string[]) => {
    console.log(guests, range)
        return async ( dispatch: Dispatch<any> ) => {
            let checkin = range[0]
            let checkout = range[1]
            
            //Traer los Types que cumple con el criterio de guests
            const { data: types } = await supabase
            .from("types")
            .select("*")
            .gte("capacity", guests );
            dispatch(dataTypes(types))

            //Traer los Rooms que pertencen a los types recibidos en el paso anterior
            const rooms:any = [];
            if( types?.length ) {
                for ( let i = 0; i < types.length; i++ ) {
                    const { data: room } = await supabase
                    .from("rooms")
                    .select('*')
                    .eq("type_id", types[i].id);
                    rooms.push(room);
                }
            }
    
            //Trae los Rooms que están disponibles en las fechas dadas por el usuario
            let freeRooms:roomType[] = [];
            for (let i:number = 0; i < rooms.length; i ++) {
                for (let j:number = 0; j < rooms[i].length; j ++) {
                    let { data: bookingRoom } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq("room_id", rooms[i][j].id);
                    if ( !bookingRoom?.length ) freeRooms.push(rooms[i][j]);
                    else {
                        if ( bookingRoom[0].checkout <= checkin ) {
                            freeRooms.push(rooms[i][j]);
                        }
                        else if ( bookingRoom[0].checkin >= checkout ) {
                            freeRooms.push(rooms[i][j]);
                        }
                        else if ( bookingRoom[0].checkin < checkin && bookingRoom[0].checkout > checkin ) {
                            console.log('se descarta');
                        }
                        else if ( bookingRoom[0].checkin >= checkin && bookingRoom[0].checkout <= checkout ) {
                            console.log('se descarta');
                        }
                        else if ( bookingRoom[0].checkin <= checkout && bookingRoom[0].checkout >= checkout ) {
                            console.log('se descarta');
                        }
                    }
                }
            }
    
            //Seleccionar categorias correspondientes a los rooms libres
            let result:any=[]
            for(let i = 0; i < freeRooms.length; i++){
                if(!result.some( (x:categoryType) => x.id === freeRooms[i].category_id )){
                    let { data: categories } = await supabase
                    .from('categories')
                    .select('*')
                    .eq("id",freeRooms[i].category_id);
                    result.push(categories?.pop());
                }
            }
            console.log(result)
    
            dispatch(dataCategories(result));
            // dispatch(freeRoomsAD(freeRooms));
        }
    // user                     checkin                   checkout
    // room      ckin   ckout
    // room             ckin               ckout
    // room                         ckin            ckout
    // room                                ckin                    ckout
    // room                                                 ckin            ckout
    
}

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