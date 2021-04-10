import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";

//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
    //ej: ui: uiReducer, <- importamos el reducer
        login:loginReducer
})