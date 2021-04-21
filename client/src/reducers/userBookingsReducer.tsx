import { GET_USER_BOOKINGS, } from '../actions/Booking/userBookings';

interface actionProps {
    type: string,
    payload: any
}

interface IState {
    data: any[],
}

const InitialState: IState = {
    data: []
}

export function userBookingReducer(state: IState = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_USER_BOOKINGS:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}