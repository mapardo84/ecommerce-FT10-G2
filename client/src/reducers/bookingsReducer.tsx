import { bookAction, GET_BOOK_DATA, STEP_CHANGE } from '../actions/Booking/bookingAction';

const initialState = {
    step: 0,
    book: {}
}

export function bookingsReducer (state = initialState, action:bookAction) {
    switch ( action.type ) {
        case STEP_CHANGE:
            return { ...state, step: action.payload };
        case GET_BOOK_DATA:
            const { pax, date, nights } = action.payload;
            return { ...state, book: { pax, date, nights }};
        default: return state;
    }
}