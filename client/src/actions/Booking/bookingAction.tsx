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

/*export const getTypes = async (paxes:number) =>{
    let { data:types } = await supabase
  .from("types")
  .select('id')
  .gte("capacity",paxes)
  return{
      type:GET_TYPES,
      payload: types
  }
}*/

export const getTypes = (paxes:number) =>{
    return async(dispatch:any) =>{
        const {data} = await supabase
    .from("types")
    .select("id")
    .gte("capacity",paxes)
    dispatch(saveTypes(data))
}
    }
    

const saveTypes = (payload:any) =>{
    return{
        type: GET_TYPES,
    payload
    }
    
}

export const getRooms = (types:any)=>{
   return async (dispatch:any) =>{
            const {data} = await supabase.from("rooms").select('category_id').eq("type_id",types[0])
                dispatch(saveRooms(data))
   }
   }
    


const saveRooms = (payload:any) =>{
    return{
        type: GET_ROOMS,
        payload
    }
}

