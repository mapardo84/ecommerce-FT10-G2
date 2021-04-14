import { supabase } from '../../SupaBase/conection'
import { message } from 'antd'


const success = () => {
    message.success({
        content: "Review Posted",
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};
const errorMsg = (msg: any) => {
    message.error(msg);
};



export const addReview = async (review?: string, catId?: Number, userId?:Number) => {
    const { data, error } = await supabase.from('reviews').insert([
        {
            review: review,
            category_id: catId
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
    
}