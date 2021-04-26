import { Dispatch } from "redux";
import { supabase } from "../../SupaBase/conection";

export const GET_USER_PROFILE = 'GET_USER_PROFILE';


export const getUserProfile = () => {

    return async (dispatch: Dispatch<any>) => {

        const user: any = supabase.auth.user()

        if (user?.aud === "authenticated") {

            let userData: any = await supabase
                .from('users')
                .select("*")
                .eq('email', user.email)

            dispatch(saveUserProfile(userData.data[0]))
        }
    }
}

const saveUserProfile = (params: any) => {
    return {
        type: GET_USER_PROFILE,
        payload: params
    }
}
