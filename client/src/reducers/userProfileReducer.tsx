import { GET_USER_PROFILE } from "../actions/userProfile/userProfileActions";


interface actionProps {
    type: string,
    payload: any
}

export interface UserProfileInterface {
    data: {},
    loading: boolean
}

const InitialState: UserProfileInterface = {
    data: {},
    loading: false
}

export function userProfileReducer(state: UserProfileInterface = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}