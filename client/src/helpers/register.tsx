import { IRegister } from "../components/LogIn/Register";
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
        } else {
            errorMsg(JSON.stringify(error))
        }
    }else{
        errorMsg(JSON.stringify(results.error))
    }
    }catch(error){console.log(error)}
};
