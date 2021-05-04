import { POST_WISHLIST, GET_WISHLIST, DELETE_WISHLIST, SAVE_CHECKED } from "../actions/WishlistAction"

export interface WishListInterface {
    userWishlist: any[]
    noChecked: boolean
}

const initialState = {
    userWishlist: [],
    noChecked: true
}

export function wishlistReducer(state: WishListInterface = initialState, action: any) {
    switch (action.type) {
        case POST_WISHLIST:
            return {
                ...state,
                userWishlist: state.userWishlist.concat(action.payload)
            }
        case GET_WISHLIST:
            return {
                ...state,
                userWishlist: action.payload
            }
        case SAVE_CHECKED:
            return {
                ...state,
                noChecked: action.payload
            }
        case DELETE_WISHLIST:
            return {
                ...state,
                userWishlist: state.userWishlist.filter((w: any) => w.id !== action.payload)
            }
        default: return state;
    }

}

