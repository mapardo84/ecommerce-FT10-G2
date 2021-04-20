import {Registro} from "../components/LogIn/Register";
import { supabase } from "../SupaBase/conection";
import { message } from "antd";

const success = () => {
    message.success({
        content: "Success register",
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

const errorMsg = (msg:any) => {
    message.error(msg);
};

export const sendRegister = async (formData: Registro) => {
    try{const results = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    });
    
    if (!results.error) {
        const {uuid,email,first_name,last_name}=formData
        const { error } = await supabase.from("users").insert([
            {
                uuid,
                email,
                first_name,
                last_name
            },
        ]);
        if (!error) {
            success();
        } else {
            errorMsg(JSON.stringify(error))
        }
    }else{
        errorMsg(JSON.stringify(results.error))
    }
    }catch(error){console.log(error)}
};
