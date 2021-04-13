import { message } from 'antd';
import {supabase} from '../../../SupaBase/conection'

export interface RoomData{
    name:string
    floor:number
    availability:string
    category_id:number
    beds:number
}

const success = () => {
    message.success({
        content: "Success register",
        className: "custom-class",
        style: {
            marginTop: "20vh",
        },
    });
};

const errorMsg = (msg:any) => {
    message.error(msg);
};

export const add_new_room= async(roomData:RoomData)=>{    //function for insert a new room into DataBase
    const {name,floor,availability,category_id,beds}=roomData
    const {error}= await supabase.from("rooms").insert([
        {
            name,
            floor,
            availability,
            category_id,
            beds,
        }
    ]);
    if(!error){
        success()
    }else{
        errorMsg("error")
    }
}