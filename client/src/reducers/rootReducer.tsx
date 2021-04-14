import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { categoriesReducer } from "./categoriesReducer";
import { loginReducer } from "./loginReducer";
import { roomsReducer } from "./roomsReducer";
import { bookingsReducer } from "./bookingsReducer";

//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
  //ej: ui: uiReducer, <- importamos el reducer
  categories: categoriesReducer,
  login: loginReducer,
  rooms: roomsReducer,
  adminui: adminReducer,
  bookings: bookingsReducer
});
