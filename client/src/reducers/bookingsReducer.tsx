import { bookAction, SET_BOOK_DATA, STEP_CHANGE, GET_SOME_BOOKINGS,CATEGORIES_TO_SHOW } from '../actions/Booking/bookingAction';

const initialState = {
    step: 0,
    booking: {
        guests: 0,
        range: ['', ''],
        nights: 0,
        category: []
    },
    categoriesToShow: []
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
        default: return state;
    }
}