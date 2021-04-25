import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select } from "antd";
import "./Category.less";
import { initialStateProps } from "./../../reducers/categoriesReducer";
import { getCategories, getCategoriesNames } from "../../actions";
import Category from "./Category";
import "./../accomodations/accomodations.less";
import "./../layout/homeLayout.less";
import { NavLink } from "react-router-dom";

const { Option } = Select;


const Categories = ({ data }: any): JSX.Element => {
  const dispatch = useDispatch();
  const cat = useSelector((state: initialStateProps) => state.categories);


  const getCategoriesDB = async (value: number | undefined) => {
    const resolve = await getCategories(value);
    dispatch(resolve);
  };

  const getCategoriesNamesDB = async () => {
    const resolve = await getCategoriesNames();
    dispatch(resolve);
  };

  useEffect(() => {
    getCategoriesDB(undefined);
    getCategoriesNamesDB()
  }, [dispatch]);

  const handleChange = (value: any) => {
    if (value === '0') {
      getCategoriesDB(undefined);
    } else {
      getCategoriesDB(value);
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
          <Option value="0">All Categories</Option>

          {cat?.categoriesNames.map((category: any, i: number) => {
            return (
              <Option value={category.id} key={i}>{category.name}</Option>
            )
          })}
        </Select>

      </div>
      <div>
        {cat.categories?.map((categ: any, key: number) => (
          <Category categ={categ} num={num++} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
