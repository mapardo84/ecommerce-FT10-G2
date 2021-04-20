import { supabase } from "../SupaBase/conection";
import { message } from 'antd'

const errorMsg = () => {
    message.error("Error");
};

export const logOut = async () => {
    const response = await supabase.auth.signOut()
    if (!response.error) {
        // success()
        return true
    } else {
        errorMsg()
    }
}


