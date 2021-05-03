import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import { IPaxes } from '../components/Paxes/Paxes';
import { loadingAdmin } from './adminUi';

export const GET_ALL_PAXES: string = 'GET_ALL_PAXES'
export const UPDATE_PAXES: string = 'UPDATE_PAXES'
export const DELETE_PAXES: string = 'DELETE_PAXES'
export const ADD_PAXES: string = 'ADD_PAXES'
export const GET_ONE_PAX: string = 'GET_ONE_PAX'

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

export const getAllPaxes = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data, error } = await supabase.from('paxes').select('*')
            if (!error) {
                dispatch(saveAllPaxes(data))
            } else {
                errorMsg(JSON.stringify(error))
            }
        } catch (err) {
            console.log(err)
            errorMsg('Internal server error. Try again')
        }
    }
}

export const updatePaxes = (dataChange: IPaxes) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data, error } = await supabase
                .from('paxes')
                .update({
                    uuid: dataChange.uuid,
                    first_name: dataChange.first_name,
                    last_name: dataChange.last_name,
                    phone: dataChange.phone,
                    country: dataChange.country,
                    birth_date: dataChange.birth_date,
                    address: dataChange.address
                })
                .eq('id', dataChange.id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('User updated')
                dispatch(updatedPaxes(data))
            }
        } catch (err) {
            console.log(err)
            errorMsg('Internal server error. Try again')
        }
    }
}


export const deletPaxes = (id: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('User deleted')
                dispatch(deletedPaxes(id))

            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }

}

export const checkUuid = async (uid: string) => {
    const { data: paxes } = await supabase
        .from('paxes')
        .select("uuid")
        .eq('uuid', uid)
    if (paxes) {
        if (paxes.length > 0) {
            return "existe"
        } else {
            return "no existe"
        }
    } else {
        return "Error"
    }
}

export const addPaxes = (newData: any) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(loadingAdmin(true))
        try {
            const { data, error } = await supabase
                .from('paxes')
                .insert([{
                    uuid: newData.uuid,
                    first_name: newData.first_name,
                    last_name: newData.last_name,
                    phone: newData.phone,
                    country: newData.country,
                    birth_date: newData.birth_date,
                    address: newData.address
                },
                ])
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('Pax added')
                dispatch(addedPaxes(data))
            }
        } catch (err) {
            console.log(err)
            errorMsg('Internal server error. Try again')
        }
        dispatch(loadingAdmin(false))
    }
}

export const getOnePax = (userId: number) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(loadingAdmin(true))
        try {
            const { data, error } = await supabase.from('paxes').select('*').eq('id', userId).limit(1).single()
            if (!error) {
                dispatch(saveOnePax(data))
            } else {
                errorMsg(JSON.stringify(error))
            }
        } catch (err) {
            console.log(err)
            errorMsg('Internal server error. Try again')
        }
        dispatch(loadingAdmin(false))
    }
}




const saveAllPaxes = (data: any) => ({
    type: GET_ALL_PAXES,
    payload: data
})

const updatedPaxes = (data: any) => ({
    type: UPDATE_PAXES,
    payload: data
})

const deletedPaxes = (data: any) => ({
    type: DELETE_PAXES,
    payload: data
})

const addedPaxes = (data: any) => ({
    type: ADD_PAXES,
    payload: data
})

const saveOnePax = (data: any) => ({
    type: GET_ONE_PAX,
    payload: data
})