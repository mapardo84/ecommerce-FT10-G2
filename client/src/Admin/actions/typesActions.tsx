import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import { loadingAdmin } from './adminUi';


export const GET_ALL_TYPES: string = "GET_ALL_TYPES"
export const FILTER_TYPE: string = "FILTER_TYPE"
export const ADD_TYPE: string = "ADD_TYPE"
export const UPDATE_TYPE: string = "UPDATE _TYPE"

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

export const getAllTypes = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(loadingAdmin(true))
        try {
            const { data, error } = await supabase.from('types').select('*')
            if (!error) {
                dispatch(saveTypes(data))
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

export const deleteType = (id: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error } = await supabase
                .from('types')
                .delete()
                .eq('id', id)
            if (error) {
                if (JSON.stringify(error).includes('violates foreign key constraint')) {
                    errorMsg("Before delete, the rooms have to be in other category.", 10)
                    return
                }
                errorMsg(JSON.stringify(error))
            } else {
                success('Type deleted')
                dispatch(filterType(id))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

export const addType = (newData: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data, error } = await supabase
                .from('types')
                .insert([{
                    name: newData.name,
                    capacity: newData.capacity,
                    beds: newData.beds
                },
                ])
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                //console.log(data)
                success('Type added')
                dispatch(addedType(data))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

export const updateType = (dataChange: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error, data } = await supabase
                .from('types')
                .update({
                    name: dataChange.name,
                    capacity: dataChange.capacity,
                    beds: dataChange.beds
                })
                .eq('id', dataChange.id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {

                success('Type updated')
                dispatch(updatedType(data))

            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

const saveTypes = (data: any) => ({
    type: GET_ALL_TYPES,
    payload: data
})

const filterType = (data: any) => ({
    type: FILTER_TYPE,
    payload: data
})

const addedType = (data: any) => ({
    type: ADD_TYPE,
    payload: data
})

const updatedType = (data: any) => ({
    type: UPDATE_TYPE,
    payload: data
})