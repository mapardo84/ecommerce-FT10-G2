import { bookAction, GET_BOOKINGS, SET_BOOK_DATA, STEP_CHANGE, GET_TYPES,GET_ROOMS, GET_SOME_BOOKINGS,CATEGORIES_TO_SHOW } from '../actions/Booking/bookingAction';

const initialState = {
    step: 0,
    booking: {
        guests: 0,
        range: ['', ''],
        nights: 0,
        category: []
    },
    allBookings:[],
    types:[],
    rooms:null,
    savedBookings: [],
    categoriesToShow: []
}

export function bookingsReducer (state = initialState, action:bookAction) {
    switch ( action.type ) {
        case STEP_CHANGE:
            return { ...state, step: action.payload };
        case SET_BOOK_DATA:
            const { booking } = action.payload;
            return { ...state, booking };
        case GET_BOOKINGS: 
            return{...state, allBookings:action.payload}   
        case GET_TYPES:
            return{...state, types:action.payload} 
        case GET_ROOMS:
            return{...state, rooms:action.payload}
        case GET_SOME_BOOKINGS:
            return{...state,savedBookings:action.payload}
        case CATEGORIES_TO_SHOW:
            return{...state, categoriesToShow:action.payload}        
        default: return state;
    }
}