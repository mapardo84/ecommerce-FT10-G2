import { bookingType } from '../../components/booking/guestsForm/GuestsForm';
export const STEP_CHANGE = 'STEP_CHANGE';
export const SET_BOOK_DATA = 'SET_BOOK_DATA'
export interface bookAction {
    type: string,
    payload: any
}

export const stepChange = (inputs:any) => {
    return {
        type: STEP_CHANGE,
        payload: inputs
    }
}

export const setBookData = (booking:bookingType) => {
    return {
        type: SET_BOOK_DATA,
        payload: { booking }
    }
}