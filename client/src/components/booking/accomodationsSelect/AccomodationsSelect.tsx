import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Checkbox, Radio } from "antd";
import { getCategories } from "../../../actions";
import { AccomodationsCards } from "./AccomodationsCards";
import { setBookData, stepChange, finalFilterForRooms } from '../../../actions/Booking/bookingAction';
import { bookingType } from '../guestsForm/GuestsForm';
import "./AccomodationsSelect.less";
import { useEffect, useState } from "react";
const { Option } = Select;

export interface roomType {
  id: number, 
  name: string, 
  description: null|string, 
  floor: number, 
  availability: string, 
  category_id:number, 
  type_id:number 
}

export interface categoryType {
  id: number, 
  name: string, 
  capacity: number, 
  description: string, 
  details: string[], 
  price: number, 
  images: string[],
}

const getCategoriesDB = async (value: number | undefined, dispatch: any) => {
  const resolve = await getCategories(value);
  dispatch(resolve);
};

export const AccomodationsSelect = ():JSX.Element => {
  const dispatch = useDispatch();
  const [ userSelection, setUserSelection ] = useState<any>({
    category: [],
    type: ''
  });
  const booking:bookingType = useSelector( (state:any) => state.bookings.booking );
  const categoriesFind = useSelector((state:any)=> state.bookings.categoriesToShow)
  const categoryPax = useSelector((state:any) => state.bookings.category )
  const freeRooms = useSelector((state:any) => state.bookings.freeRooms)
  
  useEffect(() => {
    console.log(categoriesFind.userCategories);
  }, [])
  
  const handleChange = (value: any) => {
    if (value === "0") getCategoriesDB(undefined, dispatch);
    else getCategoriesDB(value, dispatch);
  }

  const handleClickBack = (e:any) => {
    e.preventDefault();
    dispatch(stepChange(0));
  } 

  const handleClickNext = (e:any) => {
    e.preventDefault();
    dispatch(setBookData(booking));
    dispatch(stepChange(2));
    dispatch(finalFilterForRooms(categoryPax,freeRooms))
  }

  const handleSelectType = (value:any , option:any) => {
    console.log(value);
    setUserSelection({...userSelection, type: value});
  }

  const handleRadioGroup = (e:any) => {
    const { checked, value } = e.target;
    const [ categ_name, categ_id] = value;
    checked? setUserSelection({...userSelection, category: value}):
    setUserSelection({...userSelection, category: []});
    // dispatch(setCategory(categorySelected));
  }


  return (
    <div className="accomodationsSelect_container">
      <div className="accomodationsSelect_select">
        <span>
          <Select key='selectCategory'
            placeholder="Select Category"
            onChange={handleChange}
            className="accomodationsSelect_si"
          >
            <Option key={0} value="0">All categories</Option>
            <Option key={1} value="5">Economic 1 Person</Option>
            <Option key={2} value="1">Standard 2 Persons</Option>
            <Option key={3} value="2">Standard 4 Persons</Option>
            <Option key={4} value="4">Suite 2 Persons</Option>
            <Option key={5} value="3">Suite 4 Persons</Option>
            <Option key={6} value="6">Penthouse 6 Persons</Option>
          </Select>
        </span>
      </div>
      <div className="accomodationsSelect_cards">
       <Radio.Group onChange={handleRadioGroup} value={userSelection.category[1]}>
          {categoriesFind.userCategories?.map((categ:categoryType, i:number) => (
            <div>
              <AccomodationsCards categ={categ} booking={booking} key={i} types={categoriesFind.types}/>
              <span>
                  <Select key='selectType'
                      placeholder="Select Type"
                      onChange={handleSelectType}
                      className="accomodationsSelect_si"
                  >
                      {categoriesFind.types?.map((t:any, i:number) => {
                          return (
                            <Option key={i} value={t.name}>{t.name}</Option>
                          )})
                      }
                  </Select>
                  <Radio value={[categ.name, categ.id]}></Radio>
              </span>
            </div>
          ))}
       </Radio.Group>
      </div>
      <Button onClick={handleClickBack}>Go back</Button>
      <Button onClick={handleClickNext}>Next</Button>
    </div>
  );
};