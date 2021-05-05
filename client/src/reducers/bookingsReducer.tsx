import { bookAction, SET_BOOK_DATA, STEP_CHANGE, CATEGORIES_TO_SHOW, FREE_ROOMS_SHOW, SET_CATEGORY, SET_LOADING, GET_PAX_DATA } from '../actions/Booking/bookingAction';
import { roomType } from '../components/booking/accomodationsSelect/AccomodationsSelect';
export interface UserCategoriesInterface{
    id:number
    name:string
    capacity:number
    description:string
    details:string[]
    price:number
    images:string[]
}
export interface TypesCategoriesInterface{
    id:number
    name:string
    capacity:number
    beds:number
}
interface  BookingInterface{
    guests:number
    range:string[]
    nights:number
    category:any
    original_price:number
    fee:number
    room_id:number
    early_checkin:boolean
    late_checkout:boolean
}
interface CategoriesToShowInterface{
    userCategories:UserCategoriesInterface[]
    types:TypesCategoriesInterface[]|undefined
}

export interface BookingsReducer{
    step:any
    booking:BookingInterface
    freeRooms:roomType[]
    categoriesToShow:CategoriesToShowInterface 
    roomsAvailable:any
    loading: boolean
    pax_data:any
}
const initialState:BookingsReducer = {
    step: 0,
    booking: {
        guests: 0,
        range: ['', ''],
        nights: 0,
        original_price:0,
        category: '',
        fee: 0,
        room_id: 0,
        early_checkin:false,
        late_checkout:false,
    },
    freeRooms:[],
    categoriesToShow: {
        userCategories:[],
        types:[]
    },
    roomsAvailable:[],
    loading: false,
    pax_data:[]
}

export function bookingsReducer (state:BookingsReducer = initialState, action:bookAction) {
    switch ( action.type ) {
        case STEP_CHANGE:
            return { ...state, step: action.payload };
        case SET_BOOK_DATA:
            const { booking } = action.payload;
            return { ...state, booking };  
        case CATEGORIES_TO_SHOW:
            return{...state, categoriesToShow:action.payload, loading: false}      
        case FREE_ROOMS_SHOW:
            return{...state, freeRooms:action.payload }
        case SET_CATEGORY:
            return{...state, category: action.payload }  
        case SET_LOADING:
            return {...state, loading: action.payload};
        case GET_PAX_DATA:
            return{
                ...state,
                pax_data:action.payload
            }
        default: return state;
    }
}