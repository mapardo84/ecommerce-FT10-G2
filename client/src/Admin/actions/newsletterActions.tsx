import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';

export const GET_NEWSLETTER: string = 'GET_NEWSLETTER'

const errorMsg = (msg: string, time: number = 3) => {
    message.error(msg, time);
};




export const getAllNewsletter = () =>{
    return async (dispatch:Dispatch<any>) =>{
        try {
            const { data , error } = await supabase.from('newsletterEmails').select('*')
            if (!error) {
                dispatch(getNewsletter(data))
            } else {
                errorMsg(JSON.stringify(error))
            }
        } catch (err) {
            console.log(err)
            errorMsg('Internal server error. Try again')
        }
    }
}

const getNewsletter = (data: any) => ({
    type: GET_NEWSLETTER,
    payload: data
})

