import { GET_ALL_USERS, UPDATE_USER, DELETE_USER } from '../Admin/actions/usersActions';

interface actionProps {
    type: string,
    payload: any
}

export interface UsersReducer{
    users: any[],
}

const InitialState: UsersReducer = {
    users: []
}

export function usersReducer(state: UsersReducer = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload[0].id) {
                        return action.payload[0]
                    }
                    return user
                })
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }


        default:
            return state
    }
}