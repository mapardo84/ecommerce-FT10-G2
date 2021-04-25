import { Dispatch } from 'redux';
import { categoryType, roomType } from '../../components/booking/accomodationsSelect/AccomodationsSelect';
import { bookingType } from '../../components/booking/guestsForm/GuestsForm';
import { supabase } from '../../SupaBase/conection';
export const STEP_CHANGE = 'STEP_CHANGE';
export const SET_BOOK_DATA = 'SET_BOOK_DATA'
export const GET_SOME_BOOKINGS = "GET_SOME_BOOKINGS";
export const CATEGORIES_TO_SHOW = "CATEGORIES_TO_SHOW";
export const FILTER_DATES = "FILTER_DATES";
export const FREE_ROOMS_SHOW = "FREE_ROOMS_SHOW"
export const SET_CATEGORY = "SET_CATEGORY";
export const SELECTED_CATEGORY_ROOMS = "SELECTED_CATEGORY_ROOMS";
export const BOOKED_ROOM = "BOOKED_ROOM";
export const SET_LOADING = 'SET_LOADING';
export const GET_PAX_DATA='GET_PAX_DATA'
export interface bookAction {
    type: string,
    payload: any
}

export const stepChange = (inputs: number) => {
    return {
        type: STEP_CHANGE,
        payload: inputs
    }
}

export const setBookData = (booking: bookingType) => {
    return {
        type: SET_BOOK_DATA,
        payload: { booking }
    }
}

export const setCategory = (input: any) => {
    return {
        type: SET_CATEGORY,
        payload: input
    }
}

// ACTION EJECUTADA POR EL BOTON NEXT DEL COMPONENTE GUEST FORM
export const getCategoriesForUser = (userBooking: bookingType) => {
    return async (dispatch: any) => {
        const { guests, range } = userBooking;
        const [checkin, checkout] = range;

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
            .eq('status',true)
            .gte('checkout', checkin)
            .lte('checkin', checkout)
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
        let checkingR: any = []
        for (let i = 0; i < freeRooms.length; i++) {
            // if (!checkingR.includes(freeRooms[i].category_id)) {
            //     let { data: categories } = await supabase
            //         .from('categories')
            //         .select('*')
            //         .eq("id", freeRooms[i].category_id);
            //     console.log('categories',categories)
            //     result.push(categories?.pop());
            //     checkingR.push(categories?.pop().id)
            // }

            if (!result.some((x: categoryType) => x.id === freeRooms[i].category_id)) {
                let { data: categories } = await supabase
                    .from('categories')
                    .select('*')
                    .eq("id", freeRooms[i].category_id);
                //console.log('Categories: ', categories?.pop())
                result.push(categories?.pop());
            }
        }
        dispatch(categoriesToShow({ userCategories: result, types: types }));
        dispatch(freeRoomsToShow(freeRooms));
    }
    // user                     checkin                   checkout
    // room      ckin   ckout
    // room             ckin               ckout
    // room                         ckin            ckout
    // room                                ckin                    ckout
    // room                                                 ckin            ckout
}

const categoriesToShow = (payload: any) => {
    return {
        type: CATEGORIES_TO_SHOW,
        payload
    }
}

const freeRoomsToShow = (payload: any) => {
    return {
        type: FREE_ROOMS_SHOW,
        payload
    }
}

export const roomSelected = (categoryPax: any, freeRooms: roomType[]) => {
    return (dispatch: any) => {
        const roomSelected = freeRooms.find((r: roomType) => {
            return (r.category_id === categoryPax.category.id && r.type_id === categoryPax.type.id)
        })
        dispatch(bookedRoom(roomSelected?.id));
    }
}

const bookedRoom = (payload: any) => {
    return {
        type: BOOKED_ROOM,
        payload
    }
}

export const setLoading = (payload: boolean) => {
    return {
        type: SET_LOADING,
        payload
    }
}

export const getPax=(uuid:string | undefined)=>{
    return async(dispatch:Dispatch<any>)=>{
        const {data:pax}:any = await supabase
        .from("paxes")
        .select("*")
        .eq("uuid",`${uuid}`) 
        dispatch(get_pax_data(pax[0]))
    }
}
const get_pax_data=(payload:any)=>{
    return{
        type:GET_PAX_DATA,
        payload,
    }
}
