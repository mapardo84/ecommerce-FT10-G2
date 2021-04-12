import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Layout, Image, Select } from "antd";
import "./Category.less";
import { initialStateProps } from "./../../reducers/categoriesReducer";
import { getCategories } from "../../actions";
import Category from "./Category";
import "./../accomodations/accomodations.less";
import "./../layout/homeLayout.less";

const { Option } = Select;
const { Content, Header } = Layout;
const Categories = ({ data }: any): JSX.Element => {
  const dispatch = useDispatch();
  const cat = useSelector((state: initialStateProps) => state.categories);

  const getCategoriesDB = async (value: number | undefined) => {
    const resolve = await getCategories(value);
    dispatch(resolve);
  };

  useEffect(() => {
    getCategoriesDB(undefined);
  }, []);
  const handleChange = (value: any) => {
    console.log(value);
    getCategoriesDB(value);
  };

  return (
    <div>
      <div>
        <div className="categories_options">
          <span>
            <Select
              placeholder="Show..."
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="0">No Filter</Option>
              <Option value="5">Economic 1 Person</Option>
              <Option value="1">Standard 2 Persons</Option>
              <Option value="2">Standard 4 Persons</Option>
              <Option value="4">Suite 2 Persons</Option>
              <Option value="3">Suite 4 Persons</Option>
              <Option value="6">Penthouse 6 Persons</Option>
            </Select>
          </span>
          <span>
            <Button
              size="large"
              type="primary"
              className="accomodationReserveButton"
            >
              Book now!
            </Button>
          </span>
        </div>
      </div>
      <div className="categoriesContainer">
        {cat.categories?.map((categ: any, key: number) => (
          <Category categ={categ} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
