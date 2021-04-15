import { supabase } from "../SupaBase/conection";
import {message} from 'antd'

const success = () => {
    message.success({
        content: "Log-out success",
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

const errorMsg = () => {
    message.error("Error");
};

export const logOut=async()=>{
    const response = await supabase.auth.signOut()  
    if(!response.error){
        success()
        window.location.reload();
    }else{
        errorMsg()
    }
}


