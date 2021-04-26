import { GET_USER_BOOKINGS, SET_LOADING} from '../actions/Booking/userBookings';

interface actionProps {
    type: string,
    payload: any
}

interface IState {
    data: any[],
    loading: boolean
}

const InitialState: IState = {
    data: [],
    loading: false
}

export function userBookingReducer(state: IState = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_USER_BOOKINGS:
            return {
                ...state,
                data: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        default:
            return state
    }
}