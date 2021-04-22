import { GET_PROMOTIONS, promotionType } from '../actions/Promotions/promotionsAction';

const initialState:promotionType[] = [];

export function promotionsReducer (state = initialState, action:any) {
    switch ( action.type ) {
        case GET_PROMOTIONS:
            return action.payload;
        default: return state;
    }
}