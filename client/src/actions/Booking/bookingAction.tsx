import { supabase } from "../../SupaBase/conection";
export const STEP_CHANGE = 'STEP_CHANGE';
export const GET_BOOK_DATA = 'GET_BOOK_DATA'
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

export const getBookData = (pax:number, date:string[], nights:number) => {
    return {
        type: GET_BOOK_DATA,
        payload: {pax, date, nights}
    }
}