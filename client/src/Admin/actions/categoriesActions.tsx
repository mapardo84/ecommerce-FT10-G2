import { Dispatch } from "react";
import { supabase } from "../../SupaBase/conection";
import { message } from "antd";

export const GET_CATEGORIES: string = "GET_CATEGORIES";
export const FILTER_CATEGORY: string = "FILTER_CATEGORY";
export const UPDATE_CATEGORY: string = "UPDATE_CATEGORY"

const errorMsg = (err: any) => {
  message.error(err);
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
export const deleteCategory = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
      try {
          const { error } = await supabase
              .from('categories')
              .delete()
              .eq('id', id)
          if (error) {
              errorMsg(JSON.stringify(error))
          } else {
              success('Category deleted')
              dispatch(filterCategory(id))
          }

      } catch (err) {
          console.log(err)
          errorMsg("Internal server error. Try again")
      }
  }
}

export const updateCategory = (dataChange: any) => {
  return async (dispatch: Dispatch<any>) => {
      try {
          const { error } = await supabase
              .from('categories')
              .update({
                  name: dataChange.name,
                  capacity: dataChange.capacity,
                  description: dataChange.description,
                  details: dataChange.details,
                  price: dataChange.price
              })
              .eq('id', dataChange.id)
          if (error) {
              errorMsg(JSON.stringify(error))
          } else {
              try {
                  const { data: newData, error: newError } = await supabase.from('categories').select('*').eq('id', dataChange.id)
                  if (newError) {
                      errorMsg(JSON.stringify(error))
                  } else {
                     
                      success('Category updated')
                      dispatch(updatedCategory(newData))
                  }
              } catch (err) {
                  console.log(err)
                  errorMsg("1.Internal server error. Try again")
              }
          }
      } catch (err) {
          console.log(err)          
          errorMsg("2.Internal server error. Try again")
      }
  }
}




const saveCategories = (data: any) => ({
  type: GET_CATEGORIES,
  payload: data,
});
const filterCategory = (data: any) => ({
  type: FILTER_CATEGORY,
  payload: data
})
const updatedCategory = (data: any) => ({
  type: UPDATE_CATEGORY,
  payload: data
})

