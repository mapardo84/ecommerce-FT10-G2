import { supabase } from '../../SupaBase/conection';
import { message } from 'antd';
import {Dispatch} from 'react';

export const POST_EMAIL_NEWSLETTER = 'POST_EMAIL_NEWSLETTER';

const errorMsg = (msg: any) => {
    message.error(msg);
};

const success = (mensaje: string) => {
    message.success({
        content: mensaje,
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

export const AddSub = (email:string) =>{
    return async (dispatch: Dispatch<any>)=>{
        try{
            const {data,error} = await supabase 
            .from('newsletterSubs')
            .insert([
                {
                    email
                }
            ])
            if(!error){
                dispatch(postSub(data));
                success('Successfully subscribed')
            }else{
                errorMsg(JSON.stringify(error))
            }
        }catch(err){
            errorMsg('Internal sever error. Try again')
        }
    }
}


const postSub =(email:any)=>({
    type:POST_EMAIL_NEWSLETTER,
    payload:email
})