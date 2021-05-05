import { Dispatch } from 'react'
import { supabase } from '../../SupaBase/conection'
import { message } from 'antd';
import { IDiscounts } from '../components/Discounts/discounts'
import { loadingAdmin } from './adminUi';

export const GET_ALL_DISCOUNTS: string = "GET_ALL_DISCOUNTS"
export const UPDATE_DISCOUNTS: string = "UPDATE_DISCOUNTS"
export const DELETE_DISCOUNTS: string = "DELETE_DISCOUNTS"
export const ADD_DISCOUNT: string = "ADD_DISCOUNT"
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

export const getAllDiscounts = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(loadingAdmin(true))
        try {
            const { data, error } = await supabase.from('discounts').select('*')
            if (!error) {
                dispatch(saveAllDiscounts(data))
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

export const updateDiscounts = (dataChange: IDiscounts) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error, data } = await supabase
                .from('discounts')
                .update({
                    id: dataChange.id,
                    description: dataChange.description,
                    value: dataChange.value,
                    categoryToApply: dataChange.categoryToApply,
                    published: dataChange.published,
                    releaseDate: dataChange.releaseDate,
                    expirationDate: dataChange.expirationDate
                })
                .eq('id', dataChange.id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('Discount updated')
                dispatch(updatedDiscounts(data))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

export const deleteDiscount = (id: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { error } = await supabase
                .from('discounts')
                .delete()
                .eq('id', id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('Discount deleted')
                dispatch(deletedDiscounts(id))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }

}

export const checkId = async (mail: string) => {
    const { data: discounts } = await supabase
        .from('discounts')
        .select("id")
        .eq('id', mail)
    if (discounts) {
        if (discounts.length > 0) {
            return "existe"
        } else {
            return "no existe"
        }
    } else {
        return "Error"
    }
}

export const addDiscount = (newData: any) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(loadingAdmin(true))
        try {
            const { data, error } = await supabase
                .from('discounts')
                .insert([{
                    id: newData.id,
                    description: newData.description,
                    value: newData.value,
                    categoryToApply: newData.categoryToApply,
                    published: newData.published,
                    releaseDate: newData.releaseDate,
                    expirationDate: newData.expirationDate
                },
                ])
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                //console.log(data)
                success('Discount added')
                dispatch(addedDiscount(data))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
        dispatch(loadingAdmin(false))
    }
}


const saveAllDiscounts = (data: any) => ({
    type: GET_ALL_DISCOUNTS,
    payload: data
})
const updatedDiscounts = (data: any) => ({
    type: UPDATE_DISCOUNTS,
    payload: data
})
const deletedDiscounts = (data: any) => ({
    type: DELETE_DISCOUNTS,
    payload: data

})
const addedDiscount = (data: any) => ({
    type: ADD_DISCOUNT,
    payload: data
})
