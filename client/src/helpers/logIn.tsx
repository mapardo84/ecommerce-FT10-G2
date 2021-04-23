import { supabase } from '../SupaBase/conection'
import { message } from 'antd'
//test
export const success = () => {
    message.success("Log-In success");
};

const errorMsg = () => {
    message.error("Incorrect user or password, try again");
};
export const errorMsgcaptcha = () => {
    message.error("Complete the captcha to cotinue");
};
//Sign in using third-party providers.
export const loginWith = async (provider: any) => {
    
    try {
     
        const { error } = await supabase.auth.signIn({
            provider
        }, {
            redirectTo: 'http://localhost:3000/home'
        })
        if (!error) {
           
            var  data:any  = await supabase
            .from('users')
            .select('email')
            .eq('email', data.data)
            console.log(data)
             success()
//aca deberia capturar el mail
        } else {
            errorMsg()
        }
    } catch (err) { console.log(err) }
}

//user login with email provider
export const classicLogIn = async (email: string, password: string) => {

    try {
        var  data:any  = await supabase
        .from('users')
        .select('active')
        .eq('email', email)
        
        if(data.data[0].active === 1){
            const {error } = await supabase.auth.signIn({
                email,
                password
            }, {
                redirectTo: 'http://localhost:3000/home'
            })
            if (!error) {
                return true
    
            } else {
                errorMsg()
            }
        }
        else {
            errorMsg()
        }
  
    } catch (err) { console.log(err) }
}


//get the current user information
export const getUserData = async () => {

    const user = supabase.auth.user()

    if (user?.aud === "authenticated") {

        const email = user.email

        var { data } = await supabase
            .from('users')
            .select('first_name')
            .eq('email', email)

        return (data)
    }
}

//get current session
export const getSession = async (session: any) => {

    console.log(session)
    if (session !== null) {

        const { data } = await supabase
            .from('users')
            .select('email')
            .eq('email', session.user?.email)

        //user register if data is empty
        if (data?.length === 0) {
            if (session.user) { var name = (session.user.user_metadata.full_name)?.split(" ") }
            await supabase.from("users").insert([
                {
                    uuid: session.user?.id,
                    email: session.user?.email,
                    first_name: name[0],
                    last_name: name[1]
                },
            ]);
            console.log("USUARIO NUEVO REGISTRADO")
        } else {
            console.log("USUARIO YA EXISTE")
        }
    }
}