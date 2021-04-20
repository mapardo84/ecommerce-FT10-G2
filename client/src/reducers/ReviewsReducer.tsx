import { POST_REVIEW } from '../actions/addReview'
import {GET_REVIEWS} from '../actions/Reviews/Reviews'


export interface initialStateProps {
    reviews:[]
}

interface actionreviews {
    type:string
    payload: any
}

const initialState: initialStateProps={
    reviews:[]
}

export const reviewsReducer = (state:initialStateProps = initialState,action:actionreviews) =>{
 switch (action.type) {
    case GET_REVIEWS:
        return {
            ...state, 
            reviews:action.payload
        }
    case POST_REVIEW:
        return{
            ...state,
            reviews: [action.payload[0],...state.reviews]
        }
 }

 return state
    
}

