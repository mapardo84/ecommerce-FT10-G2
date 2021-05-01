import { combineReducers } from "redux";
import { AdminReducer, adminReducer } from "./adminReducer";
import { Categories, categoriesReducer } from "./categoriesReducer";
import { RoomReducer, roomsReducer } from "./roomsReducer";
import { BookingsReducer, bookingsReducer } from "./bookingsReducer";
import { TypesReducer, typesReducer } from './typesReducer';
import { UsersReducer, usersReducer } from './usersReducer';
import { getIdByEmailReducer, IdByEmailReducer } from './getIdByEmailReducer'
import { reviewsReducer, ReviewsReducerInterface } from './ReviewsReducer'
import { getCheckOutReducer,GetCheckoutInterface } from './getCheckOut';
import { LoginInterface, loginReducer } from "./loginReducer";
import { UserBookingInterface, userBookingReducer } from "./userBookingsReducer";
import { userProfileReducer,UserProfileInterface } from "./userProfileReducer";
import {WishListInterface, wishlistReducer} from "./wishlistReducer"
import { checkinReducer,CheckinInterface } from './checkinReducer';
import { paxesReducer, PaxesInterface } from './paxesReducer'
import { SearchBookingInterface, searchBookingReducer } from "./searchBarReducer";
import { bookingsAdminReducer,BookingsAdminInterface } from "./bookingsAdminReducer";
import {discountsAdminReducer,DiscountsAdminInterface} from "./discountsAdminReducer"
import { promotionsReducer } from './promotionsReducer';
import { newsletterReducer } from './newsletterReducer';

import { PreBookingInterface, pre_booking_reducer } from "./preBookingReducer";
import { promotionType } from "../actions/Promotions/promotionsAction";
export interface RootReducer{
  categories: Categories
  rooms: RoomReducer
  adminui: AdminReducer
  bookings: BookingsReducer
  types: TypesReducer
  users: UsersReducer
  idByMail: IdByEmailReducer
  reviews: ReviewsReducerInterface
  getCheckOut:GetCheckoutInterface
  login: LoginInterface
  userBookings: UserBookingInterface
  userProfile: UserProfileInterface
  wishlist: WishListInterface
  checkin: CheckinInterface
  paxes: PaxesInterface
  booking_pax:SearchBookingInterface
  bookingsAdminR: BookingsAdminInterface
  adminDiscounts:DiscountsAdminInterface
  promotions:promotionType[]
  pre_booking:PreBookingInterface
}
//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
  //ej: ui: uiReducer, <- importamos el reducer
  categories: categoriesReducer,
  rooms: roomsReducer,
  adminui: adminReducer,
  bookings: bookingsReducer,
  types: typesReducer,
  users: usersReducer,
  idByMail: getIdByEmailReducer,
  reviews: reviewsReducer,
  getCheckOut:getCheckOutReducer,
  login: loginReducer,
  userBookings: userBookingReducer,
  userProfile: userProfileReducer,
  wishlist: wishlistReducer,
  checkin: checkinReducer,
  paxes: paxesReducer,
  booking_pax:searchBookingReducer,
  bookingsAdminR: bookingsAdminReducer,
  adminDiscounts:discountsAdminReducer,
  promotions: promotionsReducer,
  pre_booking:pre_booking_reducer,
  newsletters: newsletterReducer,
});
