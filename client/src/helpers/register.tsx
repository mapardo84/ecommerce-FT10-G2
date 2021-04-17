import { IRegister } from "../components/LogIn/Register";
import { supabase } from "../SupaBase/conection";
import { message } from "antd";

const success = () => {
    message.success("Confirmation email sent, please check it");
};

const errorMsg = (msg:any) => {
    message.error(msg);
};

export const sendRegister = async (formData: IRegister) => {
    try{const results = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    });
    
    if (!results.error) {
        const { data, error } = await supabase.from("users").insert([
            {
                uuid: formData.DNI,
                email: formData.email,
                first_name: formData.firstName,
                last_name: formData.lastName,
            },
        ]);
        if (!error) {
            console.log(data)
            success();
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } else {
            errorMsg(JSON.stringify(error))
        }
    }else{
        errorMsg('A user with this email address has already been registered')
    }
    }catch(error){console.log(error)}
};
