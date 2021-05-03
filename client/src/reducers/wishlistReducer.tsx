import {POST_WISHLIST, GET_WISHLIST,DELETE_WISHLIST} from "../actions/WishlistAction"

const initialState = {
   userWishlist:[]
}

export function wishlistReducer (state=initialState, action:any){
    switch(action.type){
        case POST_WISHLIST:
            return{
                ...state,
                userWishlist: state.userWishlist.concat(action.payload)
            }
        case GET_WISHLIST:
            return{
                ...state, 
                userWishlist: action.payload
            }
        case DELETE_WISHLIST:
            return{
                ...state,
                    userWishlist: state.userWishlist.filter((w:any) =>w.id !==action.payload)
            }        
            default: return state;
    }
    
}