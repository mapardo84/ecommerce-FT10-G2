import { Dispatch } from "redux";
import { supabase } from "../../SupaBase/conection";
import { message } from "antd";
import { IHalls } from "../components/Events/Halls";
export const GET_ALL_HALLS = 'GET_ALL_HALLS';
export const GET_BOOKED_EVENTS = 'GET_ALL_BOOKED_EVENTS';
export const GET_ALL_REQUESTS = 'GET_ALL_REQUESTS';

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

const getAllHallsAction = (data:IHalls[]|null) => ({
    type: GET_ALL_HALLS,
    payload: data,
});

export const getBookedEvents = () => {
    return async (dispatch:Dispatch) => {
        try {
            const { data, error } = await supabase
            .from("bookingsEvents")
            .select("*");

            if (!error) dispatch(getBookedEventsAction(data));
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

const getBookedEventsAction = (data:any) => ({
    type: GET_BOOKED_EVENTS,
    payload: data,
});

export const getAllRequests = () => {
    return async (dispatch:Dispatch) => {
        try {
            const { data, error } = await supabase
            .from("eventRequests")
            .select("*");

            if (!error) dispatch(getAllRequestsAction(data));
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

const getAllRequestsAction = (data:any) => ({
    type: GET_ALL_REQUESTS,
    payload: data,
});