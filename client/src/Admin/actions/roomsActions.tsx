import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';

export const GET_ALL_ROOMS: string = "GET_ALL_ROOMS"
export const FILTER_ROOM: string = "FILTER_ROOM"
export const UPDATE_ROOM: string = "UPDATE_ROOM"
export const ADD_ROOM: string = "ADD_ROOM"

const errorMsg = (msg: string) => {
    message.error(msg);
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

export const getAllRooms = () => {
    
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data, error } = await supabase.from('rooms').select('*,categories(name)')
            if (!error) {
                dispatch(saveRooms(data))
            } else {
                errorMsg(JSON.stringify(error))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

export const deleteRoom = (id: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error } = await supabase
                .from('rooms')
                .delete()
                .eq('id', id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('Room deleted')
                dispatch(filterRoom(id))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

export const updateRoom = (dataChange: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error } = await supabase
                .from('rooms')
                .update({
                    name: dataChange.name,
                    floor: dataChange.floor,
                    availability: dataChange.availability,
                    category_id: dataChange.category_id,
                    type_id: dataChange.type_id
                })
                .eq('id', dataChange.id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                try {
                    const { data: newData, error: newError } = await supabase.from('rooms').select('*,categories(name)').eq('id', dataChange.id)
                    if (newError) {
                        errorMsg(JSON.stringify(error))
                    } else {
                        //console.log("actualizado ", newData)
                        success('Room updated')
                        dispatch(updatedRoom(newData))
                    }
                } catch (err) {
                    console.log(err)
                    errorMsg("Internal server error. Try again")
                }
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

export const addRoom = (newData: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data, error } = await supabase
                .from('rooms')
                .insert([{
                    name: newData.name,
                    floor: newData.floor,
                    availability: newData.availability,
                    category_id: newData.category_id,
                    type_id: newData.type_id
                },
                ])
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                console.log(data)
                success('Room added')
                dispatch(addedRoom(data))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}


const saveRooms = (data: any) => ({
    type: GET_ALL_ROOMS,
    payload: data
})

const filterRoom = (data: any) => ({
    type: FILTER_ROOM,
    payload: data
})

const updatedRoom = (data: any) => ({
    type: UPDATE_ROOM,
    payload: data
})

const addedRoom = (data: any) => ({
    type: ADD_ROOM,
    payload: data
})