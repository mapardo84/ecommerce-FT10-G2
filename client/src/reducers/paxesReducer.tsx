import { GET_ALL_PAXES, UPDATE_PAXES, DELETE_PAXES, ADD_PAXES, GET_ONE_PAX } from '../Admin/actions/paxesActions';

interface actionProps {
    type: string,
    payload: any
}

export interface PaxesInterface {
    paxes: any[],
    pax: any
}

const InitialState: PaxesInterface = {
    paxes: [],
    pax: ''
}

export function paxesReducer(state: PaxesInterface = InitialState, action: actionProps) {
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
                paxes: [...state.paxes, action.payload[0]]
            }
        case GET_ONE_PAX:
            return {
                ...state,
                pax: action.payload
            }


        default:
            return state
    }
}