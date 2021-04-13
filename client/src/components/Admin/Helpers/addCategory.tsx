import { message } from 'antd';
import {supabase} from '../../../SupaBase/conection'

export interface CategoryData{
    name:string,
    capacity:number,
    description:string,
    details:string[],
    price:number,
    images:any
}

const success = () => {
    message.success({
        content: "Category has create success",
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

const errorMsg = (msg:string) => {
    message.error(msg);
};

export const add_new_room= async(categoryData:CategoryData)=>{    //function for insert a new room into DataBase
    const {name,capacity,description,details,price,images}=categoryData
    const {error}= await supabase.from("categories").insert([
        {
            name,
            capacity,
            description,
            details,
            price,
            images
        }
    ]);
    if(!error){
        success()
    }else{
        errorMsg("error")
    }
}