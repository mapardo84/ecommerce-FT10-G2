import {supabase} from '../../SupaBase/conection'

export const BYPAXID:string="GET_BY_PAXID"
export const BYBOOKINGID:string="GET_BY_BOOKINGID"
export const BYFIRSTNAME:string="GET_BY_FIRSTNAME"
export const BYLASTNAME:string="GET_BY_LASTNAME"
export const BYPAXUUID:string='BYPAXUUID'


export function getByPaxID(id: any) {

    if(id.length===0){ 
        return async (dispatch:any)=>{
            dispatch(get_bookingPax([]))
        }
    }else{
        return async (dispatch:any)=>{
            try {
                console.log('bypax')
                const relacional:any=await supabase
                .from("booking_pax")
                .select(`*, pax_id(uuid)`)
                .eq(`pax_id`, `${id}`)
                .limit(4)

                dispatch(get_bookingPax(relacional.data))
                console.log(`by pax id ${relacional}`)
            } catch (e) {
              console.log(e)
            }
        }
    }
}

export function getByPaxUuidAdd(uuid: string) {
    if(uuid.length<1){
        return async (dispatch:any)=>{
            dispatch(get_paxUuid([]))
        }
        }else{
        return async (dispatch:any)=>{
            
            console.log('byuuid')
            const pax:any=await supabase
            .from("paxes")
            .select(`*`)
            .ilike('uuid', `%${uuid}%`) 
            .limit(4)
            console.log(pax.data)
            dispatch(get_paxUuidAdd(pax.data))
        }
                    
    }
}

const get_paxUuidAdd=(payload:any)=>{
    return {
        type:BYPAXUUID,
        payload
    }
}
// export function getByPaxID(id: any) {

//     if(id.length===0){ 
//         return async (dispatch:any)=>{
//             dispatch(get_bookingPax([]))
//         }
//     }else{
//         return async (dispatch:any)=>{
//             try {
//                 console.log('bypax')
//                 const relacional:any=await supabase
//                 .from("booking_pax")
//                 .select(`*, pax_id(*), booking_id(*,room_id(*))`)
//                 .eq(`pax_id`, `${id}`)
//                 .limit(4)
//                 dispatch(get_bookingPax(relacional.data))
//                 console.log(`by pax id ${relacional}`)
//             } catch (e) {
//               console.log(e)
//             }
//         }
//     }
// }


export function getByBookingID(id: any){
    if(id.length===0){
        return async (dispatch:any)=>{
            dispatch(get_bookingID([]))
        }
    }else{
        return async (dispatch:any)=>{
        
        try {
            console.log('bybooking')
            const relacional:any=await supabase
            .from("booking_pax")
            .select(`*, booking_id(*,room_id(*)), pax_id(*)`)
            .eq('booking_id', `${id}`)
            .limit(4)
            console.log(`by bookig id ${relacional}`)
            dispatch(get_bookingID(relacional.data))
        } catch(e) {
            console.log(e)
        }
    }
    
    }
}
    


export function getByPaxUuid(uuid: string) {
    if(uuid.length<1){
        return async (dispatch:any)=>{
            dispatch(get_paxUuid([]))
        }
        }else{
        return async (dispatch:any)=>{
            
            console.log('byuuid')
            const pax:any=await supabase
            .from("paxes")
            .select(`*`)
            .ilike('uuid', `%${uuid}%`) 
            .limit(4)
            console.log(pax.data)
            dispatch(get_paxUuid(pax.data))
        }
                    
    }
}

const get_paxUuid=(payload:any)=>{
    return {
        type:BYPAXUUID,
        payload
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
    if(firstname.length<1){
        return async (dispatch:any)=>{
            dispatch(getByFirstName([]))
        }
        }else{
        return async (dispatch:any)=>{
            
            console.log('byfirstname')
            const pax:any=await supabase
            .from("paxes")
            .select(`*`)
            .ilike('first_name', `%${firstname}%`) 
            .limit(4)
            console.log(pax.data)
            
            dispatch(getByFirstName(pax.data))
        }
    }
}
// export function getFirstName(firstname: string) {
//     if(firstname.length<1){
//         return async (dispatch:any)=>{
//             dispatch(getByFirstName([]))
//         }
//         }else{
//         return async (dispatch:any)=>{
            
//             console.log('byfirstname')
//             const pax:any=await supabase
//             .from("paxes")
//             .select(`*`)
//             .ilike('first_name', `%${firstname}%`) 
//             const bookForName=pax.data.map((e:any)=>{
//                 return supabase
//                 .from("booking_pax")
//                 .select('*,booking_id(*,room_id(*)), pax_id(*)')
//                 .eq('pax_id',`${e.id}`)
//                 .limit(4)
//                 })
//                 const concatenadosporH:any[]=[]
//                 Promise.all(bookForName).then(res=>res.forEach((e:any)=>concatenadosporH.push(e.data)))
//                 .then(()=>dispatch(getByFirstName(concatenadosporH.flat())))
//         }
                    
//     }
// }


export function getLastName(lastname: string) {
    if(lastname.length<1){
        return async (dispatch:any)=>{
            dispatch(getByLastName([]))
        }
    }else{
    return async (dispatch:any)=>{
        console.log('bylastname')
        const pax:any=await supabase
        .from("paxes")
        .select(`*`)
        .ilike('last_name', `%${lastname}%`)
        .limit(4)
        dispatch(getByLastName(pax.data))
    }
    }
}  
// export function getLastName(lastname: string) {
//     if(lastname.length<1){
//         return async (dispatch:any)=>{
//             dispatch(getByLastName([]))
//         }
//     }else{
//     return async (dispatch:any)=>{
//         console.log('bylastname')
//         const pax:any=await supabase
//         .from("paxes")
//         .select(`*`)
//         .ilike('last_name', `%${lastname}%`)
//         const bookForLastName=pax?.data?.map((e:any)=>{
//             return supabase
//             .from("booking_pax")
//             .select('*,booking_id(*,room_id(*)), pax_id(*)')
//             .eq('pax_id',`${e.id}`)
//             .limit(4)
//             })
//             const concatenadosporH:any[]=[]
//             Promise.all(bookForLastName).then(res=>res.forEach((e:any)=>concatenadosporH.push(e.data)))
//             .then(()=>dispatch(getByLastName(concatenadosporH.flat())))
//     }
//     }
// }  


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