import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { categoriesReducer } from "./categoriesReducer";
import { loginReducer } from "./loginReducer";

//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
  //ej: ui: uiReducer, <- importamos el reducer
  categories: categoriesReducer,
  login: loginReducer,
  adminui: adminReducer
});
