import { supabase } from '../../SupaBase/conection';
export const GET_PROMOTIONS = 'GET_PROMOTIONS';

export interface promotionType {     
    id: number,     
    description: string,     
    value: number,     
    categoryToApply: number,     
    published: boolean,     
    releaseDate: string,     
    expirationDate:string 
}

export const getPromotions = () => {
    return async ( dispatch:any ) => {
        try{
            // Obteniendo fecha de hoy
            const t = Date.now();
            const date = new Date(t);
            let today:string;
            if (date.getMonth() < 10) {
                today = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
            } else {
                today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            }
            // Trae de BD las promotions que estén en vigencia y publicadas
            const { data: promotions } = await supabase
            .from("discounts")
            .select("*")
            .eq('published', true)
            .gte('expirationDate', today)
            .lte('releaseDate', today);

            dispatch(getPromotionsAction(promotions));
        } catch (e) { console.error('Hubo un problema al acceder a supabase', e) };
    }
}

const getPromotionsAction = (payload:promotionType[]|null)=>{
    return{ 
        type: GET_PROMOTIONS,
        payload
    }
}