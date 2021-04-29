import { GET_NEWSLETTER } from '../Admin/actions/newsletterActions';

interface actionProps {
    type: string,
    payload: any
}

/* interface IState {
    email_content: string,
    date: Date,
    email_title:string,
    identificador: string
} */
interface IState { 
    newsletters: any[]
}

const InitialState: IState = { 
    newsletters: []
}

export function newsletterReducer(state: IState = InitialState,action : actionProps){
    switch(action.type){
        case GET_NEWSLETTER:
            return{
                ...state,
                newsletters: action.payload
            }
        default:
            return state
    }

}
