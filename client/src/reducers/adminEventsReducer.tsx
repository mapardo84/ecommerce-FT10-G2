import { GET_BOOKED_EVENTS, GET_ALL_HALLS, GET_ALL_REQUESTS } from '../Admin/actions/adminEventsActions';


export interface initialStatePropsEvents {
    adminEvents: any;
    halls: any
  }

const initialState = {
    requests: [],
    bookings: [],
    halls: []
}

export const adminEventsReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_ALL_HALLS: 
            return { ...state, halls: action.payload };
        case GET_BOOKED_EVENTS:
            return { ...state, bookings: action.payload };
        case GET_ALL_REQUESTS:
            return { ...state, requests: action.payload };
        default: 
            return state;
    }
}