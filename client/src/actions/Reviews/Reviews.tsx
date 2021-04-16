import {supabase} from '../../SupaBase/conection' 
import {Dispatch} from 'react'
import{message} from 'antd'


export const GET_REVIEWS = 'GET_REVIEWS'
const errorMsg = (msg: string) => {
    message.error(msg);
};




export const get_reviews = (id:any) => {
    console.log(id)
    return async (dispatch: Dispatch<any>) => {
        try {
            const{data:review,error} = await supabase
                    .from('reviews')
                    .select('*')
                     .eq('category_id',id)
            if (!error) {
                console.log(review)
                dispatch(getAllReviews(review))
            } else {
                errorMsg(JSON.stringify(error))
            }

        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

const getAllReviews = (review:any) =>({
    type:GET_REVIEWS,
    payload:review
})

// export const get_reviews = async (id:any) =>{
//     let {data:reviews,error} = await supabase
//     .from('reviews')
//     .select ('*')
//     .eq('category_id',id)

//     return {
//         type:GET_REVIEWS,
//         payload: reviews
//     }

// }