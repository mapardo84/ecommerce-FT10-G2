import { IRegister } from "../components/LogIn/Register";
import { supabase } from "../SupaBase/conection";
import { message } from "antd";

const success = () => {
    message.success("Confirmation email sent, please check it");
};

const errorMsg = (msg: any) => {
    message.error(msg);
};

export const sendRegister = async (formData: IRegister) => {
   
    try {
        var  data:any  = await supabase
        .from('users')
        .select('active')
        .eq('email', formData.email)
        console.log(data)
        if(data.data.length === 0){
            const results = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });
    
            if (!results.error) {
                const {error } = await supabase.from("users").insert([
                    {
                        uuid: formData.DNI,
                        email: formData.email,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                    },
                ]);
                if (!error) {
                    success();
                    return true
                } else {
                    errorMsg(JSON.stringify(error))
                }
            } else {
                errorMsg('A user with this email address has already been registered')
            }
        }
//         else if(data.data[0].active === 0){
//             const { error, data } = await supabase.auth.api
//                 .updateUser(token, { password: formData.password })
//             await supabase
//   .from('users')
//   .update({ uuid: formData.DNI, first_name: formData.firstName,last_name: formData.lastName,active: 1,})
//   .match({ email: formData.email, }) 
//         } //MAGIC LINK
    } catch (error) { console.log(error) }
};
