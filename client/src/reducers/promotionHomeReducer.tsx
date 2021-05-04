import { GET_NAMES } from '../actions/Promotions/promotionsAction'


export interface discountsInterface {
    discounts: []
}

interface actionDiscounts {
    type: string
    payload: any
}

const initialState: discountsInterface = {
    discounts: []
}

export const promotionHomeReducer = (state: discountsInterface = initialState, action: actionDiscounts) => {
    switch (action.type) {
        case GET_NAMES:
            return {
                ...state,
                discounts: action.payload
            }
    }

    return state

}
