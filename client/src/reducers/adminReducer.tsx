import { SIDEBAR_VIEW, CHANGE_PAGE, LOADING_ADMING } from '../Admin/actions/adminUi';


export interface initialStateProps {
    adminui: any,
    sidebarColapsed: boolean
}

interface actionProps {
    type: string,
    payload: any
}

const InitialState = {
    sidebarColapsed: false,
    page: 'Inicio',
    loading: false
}

export function adminReducer(state = InitialState, action: actionProps) {
    switch (action.type) {
        case SIDEBAR_VIEW:
            return {
                ...state,
                sidebarColapsed: !state.sidebarColapsed
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case LOADING_ADMING:
            return {
                ...state,
                loading: action.payload
            }

        default:
            return state
    }
}