import { supabase } from '../SupaBase/conection';
export const GET_DETAILS = 'GET_DETAILS';

export default async function getDetails () {
    let { data: categories , error } = await supabase
    .from('categories')
    .select('*')
    return { type: GET_DETAILS, payload: categories }
}