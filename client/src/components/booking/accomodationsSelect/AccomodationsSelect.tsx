import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import "../../categories/Category.less";
import { initialStateProps } from "../../../reducers/categoriesReducer";
import { getCategories } from "../../../actions";
import "./AccomodationsSelect.less";
import { AccomodationsCards } from "./AccomodationsCards";
import 'antd/dist/antd.css';

const { Option } = Select;

const getCategoriesDB = async (value: number | undefined, dispatch: any) => {
  const resolve = await getCategories(value);
  dispatch(resolve);
};


export const AccomodationsSelect = ({ data }: any): JSX.Element => {
  const dispatch = useDispatch();

  const categoriesState = useSelector(
    (state: initialStateProps) => state.categories
  );

 
  useEffect(() => {
    getCategoriesDB(undefined, dispatch);
  }, [dispatch]);

  const handleChange = (value: any) => {
    if (value === "0") {
      getCategoriesDB(undefined, dispatch);
    } else {
      getCategoriesDB(value, dispatch);
    }
  };

  return (
    <div className="accomodationsSelect_container">
      <div className="accomodationsSelect_select">
        <span>
          <Select
            placeholder="Select Category"
            // style={{ width: 200 }}
            onChange={handleChange}
            className="accomodationsSelect_si"
          >
            <Option value="0">All categories</Option>
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

      {/* <div className="accomodationsSelect_btn">
        <Button type="primary" htmlType="submit">SELECT</Button>
      </div> */}
    </div>
  );
};
