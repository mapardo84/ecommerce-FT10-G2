import { FILTER_ROOM, GET_ALL_ROOMS, UPDATE_ROOM, ADD_ROOM } from '../Admin/actions/roomsActions';
import { Room } from '../Admin/components/Rooms/Rooms'

interface IState {
    roomsList: Room[],
}

interface actionProps {
    type: string,
    payload: any
}

const InitialState: IState = {
    roomsList: []
}

export function roomsReducer(state: IState = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_ALL_ROOMS:
            return {
                ...state,
                roomsList: action.payload
            }
        case FILTER_ROOM:
            return {
                ...state,
                roomsList: state.roomsList.filter(room => room.id !== action.payload)
            }
        case UPDATE_ROOM:
            return {
                ...state,
                roomsList: state.roomsList.map(room => {
                    if (room.id === action.payload[0].id) {
                        return action.payload[0]
                    }
                    return room
                })
            }
        case ADD_ROOM:
            return {
                ...state,
                roomsList: [...state.roomsList, action.payload[0]]
            }

        default:
            return state
    }
}