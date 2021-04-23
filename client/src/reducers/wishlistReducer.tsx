import {POST_WISHLIST, GET_WISHLIST} from "../actions/WishlistAction"

const initialState = {
   wishlist:[],
   userWishlist:[]
}

export function wishlistReducer (state=initialState, action:any){
    switch(action.type){
        case POST_WISHLIST:
            return{
                ...state,
                wishlist: state.wishlist.concat(action.payload)
            }
        case GET_WISHLIST:
            return{
                ...state, 
                userWishlist: action.payload
            }    
            default: return state;
    }
    
}