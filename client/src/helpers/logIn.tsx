import { supabase } from '../SupaBase/conection'
import {message} from 'antd'

const success = () => {
    message.success({
        content: "Log-In success",
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

const errorMsg = () => {
    message.error("Error");
};

export const classicLogIn = async (email: string, password: string) => {
    try {
        const { user, error } = await supabase.auth.signIn({
            email,
            password
        })
        if(!error){
            console.log(user)
            await success()
            

        }else{
            console.log(error)
            errorMsg()
        }
    } catch (err) { console.log(err) }
}
