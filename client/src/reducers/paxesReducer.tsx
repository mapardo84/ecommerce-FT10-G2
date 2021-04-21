import { GET_ALL_PAXES,UPDATE_PAXES,DELETE_PAXES, ADD_PAXES } from '../Admin/actions/paxesActions';

interface actionProps {
    type: string,
    payload: any
}

interface IState {
    paxes: any[],
}

const InitialState: IState = {
    paxes: []
}

export function paxesReducer(state: IState = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_ALL_PAXES:
            return {
                ...state,
                paxes: action.payload
            }
        case UPDATE_PAXES:
            return {
                ...state,
                paxes: state.paxes.map(pax => {
                    if (pax.id === action.payload[0].id) {
                        return action.payload[0]
                    }
                    return pax
                })
            }
        case DELETE_PAXES:
            return {
                ...state,
                paxes: state.paxes.filter(pax => pax.id !== action.payload)
            }
        case ADD_PAXES:
            return {
                ...state,
                paxes: [...state.paxes,action.payload[0]]
            }


        default:
            return state
    }
}