import {supabase} from '../../SupaBase/conection';
export const GET_IDBYMAIL ='GET_IDBYMAIL';

export const getUserIdByMail = async (email:any) => {
    let { data: users, error } = await supabase
  .from('users')
  .select('id')
  .eq('email',email)
  return {
      type:GET_IDBYMAIL,
      payload:users
  }
}




