import { POST_EMAIL_NEWSLETTER,GET_SUBS,UPDATE_SUB } from '../actions/addNewsletterSub/index';

interface actionProps {
    type: string,
    payload: any
}

interface IState { 
    newsletters: any[],
    newslettersCancelled: any[]
}

const InitialState: IState = { 
    newsletters: [],
    newslettersCancelled:[]
}


export function newsletterSubsReducer(state: IState = InitialState,action : actionProps){
    switch(action.type){
        case POST_EMAIL_NEWSLETTER:
            return{
                ...state,
                newsletters:[...state.newsletters, action.payload[0]]
            }
        case GET_SUBS:
            return{
                ...state,
                newslettersCancelled: action.payload
            }
        case UPDATE_SUB:
            return{
                ...state,
                newsletters: state.newsletters.map(newsletter=>{
                    if(newsletter.email === action.payload[0].email){
                        return action.payload[0]
                    }
                    return newsletter
                })
            }
        default:
            return state
    }

}
