import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Radio } from "antd";
import { AccomodationsCards } from "./AccomodationsCards";
import { setBookData, stepChange } from '../../../actions/Booking/bookingAction';
import { bookingType } from '../guestsForm/GuestsForm';
import "./AccomodationsSelect.less";
import { useState } from "react";
import { promotionType } from "../../../actions/Promotions/promotionsAction";
import { supabase } from "../../../SupaBase/conection";
import { setGuests } from "../../../actions/Booking/pre_booking_action";
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

export const AccomodationsSelect = ():JSX.Element => {
  const dispatch = useDispatch();
  const promo = useSelector( (state:any) => state.promotions )
  const [ userSelection, setUserSelection ] = useState<any>({
    category: '',
    type: {beds:1}
  });
  const booking:bookingType = useSelector( (state:any) => state.bookings.booking );
  const categoriesFind = useSelector((state:any)=> state.bookings.categoriesToShow);
  const freeRooms = useSelector((state:any) => state.bookings.freeRooms);
  const loadingStatus = useSelector((state:any) => state.bookings.loading);

  const handleClickBack = (e:any) => {
    e.preventDefault();
    localStorage.removeItem("Check&Guests")
    dispatch(stepChange(0));
  } 
  


  const handleClickNext = (e:any) => {
    e.preventDefault();
    booking.category = userSelection;
    booking.original_price=booking.category.category.price * booking.category.type.beds
    const foundPromo:promotionType = promo.find( (p:promotionType) => p.categoryToApply === booking.category.category.id );
    foundPromo? booking.fee = (booking.category.category.price * booking.category.type.beds * (1-foundPromo.value/100)):
    booking.fee = booking.category.category.price * booking.category.type.beds;
    console.log(booking.fee);
    booking.category = [userSelection];
    const roomSelected = freeRooms.find( (r:roomType) => { 
      return (r.category_id === booking.category[0].category.id && r.type_id === booking.category[0].type.id)
    });
    roomSelected? booking.room_id = roomSelected.id:
    booking.room_id = -1;
    console.log(booking.fee);

    dispatch(setBookData(booking));
    localStorage.setItem("Accomodation",JSON.stringify({
      room_id:roomSelected.id,
      category_type:userSelection,
      original_price: booking.original_price,
      total_price:booking.fee,
      }))
      if(supabase.auth.user()){
        // dispatch(setGuests("hola","dale"))
        dispatch(setGuests(supabase.auth.user()?.email,undefined,JSON.stringify({
          room_id:roomSelected.id,
          category_type:userSelection,
          original_price:booking.original_price,
          total_price:booking.fee,
          })))
      }
    dispatch(stepChange(2));
  }

  const handleSelectType = (value:any , option:any) => {
    const resul = categoriesFind.types.find( (x:any) => x.name === value );
    setUserSelection({...userSelection, type: resul});
  }

  const handleRadioGroup = (e:any) => {
    const { checked, value } = e.target;
    checked? setUserSelection({...userSelection, category: value}):
    setUserSelection({...userSelection, category: ''});
  }
  if ( loadingStatus ) {
    return <h1 style={{textAlign: 'center'}}>Loading...</h1>
  } else {
    return (
      <div className="accomodationsSelect_container">
        <div className="accomodationsSelect_cards">
         <Radio.Group onChange={handleRadioGroup} value={userSelection.category}>
            {categoriesFind.userCategories.length>0?categoriesFind.userCategories?.map((categ:categoryType, i:number) => (
              <div>
                <AccomodationsCards prom={promo} beds={userSelection?.type.beds} categ={categ} key={i} types={categoriesFind.types}/>
                <span>
                    <Select key='selectType'
                        placeholder="Select Type"
                        onChange={handleSelectType}
                        className="accomodationsSelect_si"
                    >
                    {categoriesFind.types?.map((t:any, i:number) => {
                        if (freeRooms.find( (r:any) => {
                          return ( r.category_id === categ.id && r.type_id === t.id )
                        })){
                          return (
                            <Option key={i} value={t.name}>{t.name}</Option>
                          )
                        } else { return <Option key={i} value={t.name} disabled>-</Option>}
                      })
                    }
                    </Select>
                    <Radio value={categ}></Radio>
                </span>
              </div>
            )):<div style={{fontSize:"80px"}}>ENTRE</div>
          }
         </Radio.Group>
        </div>
        <Button onClick={handleClickBack}>Go back</Button>
        <Button onClick={handleClickNext} disabled={!(userSelection.type && userSelection.category)}>Next</Button>
      </div>
    );
  }
};