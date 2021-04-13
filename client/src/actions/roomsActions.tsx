
import {supabase} from '../SupaBase/conection'
export const GET_ALL_ROOMS:string="GET_ALL_ROOMS"

export const getAllRooms=async()=>{
    let {data}=await supabase.from('rooms').select('*,categories(name)')
    return({
        type:GET_ALL_ROOMS,
        payload:data
    })
}