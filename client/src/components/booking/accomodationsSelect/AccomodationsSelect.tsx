import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Radio, Skeleton, Card, RadioChangeEvent} from "antd";
import { AccomodationsCards } from "./AccomodationsCards";
import { setBookData, stepChange } from '../../../actions/Booking/bookingAction';
import { bookingType } from '../guestsForm/GuestsForm';
import "./AccomodationsSelect.less";
import { SyntheticEvent, useState } from "react";
import { promotionType } from "../../../actions/Promotions/promotionsAction";
import { supabase } from "../../../SupaBase/conection";
import { setGuests } from "../../../actions/Booking/pre_booking_action";
import { RootReducer } from "../../../reducers/rootReducer";
import { TypesCategoriesInterface } from "../../../reducers/bookingsReducer";
// import { IoIosArrowBack } from "react-icons/io";
const { Option } = Select;

export interface roomType {
  id: number,
  name: string,
  description: null | string,
  floor: number,
  availability: string,
  category_id: number,
  type_id: number
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

export const AccomodationsSelect = (): JSX.Element => {
  const dispatch = useDispatch();
  const promo = useSelector((state: RootReducer) => state.promotions)
  const [userSelection, setUserSelection] = useState<{category:string;type:TypesCategoriesInterface|undefined}>({
    category: '',
    type: { id:0,name:"",capacity:0,beds: 1 }
  });
  const booking: bookingType = useSelector((state: RootReducer) => state.bookings.booking);
  const categoriesFind = useSelector((state: RootReducer) => state.bookings.categoriesToShow);
  const freeRooms = useSelector((state: RootReducer) => state.bookings.freeRooms);
  const loadingStatus = useSelector((state: RootReducer) => state.bookings.loading);

  const handleClickBack = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.removeItem("Check&Guests")
    dispatch(stepChange(0));
  }

  const handleClickNext = (e: SyntheticEvent) => {
    e.preventDefault();
    booking.category = userSelection;
    booking.original_price = booking.category.category.price * booking.category.type.beds
    const foundPromo: promotionType|undefined = promo.find((p: promotionType) => p.categoryToApply === booking.category.category.id);
    foundPromo ? booking.fee = Math.floor((booking.category.category.price * booking.category.type.beds * (1 - foundPromo.value / 100))) :
      booking.fee = Math.floor(booking.category.category.price * booking.category.type.beds);
    booking.category = [userSelection];
    const roomSelected = freeRooms.find((r: roomType) => {
      return (r.category_id === booking.category[0].category.id && r.type_id === booking.category[0].type.id)
    });
    roomSelected ? booking.room_id = roomSelected.id :
      booking.room_id = -1;

    dispatch(setBookData(booking));
    localStorage.setItem("Accomodation", JSON.stringify({
      room_id: roomSelected?.id,
      category_type: userSelection,
      original_price: booking.original_price,
      total_price: booking.fee,
    }))
    if (supabase.auth.user()) {
      // dispatch(setGuests("hola","dale"))
      dispatch(setGuests(supabase.auth.user()?.email, undefined, JSON.stringify({
        room_id: roomSelected?.id,
        category_type: userSelection,
        original_price: booking.original_price,
        total_price: booking.fee,
      })))
    }
    dispatch(stepChange(2));
  }

  const handleSelectType = (value:string) => {
    const resul = categoriesFind?.types?.find((x: TypesCategoriesInterface) => x.name === value);
    console.log(promo)
    setUserSelection({ ...userSelection, type: resul });
  }

  const handleRadioGroup = (e: RadioChangeEvent) => {
    const { checked, value } = e.target;
    checked ? setUserSelection({ ...userSelection, category: value }) :
      setUserSelection({ ...userSelection, category: '' });
  }

  if (loadingStatus) {
    return (
      <div>
        <div className="containerSelectLoading">
          <div className="textLoadingBooking">We are looking for the best room for you!</div>
          <Card
            style={{ width: "86vw", height: "500px", marginTop: 40, boxShadow: "0 8px 10px 0 rgba(0, 0, 0, 0.055)" }}>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </Card>
          <Card
            style={{ width: "85vw", height: "500", marginTop: 40, boxShadow: "0 8px 10px 0 rgba(0, 0, 0, 0.055)" }}>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </Card>
        </div>
      </div>
    )
  } else {
    return (

      <div className="accomodationsSelect_container">

        <div className="accomodationsSelect_cards">
          <Button style={{ marginLeft: "3vw", paddingLeft: "30px", paddingRight: "30px" }} size="large" onClick={handleClickBack} type="primary" >
            BACK
            </Button>

          {categoriesFind.userCategories.length > 0 ? categoriesFind.userCategories?.map((categ: categoryType, i: number) => (
            <div key={i}>

              <AccomodationsCards beds={userSelection?.type?.beds} prom={promo} categ={categ} key={i} types={categoriesFind.types} />

              <div className="containerButtonsBooking">


                <div className="selectButtonBooking">
                  <Select key='selectType'
                    placeholder="Select Type"
                    onChange={handleSelectType}
                  // className="accomodationsSelect_si"
                  >
                    {categoriesFind.types?.map((t: TypesCategoriesInterface, i: number) => {
                      if (freeRooms.find((r: roomType) => {
                        return (r.category_id === categ.id && r.type_id === t.id)
                      })) {
                        return (
                          <Option key={i} value={t.name}>{t.name}</Option>
                        )
                       }
                    })
                    }
                  </Select>

                  <Radio.Group buttonStyle="solid" onChange={handleRadioGroup} value={userSelection.category}>
                    <Radio.Button value={categ}>Select</Radio.Button>
                  </Radio.Group>
                </div>

                <div className="booking_Buttons">
                  <Button onClick={handleClickNext} disabled={!(userSelection.type && userSelection.category)}>Next</Button>
                </div>
              </div>
            </div>
          ))
            :
            <div className="accommodationNoResults">
            Sorry, we don't have rooms available, try again. :v
          </div>
          }
        </div>
      </div>
    );
  }
};