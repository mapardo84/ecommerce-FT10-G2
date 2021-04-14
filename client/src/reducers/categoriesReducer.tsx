import {GET_CATEGORIES} from '../actions/index';

export interface initialStateProps {
    categories: any
}

interface actionProps {
    type:string,
    payload:[]
}


const initialState:initialStateProps = {
  categories: []
}



export function categoriesReducer(state = initialState,action:actionProps){
    if(action.type=== GET_CATEGORIES){
        return{
            ...state,
            categories: action.payload
        }
    }
    return state;
}

