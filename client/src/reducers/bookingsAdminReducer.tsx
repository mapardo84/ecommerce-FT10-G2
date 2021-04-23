import { DATA_BOOKING, BOOKING_ID, DATA_PAYMENTS, DATA_PAXES } from "../Admin/actions/bookingsActions"
import { GET_ALL_ROOMS } from "../Admin/actions/roomsActions"

export interface IFinitialState {
    bookingPax: any[],
    bookings: any[],
    roomsId: any[],
    payments: any[],
    paxes: any[]
}

interface actions {
    type: string,
    payload: any
}

const InitialState: IFinitialState = {
    bookingPax: [],
    bookings: [],
    roomsId: [],
    payments: [],
    paxes: []

}

export function bookingsAdminReducer(state: IFinitialState = InitialState, action: actions) {
    
    switch (action.type) {
        case DATA_BOOKING:
            return{
                ...state,
                bookingPax: action.payload
            }
        case BOOKING_ID:
            return {
                ...state,
                bookings: action.payload
            }
        case DATA_PAYMENTS:
            return {
                ...state,
                payments: action.payload
            }
        case DATA_PAXES:
            return {
                ...state,
                paxes: action.payload
            }
        default:
            return state
    }
}
