import { bookAction, SET_BOOK_DATA, STEP_CHANGE, CATEGORIES_TO_SHOW, FREE_ROOMS_SHOW, SET_CATEGORY, SELECTED_CATEGORY_ROOMS} from '../actions/Booking/bookingAction';

const initialState = {
    step: 0,
    booking: {
        guests: 0,
        range: ['', ''],
        nights: 0,
        freeRooms: [],
    },
    category: [],
    categoriesToShow: [],
    roomsAvailableByCategory:[]
}

export function bookingsReducer (state = initialState, action:bookAction) {
    switch ( action.type ) {
        case STEP_CHANGE:
            return { ...state, step: action.payload };
        case SET_BOOK_DATA:
            const { booking } = action.payload;
            return { ...state, booking };  
        case CATEGORIES_TO_SHOW:
            return{...state, categoriesToShow:action.payload}      
        case FREE_ROOMS_SHOW:
            return{...state, freeRooms:action.payload }
        case SET_CATEGORY:
            return{...state, category: action.payload }  
        case SELECTED_CATEGORY_ROOMS:
            return{...state, roomsAvailableByCategory: action.payload}  
        default: return state;
    }
}