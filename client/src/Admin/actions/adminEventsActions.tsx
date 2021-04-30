import { Dispatch } from "redux";
import { supabase } from "../../SupaBase/conection";
import { message } from "antd";
export const GET_ALL_HALLS = 'GET_ALL_HALLS';

const errorMsg = (err: string, time: number=3) => {
    message.error(err, time)
};

export const getAllHalls = () => {
    return async (dispatch:Dispatch) => {
        try {
            const { data, error } = await supabase
            .from("halls")
            .select("*");

            if (!error) dispatch(getAllHallsAction(data));
            else {
                console.log(error);
                errorMsg(JSON.stringify(error));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    };
}

const getAllHallsAction = (data: any) => ({
    type: GET_ALL_HALLS,
    payload: data,
});