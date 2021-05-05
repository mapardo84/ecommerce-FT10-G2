import { Dispatch } from "redux";
import { supabase } from "../../SupaBase/conection";

export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const UPDATE_USER_DATA="UPDATE_USER_DATA"


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

export const updateUserProfile=(info:any)=>{
    const {first_name,last_name,uuid}=info
    return async(dispatch:Dispatch)=>{
        const {data:updateUser}=await supabase
    .from("users")
    .update({
        uuid,
        first_name,
        last_name
        })
    .eq("email",supabase.auth.user()?.email)
    console.log(updateUser)
    dispatch(updateUserProfileAction(updateUser))
    }
    }


    const updateUserProfileAction=(data:any)=>{
        return{
            type:UPDATE_USER_DATA,
            payload:data
        }
    }
