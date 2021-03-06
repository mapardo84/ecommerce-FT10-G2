import { SET_MODAL_STATE } from '../actions/loginActions';

export interface LoginInterface{
    number:any
}

const initialState = {
    number: 0,
}

interface modalState {
    type: string,
    payload: number
}


export function loginReducer (state :LoginInterface = initialState, action:modalState) {

    switch ( action.type ) {
        case SET_MODAL_STATE:
            return { ...state, number: action.payload };
        default: return state;
    }
}