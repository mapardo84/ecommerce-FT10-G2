import {supabase} from './../SupaBase/conection'

export const GET_CATEGORIES='GET_CATEGORIES';

  
/* export const getCategories= ()=>{
    return async (dispatch:any)=>{
        var category = await axios.get('');
        dispatch(getCategories())
    }
}    */


export const getCategories = async (id?:number) => { 
    if(!id){
        let { data: categories, error } = await supabase
            .from('categories')
            .select('*') 
            return {
                type:GET_CATEGORIES,
                payload:categories
            }
    }else if(id){
        let { data: categories, error } = await supabase
        .from('categories')
        .select('*') 
        .eq('id', id) 
        return {
            type:GET_CATEGORIES,
            payload:categories
        }
    }       
    
    
   
}



/* const categories = (payload:any)=>({
    type:GET_CATEGORIES,
    payload
}) */


