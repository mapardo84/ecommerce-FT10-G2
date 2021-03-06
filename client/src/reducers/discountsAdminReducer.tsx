import { GET_ALL_DISCOUNTS, UPDATE_DISCOUNTS, DELETE_DISCOUNTS } from '../Admin/actions/discountsActions';

interface actionProps {
    type: string,
    payload: any
}

export interface DiscountsAdminInterface {
    discounts: any[],
}

const InitialState: DiscountsAdminInterface = {
    discounts: []
}

export function discountsAdminReducer(state: DiscountsAdminInterface = InitialState, action: actionProps) {
    switch (action.type) {
        case GET_ALL_DISCOUNTS:
            return {
                ...state,
                discounts: action.payload
            }
        case UPDATE_DISCOUNTS:
            return {
                ...state,
                discounts: state.discounts.map(discount => {
                    if (discount.id === action.payload[0].id) {
                        return action.payload[0]
                    }
                    return discount
                })
            }
        case DELETE_DISCOUNTS:
            return {
                ...state,
                discounts: state.discounts.filter(discount => discount.id !== action.payload)
            }


        default:
            return state
    }
}