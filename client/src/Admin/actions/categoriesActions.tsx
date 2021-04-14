import { Dispatch } from "react";
import { supabase } from "../../SupaBase/conection";
import { message } from "antd";

export const GET_CATEGORIES: string = "GET_CATEGORIES";

const errorMsg = (err: any) => {
  message.error(err);
};

export const getAllCategories = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data, error } = await supabase.from("categories").select("*");

      if (!error) {
        /* console.log(data) */
        dispatch(saveCategories(data));
      } else {
        console.log(error);
        errorMsg(JSON.stringify(error));
      }
    } catch (err) {
      console.log(err);
      errorMsg("Internal server error. Try again");
    }
  };
};

const saveCategories = (data: any) => ({
  type: GET_CATEGORIES,
  payload: data,
});

