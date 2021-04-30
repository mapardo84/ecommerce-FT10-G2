import { DATA_BOOKING, BOOKING_ID, DATA_PAYMENTS, DATA_PAXES } from "../Admin/actions/bookingsActions"
import { FREE_ROOMS, GET_CATEGORIES_AD, GET_PAX_INFO, GET_TYPES_AD } from "../Admin/actions/createBookAdmin"

export interface BookingsAdminInterface {
    bookingPax: any[],
    bookings: any[],
    roomsId: any[],
    payments: any[],
    paxes: any[],
    categories: any[],
    types: any[],
    paxInfo: any[]
    freeRooms: any[]
}

interface actions {
    type: string,
    payload: any
}

const InitialState: BookingsAdminInterface = {
    bookingPax: [],
    bookings: [],
    roomsId: [],
    payments: [],
    paxes: [],
    categories: [],
    types: [],
    paxInfo: [],
    freeRooms: []

}

export function bookingsAdminReducer(state: BookingsAdminInterface = InitialState, action: actions) {
    
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
        case GET_CATEGORIES_AD:
            
            return {
                ...state,
                categories: action.payload
            }
        case GET_TYPES_AD:
            return {
                ...state,
                types: action.payload
            }
        case GET_PAX_INFO:
            return {
                ...state,
                paxInfo: action.payload
            }
        case FREE_ROOMS:
            return {
                ...state,
                freeRooms: action.payload
            }
        default:
            return state
    }
}
