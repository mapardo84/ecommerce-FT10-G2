import { ROOM_SELECTED, ROOM_NEXT_BOOKING, nextBooking } from '../Admin/actions/checkinActions';


interface IState {
    roomId: number,
    nextBooking: string
}

interface actionProps {
    type: string,
    payload: any
}

const InitialState: IState = {
    roomId: 0,
    nextBooking: 'N/A'
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


        default:
            return state
    }
}