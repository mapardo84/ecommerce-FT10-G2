import { GET_ALL_ROOMS } from '../Admin/actions/roomsActions'
import { Room } from '../Admin/components/Rooms/Rooms'

const InitialState = {
    roomsList: []
}

export function roomsReducer(state = InitialState, action: { type: string, payload: Room[] }) {
    switch (action.type) {
        case GET_ALL_ROOMS:
            return {
                ...state,
                roomsList: action.payload
            }
        default:
            return state
    }
}