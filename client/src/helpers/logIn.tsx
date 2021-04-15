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


export const faceLogIn = async () => {
    try {
        const { user, session, error } = await supabase.auth.signIn({

            // provider can be 'github', 'google', 'gitlab', or 'bitbucket'
            provider: 'facebook'
        }, {
            redirectTo: 'http://localhost:3000/home'
        })


        if (!error) {
            console.log(user)
            console.log(session)
            await success()


        } else {
            console.log(error)
            errorMsg()
        }
    } catch (err) { console.log(err) }

}


export const googleLogIn = async () => {
    try {
        const { user, session, error } = await supabase.auth.signIn({

            // provider can be 'github', 'google', 'gitlab', or 'bitbucket'
            provider: 'google'
        }, {
            redirectTo: 'http://localhost:3000/home'
        })


        if (!error) {
            console.log(user)
            console.log(session)
            await success()


        } else {
            console.log(error)
            errorMsg()
        }
    } catch (err) { console.log(err) }

}


export const classicLogIn = async (email: string, password: string) => {
    try {
        const { user, error } = await supabase.auth.signIn({
            email,
            password
        }, {
            redirectTo: 'http://localhost:3000/home'
        })
        if (!error) {
            console.log(user)
            success()
            return true

        } else {
            console.log(error)
            errorMsg()
        }
    } catch (err) { console.log(err) }
}
