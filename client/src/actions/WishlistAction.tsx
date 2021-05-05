import { Dispatch } from "react";
import { supabase } from "../SupaBase/conection";
import { message } from "antd";


export const GET_WISHLIST: string = "GET_WISHLIST";
export const POST_WISHLIST: string = "POST_WISHLIST";
export const DELETE_WISHLIST: string = "DELETE_WISHLIST"
export const SAVE_CHECKED: string = "SAVE_CHECKED"

const errorMsg = (err: string, time: number = 3) => {
  message.error(err, time)
};


export const getWishlist = () => {
  return async (dispatch: Dispatch<any>) => {
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("email", supabase.auth.user()?.email)
      .limit(1)
      .single()


    const { data: wishlist, error } = await supabase
      .from('wishlist')
      .select("*, categories(name,images) ")
      .eq('user_id', user.id)
    if (!error) {

      dispatch(saveWishlist(wishlist))
    }
  }
}


export const saveChecked = (payload: any) => ({
  type: SAVE_CHECKED,
  payload: payload
})


const saveWishlist = (payload: any) => ({
  type: GET_WISHLIST,
  payload: payload
})


export const addWishlist = (category_id?: number) => {
  return async (dispatch: Dispatch<any>) => {
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("email", supabase.auth.user()?.email)
      .limit(1)
      .single()
    try {
      const { data, error } = await supabase.from('wishlist').insert([
        {
          category_id: category_id,
          user_id: user.id,
        }
      ]);
      if (!error) {
        dispatch(handleWishlist(data));
      } else {
        errorMsg(JSON.stringify(error))
      }
    } catch (err) {
      errorMsg('Internal server error. try again')
    }
  }
}

const handleWishlist = (data: any) => ({
  type: POST_WISHLIST,
  payload: data
})


export const deleteWishlist = (id: any) => {
  return async (dispatch: Dispatch<any>) => {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('id', id)

    if (!error) {
      dispatch(handleDeleteWishlist(id))
    }
  }
}

const handleDeleteWishlist = (data: any) => ({
  type: DELETE_WISHLIST,
  payload: data
})
