import { supabase } from '../../SupaBase/conection';
import { message } from 'antd';
import {Dispatch} from 'react';

export const POST_EMAIL_NEWSLETTER = 'POST_EMAIL_NEWSLETTER';
export const GET_SUBS = 'GET_SUBS';
export const UPDATE_SUB = 'UPDATE_SUB';

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
                errorMsg('your email is already registered')
            }
        }catch(err){
            errorMsg('Internal sever error. Try again')
        }
    }
}


export const GetSub = () =>{
    return async (dispatch:Dispatch<any>)=>{
        try{
            const {data,error} = await supabase
            .from('newsletterSubs')
            .select('email')
            .eq('active','cancelled')
        if(!error){
            dispatch(getSub(data));
        }else{
            errorMsg(JSON.stringify(error));
        }
        }catch(err){
            errorMsg('Internal sever error. Try again')
        }
    }
}


export const UpdateSub = (email:string) =>{
    return async (dispatch:Dispatch<any>)=>{
        try{
            const {data,error} = await supabase
            .from('newsletterSubs')
            .update({
                active: 'active'
            })
            .eq('email',email)

            if(!error){
                dispatch(updateSub(data))
                success('Successfully subscribed')
            }else{
                errorMsg(JSON.stringify(error));
            }
        }catch(err){
            errorMsg('Internal sever error. Try again')
        }
    }
}



const updateSub =(email:any)=>({
    type:UPDATE_SUB,
    payload:email
})

const postSub =(email:any)=>({
    type:POST_EMAIL_NEWSLETTER,
    payload:email
})

const getSub =(data:any)=>({
    type:GET_SUBS,
    payload:data
})