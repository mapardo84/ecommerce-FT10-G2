import {supabase} from '../../SupaBase/conection';
export const GET_IDBYMAIL ='GET_IDBYMAIL';
export const GET_CHECKOUT ='GET_CHECKOUT';

export const getUserIdByMail = async (email:string | undefined) => {
    let { data: users, error } = await supabase
  .from('users')
  .select('id,uuid')
  .eq('email',email)
  return {
      type:GET_IDBYMAIL,
      payload:users
  }
}


export const checkoutValidation = async (uuid:string)=>{

  const checkout = await supabase
  .from('booking_pax')
  .select('*,booking_id(checkout,room_id(category_id)),pax_id(uuid)')
  .eq('pax_id.uuid',uuid)
  return {
    type:GET_CHECKOUT,
    payload:checkout.data
  }
}





