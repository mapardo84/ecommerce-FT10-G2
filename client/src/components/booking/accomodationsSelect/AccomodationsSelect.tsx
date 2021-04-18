import { useDispatch, useSelector } from "react-redux";
import { Select, Button} from "antd";
import { getCategories } from "../../../actions";
import { AccomodationsCards } from "./AccomodationsCards";
import { setBookData, stepChange, finalFilterForRooms } from '../../../actions/Booking/bookingAction';
import { bookingType } from '../guestsForm/GuestsForm';
import "./AccomodationsSelect.less";
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
  //const [ categorySelected, setCategorySelected ] = useState<string[]>([]);
  const booking:bookingType = useSelector( (state:any) => state.bookings.booking );
  const categoriesFind = useSelector((state:any)=> state.bookings.categoriesToShow)
  const categoryPax = useSelector((state:any) => state.bookings.category )
  const freeRooms = useSelector((state:any) => state.bookings.freeRooms)
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
    //booking.category = categorySelected;
    dispatch(setBookData(booking));
    dispatch(stepChange(2));
    dispatch(finalFilterForRooms(categoryPax,freeRooms))
  }
 
  /*const handleCheckBox = (e:any) => {
    const { value, checked } = e.target;
    checked? setCategorySelected([...categorySelected, value]):
    setCategorySelected(categorySelected.filter( x => { return x !== value}));
    
  }*/

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
       
        {categoriesFind?.map((categ: any, i: number) => (
          <div>
            <AccomodationsCards categ={categ} booking={booking} key={i} />
          </div>
        ))}
      </div>
      <Button onClick={handleClickBack}>Go back</Button>
      <Button onClick={handleClickNext}>Next</Button>
    </div>
  );
};