import { bookingType } from '../../components/booking/guestsForm/GuestsForm';
import { supabase } from '../../SupaBase/conection';
export const STEP_CHANGE = 'STEP_CHANGE';
export const SET_BOOK_DATA = 'SET_BOOK_DATA'
export const GET_BOOKINGS = "GET_BOOKINGS"
export const GET_TYPES = "GET_TYPES";
export const GET_ROOMS = "GET_ROOMS";
export interface bookAction {
    type: string,
    payload: any
}

export const stepChange = (inputs:any) => {
    return {
        type: STEP_CHANGE,
        payload: inputs
    }
}

export const setBookData = (booking:bookingType) => {
    return {
        type: SET_BOOK_DATA,
        payload: { booking }
    }
}

export const getBookings= async() =>{
    let {data:bookings} = await supabase
    .from("bookings")
    .select ("*") 
    return{
        type: GET_BOOKINGS,
        payload: bookings
    }
}

export const getTypes = (paxes:number) =>{
    return async(dispatch:any) =>{
        const { data:types } = await supabase
        .from("types")
        .select("id")
        .gte("capacity",paxes)
        dispatch(saveTypes(types))
    }
}
const saveTypes = (payload:any) =>{
    return {
        type: GET_TYPES,
        payload
    }   
}

export const getRooms = (types:any) => {
   return async (dispatch:any) => {
        if( types ) {
            let resul = [];
            console.log('entró a la action');
            for (let i = 0; i < types.length; i++) {
                const { data } = await supabase
                .from("rooms")
                .select('*')
                .eq("type_id",types[i].id);
                resul.push(data);
            }
            dispatch(saveRooms(resul));
        }
   }
}
const saveRooms = (payload:any) =>{
    return{
        type: GET_ROOMS,
        payload
    }
}

