import { GET_DETAILS } from '../actions/detailsActions';
const initialState = {
    name: '',
    capacity: 0,
    description: '',
    details: [],
    price: 0,
    images: []
}

export default function detailsReducer ( state = initialState, action:{ type:string, payload: { name:string, capacity:number, description:string, details:any, price:number, images:any }} ) {
    switch( action.type ) {
        case GET_DETAILS:
            return {
                ...state,
                name: action.payload.name,
                capacity: action.payload.capacity,
                description: action.payload.description,
                details: action.payload.details,
                price: action.payload.price,
                images: action.payload.images
            }
        default: 
            return state;
    }
}