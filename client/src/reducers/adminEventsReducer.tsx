import { GET_ALL_HALLS } from '../Admin/actions/adminEventsActions';

const initialState = {
    halls: []
}

export const adminEventsReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_ALL_HALLS: 
            return { ...state, request: action.payload };
        default: 
            return state;
    }
}