import {supabase} from '../../SupaBase/conection'

export const BYPAXID:string="GET_BY_PAXID"
export const BYBOOKINGID:string="GET_BY_BOOKINGID"
export const BYFIRSTNAME:string="GET_BY_FIRSTNAME"
export const BYLASTNAME:string="GET_BY_LASTNAME"

export function getByPaxID(id: any){
    id = Number(id)
    return async (dispatch:any)=>{
        const relacional:any=await supabase
        .from("booking_pax")
        .select(`*, pax_id(*), booking_id(*)`)
        .eq(`pax_id`, `${id}`)
        console.log(relacional)
        dispatch(get_bookingPax(relacional.data))
    }
}
export function getByBookingID(id: any){
    id = Number(id)
    return async (dispatch:any)=>{
        const relacional:any=await supabase
        .from("booking_pax")
        .select(`*, booking_id(*), pax_id(*)`)
        .eq('booking_id', `${id}`)
        console.log(relacional)
        dispatch(get_bookingID(relacional.data))
    }
}

const get_bookingPax=(payload:any)=>{
    return{
        type:BYPAXID,
        payload
    }
    
}
const get_bookingID=(payload:any)=>{
    return{
        type:BYBOOKINGID,
        payload
    }
    
}

export function getFirstName(firstname: string) {
    return async (dispatch:any)=>{
        const relacional:any=await supabase
        .from("paxes")
        .select(`*`)
        .ilike('first_name', `%${firstname}%`)
        console.log(relacional)
        dispatch(getByFirstName(relacional.data))
    }
}

export function getLastName(lastname: string) {
    return async (dispatch:any)=>{
        const relacional:any=await supabase
        .from("paxes")
        .select(`*`)
        .ilike('last_name', `%${lastname}%`)
        console.log(relacional)
        dispatch(getByLastName(relacional.data))
    }
}

const getByFirstName = (payload: any) => {
    return {
        type: BYFIRSTNAME,
        payload
    }
}
const getByLastName = (payload: any) => {
    return {
        type: BYLASTNAME,
        payload
    }
}