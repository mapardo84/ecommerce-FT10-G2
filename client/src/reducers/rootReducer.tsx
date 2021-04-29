import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { categoriesReducer } from "./categoriesReducer";
import { roomsReducer } from "./roomsReducer";
import { bookingsReducer } from "./bookingsReducer";
import { typesReducer } from './typesReducer';
import { usersReducer } from './usersReducer';
import { getIdByEmailReducer } from './getIdByEmailReducer'
import { reviewsReducer } from './ReviewsReducer'
import { getCheckOut } from './getCheckOut';
import { loginReducer } from "./loginReducer";
import { userBookingReducer } from "./userBookingsReducer";
import { userProfileReducer } from "./userProfileReducer";
import {wishlistReducer} from "./wishlistReducer"
import { checkinReducer } from './checkinReducer';
import { paxesReducer } from './paxesReducer'
import { searchBookingReducer } from "./searchBarReducer";
import { bookingsAdminReducer } from "./bookingsAdminReducer";
import {discountsAdminReducer} from "./discountsAdminReducer"
import { promotionsReducer } from './promotionsReducer';
import { pre_booking_reducer } from "./preBookingReducer";
import { newsletterReducer } from './newsletterReducer';

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
  getCheckOut,
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
