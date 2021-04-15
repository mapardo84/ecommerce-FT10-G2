import { GET_CATEGORIES } from "./../actions/index";
import { FILTER_CATEGORY, UPDATE_CATEGORY } from "../Admin/actions/categoriesActions";
import { Category } from "../Admin/components/Categories/Categories";


export interface initialStateProps {
    categories: any;
}
interface IState {
  categories: Category[];
}

interface actionProps {
  type: string;
  payload: any;
}

const initialState: IState = {
  categories: [],
};

export function categoriesReducer(state: IState = initialState, action: actionProps) {
  switch (action.type) {
    case GET_CATEGORIES:
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
                categories: state.categories.map(category => {
                    if (category.id === action.payload[0].id) {
                        return action.payload[0]
                    }
                    return category
                })
            }
      default: 
        return state
}
}



