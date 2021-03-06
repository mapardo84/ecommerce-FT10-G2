
import { GET_ALL_TYPES, FILTER_TYPE, ADD_TYPE, UPDATE_TYPE } from '../Admin/actions/typesActions';
import { IType } from '../Admin/components/Types/Types';

export interface TypesReducer {
    types: IType[],
}

interface actionProps {
    type: string,
    payload: any
}

const InitialState: TypesReducer = {
    types: []
}

export function typesReducer(state: TypesReducer = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case FILTER_TYPE:
            return {
                ...state,
                types: state.types.filter(type => type.id !== action.payload)
            }
        case ADD_TYPE:
            return {
                ...state,
                types: [...state.types, action.payload[0]]
            }
        case UPDATE_TYPE:
            return {
                ...state,
                types: state.types.map(type => {
                    if (type.id === action.payload[0].id) {
                        return action.payload[0]
                    }
                    return type
                })
            }

        default:
            return state
    }
}