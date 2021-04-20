import { combineReducers } from "redux";
import { bookingsReducer } from "./bookingsReducer";
import { categoriesReducer } from "./categoriesReducer";
import { loginReducer } from "./loginReducer";
import { roomsReducer } from "./roomsReducer";
import { searchBookingReducer } from "./searchBookingReducer";

//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
  //ej: ui: uiReducer, <- importamos el reducer
  categories: categoriesReducer,
  login: loginReducer,
  rooms: roomsReducer,
  bookings:bookingsReducer,
  booking_pax:searchBookingReducer
});
