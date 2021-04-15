import { bookAction, SET_BOOK_DATA, STEP_CHANGE } from '../actions/Booking/bookingAction';

const initialState = {
    step: 0,
    booking: {
        adults: 0,
        children: 0,
        range: ['', ''],
        nights: 0,
        category: []
    }
}

export function bookingsReducer (state = initialState, action:bookAction) {
    switch ( action.type ) {
        case STEP_CHANGE:
            return { ...state, step: action.payload };
        case SET_BOOK_DATA:
            const { booking } = action.payload;
            return { ...state, booking };
        default: return state;
    }
}