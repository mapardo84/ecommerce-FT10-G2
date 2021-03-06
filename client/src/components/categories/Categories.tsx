import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import "./Categories.less";
import { initialStateProps } from "./../../reducers/categoriesReducer";
import { getCategories, getCategoriesNames } from "../../actions";
import Category from "./Category";
import "./../accomodations/accomodations.less";
import "./../layout/homeLayout.less";
import { Category as Icategory } from '../../Admin/components/Categories/Categories';

const { Option } = Select;

const getCategoriesDB = async (value: number | undefined, dispatch: any) => {
  const resolve = await getCategories(value);
  dispatch(resolve);
};

const getCategoriesNamesDB = async (dispatch: any) => {
  const resolve = await getCategoriesNames();
  dispatch(resolve);
};


const Categories = (): JSX.Element => {
  const dispatch = useDispatch();
  const cat = useSelector((state: initialStateProps) => state.categories);

  useEffect(() => {
    getCategoriesDB(undefined, dispatch);
    getCategoriesNamesDB(dispatch)
  }, [dispatch]);

  const handleChange = (value: any) => {
    if (value === '0') {
      getCategoriesDB(undefined, dispatch);
    } else {
      getCategoriesDB(value, dispatch);
    }
  };

  var num = 0

  return (
    <div className="categoryContainer">
      <div className="categories_options">
        <div className="category_titleSelect">SHOW ME</div>
        <Select
          placeholder="Show..."
          className="selectCategoryTitle"
          onChange={handleChange}
        >
          <Option value="0" key="key0">All Categories</Option>

          {cat?.categoriesNames.map((category: Icategory, i: number) => {
            return (
              <Option value={category.id} key={i}>{category.name}</Option>
            )
          })}
        </Select>

      </div>
      <div className="categories_CardsContainer">
        {cat?.categories.map((categ: Icategory, key: number) => (
          <Category categ={categ} num={num++} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
