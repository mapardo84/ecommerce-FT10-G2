import { Dispatch } from "react";
import { supabase } from "../SupaBase/conection";
import { message } from "antd";


export const GET_WISHLIST: string = "GET_WISHLIST";
export const POST_WISHLIST: string = "POST_WISHLIST";
export const DELETE_WISHLIST: string = "DELETE_WISHLIST"

const errorMsg = (err: string, time: number=3) => {
  message.error(err, time)
};


export const getWishlist = (id:any) => {
  return async (dispatch: Dispatch<any>) => {
    // supabase
    //                     .from('bookings')
    //                     .select('*, payments(totalPrice, payment_method), room_id(name, category_id(name, price), type_id(name, beds))')
    //                     .eq("id", booking.booking_id)
    //             )
    
          const{data:wishlist,error} = await supabase
                  .from('wishlist')
                  .select("*, categories(name,images) ")
                  .eq('user_id',id)
          if (!error) {
              
              dispatch(saveWishlist(wishlist))
          } 
  }
}

const saveWishlist = (payload:any) =>({
  type:GET_WISHLIST,
  payload:payload
})


export const addWishlist = ( category_id?: number, userId?: number, ) => {
  return async(dispatch: Dispatch<any>)=>{
      try{
          const {data,error} = await supabase.from('wishlist').insert([
              {
                  category_id: category_id,
                  user_id: userId,
              }
          ]);console.log(data)
          if (!error) {
              dispatch(handleWishlist(data));
          } else {
              errorMsg(JSON.stringify(error))
          }
      } catch (err){
          errorMsg('Internal server error. try again')
      }
  }
}

const handleWishlist= (data:any)=>({
  type:POST_WISHLIST,
  payload: data
})


export const deleteWishlist = (id:any) =>{
  return async(dispatch:Dispatch <any>)=>{
    console.log(id)
    const { data, error } = await supabase
  .from('wishlist')
  .delete()
  .eq('id', id)

  if(!error){
    dispatch(handleDeleteWishlist(data))}
  }
}
 
const handleDeleteWishlist= (data:any)=>({
  type:DELETE_WISHLIST,
  payload: data
})
