import { GET_ALL_HALLS } from '../Admin/actions/adminEventsActions';

const initialState = {
    requests: [],
    bookings: [],
    halls: []
}

export const adminEventsReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_ALL_HALLS: 
            return { ...state, halls: action.payload };
        default: 
            return state;
    }
}