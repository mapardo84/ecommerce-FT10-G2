import { ROOM_SELECTED, ROOM_NEXT_BOOKING, ROOM_BOOKING, ROOM_PAYMENTS } from '../Admin/actions/checkinActions';


interface IState {
    roomId: number,
    nextBooking: string,
    bookingData: any,
    roomPayments: any[]
}

interface actionProps {
    type: string,
    payload: any,

}

const InitialState: IState = {
    roomId: 0,
    nextBooking: 'N/A',
    bookingData: '',
    roomPayments: []
}

export function checkinReducer(state: IState = InitialState, action: actionProps) {
    switch (action.type) {
        case ROOM_SELECTED:
            return {
                ...state,
                roomId: action.payload
            }
        case ROOM_NEXT_BOOKING:
            return {
                ...state,
                nextBooking: action.payload
            }
        case ROOM_BOOKING:
            return {
                ...state,
                bookingData: action.payload
            }
        case ROOM_PAYMENTS:
            return {
                ...state,
                roomPayments: action.payload
            }


        default:
            return state
    }
}