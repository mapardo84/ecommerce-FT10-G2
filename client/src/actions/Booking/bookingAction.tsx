import { ContactsOutlined } from '@ant-design/icons';
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

export interface BookingInfo{
    checkin: string
    checkout: string
    early_check: boolean
    email_send: boolean
    id: number
    late_check: boolean
    paxTitular_id: number
    paxes_amount: number
    preference_id: string|null
    room_id: number
    status: boolean
    user_id: number|null
}

export interface Result{
    capacity: number
    description: string
    details: string[]
    id: number
    images: string[]
    price: number
}
export interface RoomsInfo{
    availability: string
    category_id: number
    curent_booking: number|null
    curent_pax: number|null
    description: string|null
    floor: number
    id: number
    name: string
    type_id: number
}
export interface Types{
    id: number
    name: string
    capacity: number
    beds: number
}
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
    return async (dispatch: Dispatch) => {
        const { guests, range } = userBooking;
        const [checkin, checkout] = range;

        //Traer los Types que cumple con el criterio de guests
        const { data: types } = await supabase
            .from("types")
            .select("*")
            .gte("capacity", guests);

        //Traer los Rooms que pertencen a los types recibidos en el paso anterior
        let rooms: RoomsInfo[] = [];
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
        let habitacionesDescartadas: number[] = []
        booki?.forEach((book: BookingInfo) => {
            if (!habitacionesDescartadas.includes(book.room_id)) {
                habitacionesDescartadas.push(book.room_id)
            }
        })

        const freeRooms :roomType[] = rooms?.filter((room: roomType) => {
            if (!habitacionesDescartadas.includes(room.id)) {
                return room
            }
        })

        if (!freeRooms) return

        //Seleccionar categorias correspondientes a los rooms libres
        let result: categoryType[] = []
        for (let i = 0; i < freeRooms.length; i++) {

            if (!result.some((x: categoryType) => x.id === freeRooms[i].category_id)) {
                let { data: categories } = await supabase
                    .from('categories')
                    .select('*')
                    .eq("id", freeRooms[i].category_id);
                result.push(categories?.pop());
            }
        }
        dispatch(categoriesToShow({ userCategories: result, types: types }));
        dispatch(freeRoomsToShow(freeRooms));
    }
}

const categoriesToShow = (payload: {userCategories:categoryType[]|null;types:Types[]|null}) => {
    return {
        type: CATEGORIES_TO_SHOW,
        payload
    }
}

const freeRoomsToShow = (payload: roomType[]|null) => {
    return {
        type: FREE_ROOMS_SHOW,
        payload
    }
}

export const roomSelected = (categoryPax: any, freeRooms: roomType[]|null) => {
    console.log(categoryPax,"roomSelected")
    return (dispatch: Dispatch) => {
        const roomSelected = freeRooms?.find((r: roomType) => {
            return (r.category_id === categoryPax.category.id && r.type_id === categoryPax.type.id)
        })
        dispatch(bookedRoom(roomSelected?.id));
    }
}

const bookedRoom = (payload: any) => {
    console.log(payload,"bookedRoom")
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
    return async(dispatch:Dispatch)=>{
        dispatch(setLoading(true))
        const {data:pax}:any = await supabase
        .from("paxes")
        .select("*")
        .eq("uuid",`${uuid}`) 
        console.log(pax,"getPax")
        dispatch(get_pax_data(pax[0]))
        dispatch(setLoading(false))
    }
}
const get_pax_data=(payload:any)=>{
    console.log(payload,"get_pax_data")
    return{
        type:GET_PAX_DATA,
        payload,
    }
}
