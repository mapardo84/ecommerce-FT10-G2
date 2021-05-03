import { GET_USER_PROFILE ,UPDATE_USER_DATA} from "../actions/userProfile/userProfileActions";


interface actionProps {
    type: string,
    payload: any
}

export interface UserProfileInterface {
    data: any,
    loading: boolean,
    update:any
}

const InitialState: UserProfileInterface = {
    data: {},
    loading: false,
    update:[]
}

export function userProfileReducer(state: UserProfileInterface = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                data: action.payload
            }
        case UPDATE_USER_DATA:
            console.log(action.payload)
            return {
                ...state,
                update:action.payload
            }
        default:
            return state
    }
}