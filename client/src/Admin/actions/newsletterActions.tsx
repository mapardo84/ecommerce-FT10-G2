import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import axios from 'axios';

export const GET_NEWSLETTER: string = 'GET_NEWSLETTER'
export const ADD_NEWSLETTER: string = 'ADD_NEWSLETTER'

const errorMsg = (msg: string, time: number = 3) => {
    message.error(msg, time);
};

export interface IEmail {
    email_title: string;
    email_content: string;
    email_image: string;
    emails: [];
}


export const post_newsletter = (info: IEmail) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data: emails } = await supabase
                .from('newsletterSubs')
                .select('email')
                .eq('active', 'active')
            axios.post('http://localhost:4000/emails/newsletter', [info, emails])
            const { email_title, email_content, email_image } = info
            const { data, error } = await supabase
                .from('newsletterEmails')
                .insert([
                    { email_title, email_content, email_image },
                ])
            if (!error) {
                dispatch(addNewsletter(data))
            }
        } catch (err) {
            console.log(err)
            errorMsg('Internal server error. Try again')
        }
    }


}



export const getAllNewsletter = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data, error } = await supabase.from('newsletterEmails').select('*').order('id', { ascending: false })
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

const addNewsletter = (data: any) => ({
    type: ADD_NEWSLETTER,
    payload: data
})


