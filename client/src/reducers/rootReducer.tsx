import { combineReducers } from "redux";
import {categoriesReducer} from './categoriesReducer';

//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
    //ej: ui: uiReducer, <- importamos el reducer
    categories: categoriesReducer
})