import { GET_USER_PROFILE } from "../actions/userProfile/userProfileActions";


interface actionProps {
    type: string,
    payload: any
}

interface IState {
    data: {},
    loading: boolean
}

const InitialState: IState = {
    data: {},
    loading: false
}

export function userProfileReducer(state: IState = InitialState, action: actionProps) {
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