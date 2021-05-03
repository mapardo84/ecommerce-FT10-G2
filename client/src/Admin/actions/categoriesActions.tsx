import { Dispatch } from "react";
import { supabase } from "../../SupaBase/conection";
import { message } from "antd";
import { loadingAdmin } from './adminUi';

export const GET_ADMIN_CATEGORIES: string = "GET_CATEGORIES";
export const FILTER_CATEGORY: string = "FILTER_CATEGORY";
export const UPDATE_CATEGORY: string = "UPDATE_CATEGORY";
export const CREATE_CATEGORY: string = "CREATE_CATEGORY";


const errorMsg = (err: string, time: number = 3) => {
  message.error(err, time)
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
    dispatch(loadingAdmin(true))
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
    dispatch(loadingAdmin(false))
  };
};
export const deleteCategory = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) {
        if (JSON.stringify(error).includes('violates foreign key constraint')) {
          errorMsg("The category you want to delete has rooms assigned to it. Reassign the rooms to another category in order to delete it", 10)
          return
        } else {
          errorMsg(JSON.stringify(error));
        }
      } else {
        success("Category deleted");
        dispatch(filterCategory(id));
      }
    } catch (err) {
      console.log(err);
      errorMsg("Internal server error. Try again");
    }
  };
};

export const updateCategory = (dataChange: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { error } = await supabase
        .from("categories")
        .update({
          name: dataChange.name,
          capacity: dataChange.capacity,
          description: dataChange.description,
          details: dataChange.details,
          price: dataChange.price,
          images: dataChange.images
        })
        .eq("id", dataChange.id);
      if (error) {
        errorMsg(JSON.stringify(error));
      } else {
        try {
          const { data: newData, error: newError } = await supabase
            .from("categories")
            .select("*")
            .eq("id", dataChange.id);
          if (newError) {
            errorMsg(JSON.stringify(error));
          } else {
            success("Category updated");
            dispatch(updatedCategory(newData));
          }
        } catch (err) {
          console.log(err);
          errorMsg("Internal server error. Try again");
        }
      }
    } catch (err) {
      console.log(err);
      errorMsg("Internal server error. Try again");
    }
  };
};

export const createCategory = (data: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data: newData, error } = await supabase.from("categories").insert({
        name: data.name,
        capacity: data.capacity,
        description: data.description,
        details: data.details,
        price: data.price,
        images: data.images
      });
      if (error) {
        errorMsg(JSON.stringify(error));
      } else {
        success("Category created");
        dispatch(createdCategory(newData));
      }
    } catch (err) {
      console.log(err);
      errorMsg("Internal server error. Try again");
    }
  };
};

const saveCategories = (data: any) => ({
  type: GET_ADMIN_CATEGORIES,
  payload: data,
});
const filterCategory = (data: any) => ({
  type: FILTER_CATEGORY,
  payload: data,
});
const updatedCategory = (data: any) => ({
  type: UPDATE_CATEGORY,
  payload: data,
});
const createdCategory = (data: any) => ({
  type: CREATE_CATEGORY,
  payload: data,
});
