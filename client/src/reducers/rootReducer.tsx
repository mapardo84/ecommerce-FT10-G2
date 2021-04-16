import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { roomsReducer } from "./roomsReducer";

//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
  //ej: ui: uiReducer, <- importamos el reducer
  categories: categoriesReducer,
  rooms: roomsReducer,
});
