import { message } from "antd";
import { supabase } from '../../SupaBase/conection'

export const SIDEBAR_VIEW = 'SIDEBAR_VIEW'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const LOADING_ADMING = 'LOADING_ADMING'

const errorMsg = (msg: string, time: number = 3) => {
    message.error(msg, time);
};

export const loginUser = async () => {

    try {
        //get user session
        const session = supabase.auth.session()
        //console.log("session", session?.user.email)
        let { data: users } = await supabase
            .from('users')
            .select("email,active,role")
            .eq('email', session?.user.email)
            .single()
        if (users?.active === 0 || users?.role === 'user') {
            console.log("NO")
            return false
        } else {
            return true
        }
    } catch (err) {
        console.log(err)
        errorMsg("Internal server error. Try again")
    }
}

export const sidebarChange = () => ({
    type: SIDEBAR_VIEW
})

export const changePage = (page: string) => ({
    type: CHANGE_PAGE,
    payload: page,
})

export const loadingAdmin = (state: boolean) => ({
    type: LOADING_ADMING,
    payload: state
})
