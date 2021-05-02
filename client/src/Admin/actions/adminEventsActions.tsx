import { Dispatch } from "redux";
import { supabase } from "../../SupaBase/conection";
import { message } from "antd";
import { IHalls } from "../components/Events/Halls";
import { IBookedEvents } from "../components/Events/HallsBookings";
import { IRequests } from "../components/Events/HallsRequests";
export const GET_ALL_HALLS = 'GET_ALL_HALLS';
export const GET_BOOKED_EVENTS = 'GET_ALL_BOOKED_EVENTS';
export const GET_ALL_REQUESTS = 'GET_ALL_REQUESTS';
export const ADD_HALL = 'ADD_HALL';
export const ADD_REQUEST = 'ADD_REQUEST';
export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_HALL = 'DELETE_HALL';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_EVENT = 'DELETE_EVENT';
export const UPDATE_HALL = 'UPDATE_HALL';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';

const errorMsg = (err: string, time: number=3) => {
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

export const getAllHalls = () => {
    return async (dispatch:Dispatch) => {
        try {
            const { data } = await supabase
            .from('halls')
            .select('*');
            dispatch(getAllHallsAction(data));
        } catch (error) {
            console.error(error);
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

export const updateHall = (dataChange: IHalls) => {
    return async (dispatch:Dispatch) => {
        try {
            const { error, data } = await supabase
                .from('halls')
                .update({
                    description: dataChange.description,
                    image: dataChange.image,
                })
                .eq('id', dataChange.id);
            if (error) {
                errorMsg(JSON.stringify(error));
            } else {
                success('Hall updated');
                dispatch(updateHallAction(data));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    }
}

const updateHallAction = (data:IHalls[]|null) => ({
    type: UPDATE_HALL,
    payload: data
});

export const addHall = (newData:IHalls) => {
    return async (dispatch:Dispatch) => {
        try {
            const { data, error } = await supabase
                .from('halls')
                .insert([{
                    name: newData.name,
                    description: newData.description,
                    image: newData.image,
                },]);
            if (error) {
                errorMsg(JSON.stringify(error));
            } else {
                success('Hall added');
                dispatch(addHallAction(data?.pop()));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    }
}

const addHallAction = (data:IHalls) => ({
    type: ADD_HALL,
    payload: data
});

export const deleteHall = (id:number) => {
    return async (dispatch:Dispatch) => {
        try {
            const { error } = await supabase
                .from('halls')
                .delete()
                .eq('id', id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('Hall deleted')
                dispatch(deleteHallAction(id))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

const deleteHallAction = (data:number) => ({
    type: DELETE_HALL,
    payload: data 
});

export const updateEvent = (dataChange:IBookedEvents) => {
    return async (dispatch:Dispatch) => {
        try {

            const { error, data } = await supabase
                .from('bookingsEvents')
                .update({
                    name: dataChange.name,
                    startDate: dataChange.startDate,
                    finishDate: dataChange.finishDate,
                    methodPayment: dataChange.methodPayment,
                    hall_id: dataChange.hall_id
                })
                .eq('id', dataChange.id);
            if (error) {
                errorMsg(JSON.stringify(error));
            } else {
                success('Booked Event updated');
                dispatch(updateEventAction(data?.pop()));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    }
}

const updateEventAction = (data:IBookedEvents) => ({
    type: UPDATE_EVENT,
    payload: data
});

export const addEvent = (newData:IBookedEvents) => {
    return async (dispatch:Dispatch) => {
        try {
            const { data:bookings, error } = await supabase
                .from('bookingsEvents')
                .insert([{
                    name: newData.name,
                    startDate: newData.startDate,
                    finishDate: newData.finishDate,
                    methodPayment: newData.methodPayment,
                    hall_id: newData.hall_id
                },]);
            // const { data:bookedHall } = await supabase
            //     .from('booking_halls')
            //     .insert([{
            //         booking_id:,
            //         hall_id: newData.hall_id
            //     }])
            if (error) {
                errorMsg(JSON.stringify(error));
            } else {
                success('Event added');
                // console.log(bookedHall);
                dispatch(addEventAction(bookings?.pop()));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    }
}

const addEventAction = (data:IBookedEvents) => ({
    type: ADD_EVENT,
    payload: data
});

export const deleteEvent = (id:number|undefined) => {
    return async (dispatch:Dispatch) => {
        try {
            const { error } = await supabase
                .from('bookingsEvents')
                .delete()
                .eq('id', id);
            if (error) {
                errorMsg(JSON.stringify(error));
            } else {
                success('Event deleted');
                dispatch(deleteEventAction(id));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    }
}

const deleteEventAction = (data:number|undefined) => ({
    type: DELETE_EVENT,
    payload: data 
});

export const updateRequest = (dataChange: IRequests) => {
    return async (dispatch:Dispatch) => {
        try {
            const { error, data } = await supabase
                .from('eventRequests')
                .update({
                    name: dataChange.name,
                    last_name: dataChange.lastName,
                    company: dataChange.company,
                    telephone: dataChange.telephone,
                    startDate: dataChange.startDate,
                    finishDate: dataChange.finishDate,
                    eventName: dataChange.eventName,
                    requestSalon: dataChange.requestSalon,
                    requestCatering: dataChange.requestCatering,
                    additionalServices: dataChange.additionalServices,
                    comments: dataChange.comments,
                    type: dataChange.type,
                })
                .eq('id', dataChange.id);
            if (error) {
                errorMsg(JSON.stringify(error));
            } else {
                success('Request updated');
                dispatch(updateRequestAction(data?.pop()));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    }
}

const updateRequestAction = (data:IRequests) => ({
    type: UPDATE_REQUEST,
    payload: data
});

export const addRequest = (newData:IRequests) => {
    return async (dispatch:Dispatch) => {
        try {
            console.log(newData);
            const { data, error } = await supabase
                .from('eventRequests')
                .insert([{
                    name: newData.name,
                    last_name: newData.lastName,
                    company: newData.company,
                    telephone: newData.telephone,
                    startDate: newData.startDate,
                    finishDate: newData.finishDate,
                    eventName: newData.eventName,
                    requestSalon: newData.requestSalon,
                    requestCatering: newData.requestCatering,
                    additionalServices: newData.additionalServices,
                    comments: newData.comments,
                    type: newData.type,
                },]);
            if (error) {
                errorMsg(JSON.stringify(error));
            } else {
                success('Request added');
                dispatch(addRequestAction(data?.pop()));
            }
        } catch (err) {
            console.log(err);
            errorMsg("Internal server error. Try again");
        }
    }
}

const addRequestAction = (data:IRequests) => ({
    type: ADD_REQUEST,
    payload: data
});

export const deleteRequest = (id:number) => {
    return async (dispatch:Dispatch) => {
        try {
            const { error } = await supabase
                .from('eventRequests')
                .delete()
                .eq('id', id)
            if (error) {
                errorMsg(JSON.stringify(error))
            } else {
                success('Request deleted')
                dispatch(deleteRequestAction(id))
            }
        } catch (err) {
            console.log(err)
            errorMsg("Internal server error. Try again")
        }
    }
}

const deleteRequestAction = (data:number) => ({
    type: DELETE_REQUEST,
    payload: data 
});