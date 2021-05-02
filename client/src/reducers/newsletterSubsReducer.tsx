import { POST_EMAIL_NEWSLETTER } from '../actions/addNewsletterSub/index';

interface actionProps {
    type: string,
    payload: any
}

interface IState { 
    newsletterSubs: any[]
}

const InitialState: IState = { 
    newsletterSubs: []
}


export function newsletterSubsReducer(state: IState = InitialState,action : actionProps){
    switch(action.type){
        case POST_EMAIL_NEWSLETTER:
            return{
                ...state,
                newsletters:[...state.newsletterSubs, action.payload[0]]
            }
        default:
            return state
    }

}
