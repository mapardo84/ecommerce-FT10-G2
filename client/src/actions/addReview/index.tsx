import { supabase } from '../../SupaBase/conection';
import { message } from 'antd';
import {Dispatch} from 'react';


export const POST_REVIEW = 'POST_REVIEW';


const errorMsg = (msg: any) => {
    message.error(msg);
};


export const addReview = (review?: string, catId?: number, userId?:number,rate?:number) => {
    return async(dispatch: Dispatch<any>)=>{
        try{




            const {data,error} = await supabase .from('reviews').insert([
                {
                    review: review,
                    category_id: catId,
                    rate,
                    user_id:userId
                }
            ]);
            if (!error) {
                dispatch(addReviews(data));
            } else {
                errorMsg(JSON.stringify(error))
            }
        } catch (err){
            errorMsg('Internal server error. try again')
        }
    }
}

const addReviews= (review:any)=>({
    type:POST_REVIEW,
    payload: review
})



/* export const addReview = async (review?: string, catId?: number, userId?:number,rate?:number) => {
    const { data, error } = await supabase.from('reviews').insert([
        {
            review: review,
            category_id: catId,
            rate
        },
    ]);
    const {} = await supabase.from('user_review').insert([
        {
            user_id:userId,
            review_id: data?.[0].id
        }
    ])
    if (!error) {
        success();
        
    } else {
        errorMsg(JSON.stringify(error))
    }
    
} */