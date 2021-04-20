import { GET_CATEGORIES, GET_CATEGORIES_NAMES } from "./../actions/index";
import {
  GET_ADMIN_CATEGORIES,
  FILTER_CATEGORY,
  UPDATE_CATEGORY,
  CREATE_CATEGORY,
} from "../Admin/actions/categoriesActions";
import { Category } from "../Admin/components/Categories/Categories";
export interface initialStateProps {
  categories: any;
  
}
interface IState {
  categories: Category[];
  categoriesNames:any
}

interface actionProps {
  type: string;
  payload: any;
}

const initialState: IState = {
  categories: [],
  categoriesNames:[]
};

export function categoriesReducer(
  state: IState = initialState,
  action: actionProps
) {
  switch (action.type) {
    //USER ACTIONS
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    // ADMIN ACTIONS
    case GET_ADMIN_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case FILTER_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload[0].id) {
            return action.payload[0];
          }
          return category;
        }),
      };

    case CREATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      };
    case GET_CATEGORIES_NAMES:
      return{
        ...state,
        categoriesNames: action.payload
      }  
      

    default:
      return state;
  }
}
