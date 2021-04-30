import { GET_USER_BOOKINGS, SET_LOADING} from '../actions/Booking/userBookings';

interface actionProps {
    type: string,
    payload: any
}

export interface UserBooking {
    actual: boolean;
    bookingId: number;
    bookingStatus: boolean;
    category: string;
    checkin: string;
    checkout: string;
    moneyBack: boolean;
    paxes: number;
    paymentMethod: string;
    roomNumber: string;
    totalPrice: number;
    type: string;
    userId: number;
  }

interface IState {
    data: UserBooking[],
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