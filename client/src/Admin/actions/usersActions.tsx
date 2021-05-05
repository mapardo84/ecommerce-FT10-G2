import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import { IUser } from '../components/Users/Users';
import { loadingAdmin } from './adminUi';

export const GET_ALL_USERS: string = "GET_ALL_USERS"
export const UPDATE_USER: string = "UPDATE_USER"
export const DELETE_USER: string = "DELETE_USER"


const errorMsg = (msg: string, time: number = 3) => {
    message.error(msg, time);
};

const success = (mensaje: string) => {
    message.success({
        content: mensaje,
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

export const getAllUsers = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(loadingAdmin(true))
        try {
            const { data, error } = await supabase.from('users').select('*').eq('active', 1)
            if (!error) {
                dispatch(saveAllUsers(data))
            } else {
                errorMsg(JSON.stringify(error))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
        dispatch(loadingAdmin(false))
    }
}

export const updateUser = (dataChange: IUser) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error, data } = await supabase
                .from('users')
                .update({
                    uuid: dataChange.uuid,
                    email: dataChange.email,
                    first_name: dataChange.first_name,
                    last_name: dataChange.last_name,
                    phone: dataChange.phone,
                    country: dataChange.country,
                    address: dataChange.address,
                    birth_date: dataChange.birth_date,
                    role: dataChange.role
                })
                .eq('id', dataChange.id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {

                success('User updated')
                dispatch(updatedUser(data))

            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

export const deletUser = (id: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error } = await supabase
                .from('users')
                .update({
                    active: 0,
                })
                .eq('id', id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {

                success('User deleted')
                dispatch(deletedUser(id))

            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }

}

export const checkEmail = async (mail: string) => {
    const { data: users } = await supabase
        .from('users')
        .select("email")
        .eq('email', mail)
    if (users) {
        if (users.length > 0) {
            return "existe"
        } else {
            return "no existe"
        }
    } else {
        return "Error"
    }
}

export const checkUuid = async (uid: string) => {
    const { data: users } = await supabase
        .from('users')
        .select("uuid")
        .eq('uuid', uid)
    if (users) {
        if (users.length > 0) {
            return "existe"
        } else {
            return "no existe"
        }
    } else {
        return "Error"
    }
}

export const resetPWD = async (email: string) => {

    const { error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) {
        errorMsg(JSON.stringify(error))
    } else {
        success('Recovery e-mail sent.')

    }

}


const saveAllUsers = (data: any) => ({
    type: GET_ALL_USERS,
    payload: data
})

const updatedUser = (data: any) => ({
    type: UPDATE_USER,
    payload: data
})

const deletedUser = (data: any) => ({
    type: DELETE_USER,
    payload: data
})