import { supabase } from '../SupaBase/conection'
import { message } from 'antd'

export const success = () => {
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
            success()

        } else {
            errorMsg()
        }
    } catch (err) { console.log(err) }
}

//user login with email provider
export const classicLogIn = async (email: string, password: string) => {
    try {
        const { user, error } = await supabase.auth.signIn({
            email,
            password
        }, {
            redirectTo: 'http://localhost:3000/home'
        })
        if (!error) {
            success()
            return true

        } else {
            errorMsg()
        }
    } catch (err) { console.log(err) }
}


//get the current user information
export const getUserData = async () => {

    const user = supabase.auth.user()

    if (user?.aud == "authenticated") {

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