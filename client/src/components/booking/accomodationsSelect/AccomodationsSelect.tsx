import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select } from "antd";
import '../../categories/Category.less'
import { initialStateProps } from "../../../reducers/categoriesReducer";
import { getCategories } from "../../../actions";
import './AccomodationsSelect.less'
import { AccomodationsCards } from "./AccomodationsCards";

const { Option } = Select;

export const AccomodationsSelect = ({ data }: any): JSX.Element => {

  const dispatch = useDispatch();

  const categoriesState = useSelector((state: initialStateProps) => state.categories);

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
    <div className='accomodationsSelect_container'>

        <div className="accomodationsSelect_select">
            <span>
                <Select
                placeholder="Select Category"
                style={{ width: 200 }}
                onChange={handleChange}
                >
                <Option value="0"> </Option>
                <Option value="5">Economic 1 Person</Option>
                <Option value="1">Standard 2 Persons</Option>
                <Option value="2">Standard 4 Persons</Option>
                <Option value="4">Suite 2 Persons</Option>
                <Option value="3">Suite 4 Persons</Option>
                <Option value="6">Penthouse 6 Persons</Option>
                </Select>
            </span>
      </div>

      <div className="accomodationsSelect_cards">
            {categoriesState.categories?.map((categ: any, key: number) => (
            <AccomodationsCards categ={categ} key={key} />
            ))}
      </div>

      <div className="accomodationsSelect_btn">
        <Button type="primary" htmlType="submit">UPGRADE CATEGORY</Button>
      </div>

    </div>
  );
};

