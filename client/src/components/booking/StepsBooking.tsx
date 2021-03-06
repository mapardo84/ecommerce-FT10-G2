import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../booking/StepsBooking.less'
import { Button, Steps } from 'antd';
import { PaxForm } from './paxForm/PaxForm';
import { AccomodationsSelect } from './accomodationsSelect/AccomodationsSelect';
import { bookingType, GuestsForm } from './guestsForm/GuestsForm';
import { getCategoriesForUser, setBookData, setLoading, stepChange } from '../../actions/Booking/bookingAction';
import { supabase } from '../../SupaBase/conection';
import { PreBooking } from '../PreBooking/PreBooking';
import { create_pre_booking, delete_pre_booking, get_pre, pre_booking_empty, setGuests } from '../../actions/Booking/pre_booking_action'
import Modal from 'antd/lib/modal/Modal';
import { Link } from 'react-router-dom';
import { RootReducer } from '../../reducers/rootReducer';

const { Step } = Steps;
export const StepsBooking = () => {
  const selectedStep: number = useSelector((state: RootReducer) => state.bookings.step);
  const pre_Booking_state = useSelector((state: RootReducer) => state.pre_booking);
  const { pre_booking } = pre_Booking_state
  const [continueBooking, setContinueBooking] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState({
    pending: true,
    delete: false,
    continue: false
  })
  const dispatch = useDispatch();


  useEffect(() => {
    if (supabase.auth.session()) {
      dispatch(get_pre(supabase.auth.user()?.email))
    }
  }, [dispatch])

  useEffect(() => {
    if (pre_booking.length < 1) {
      //console.log("entre")
      if (localStorage.getItem("Check&Guests") && localStorage.getItem("Accomodation")) {
        //console.log("hay ambos")
        dispatch(create_pre_booking(localStorage.getItem("Check&Guests"), localStorage.getItem("Accomodation")))
      } if (localStorage.getItem("Check&Guests") && !localStorage.getItem("Accomodation")) {
        //console.log("hay uno")
        dispatch(create_pre_booking(localStorage.getItem("Check&Guests")))
      }
    }
  }, [pre_booking, dispatch])



  useEffect(() => {
    if (pre_booking.length > 0 && inProgress.pending === true) {
      setContinueBooking(true)
    }
    let local_Guests: any = localStorage.getItem("Check&Guests")
    let local_Rooms: any = localStorage.getItem("Accomodation")
    if (local_Guests && local_Rooms) {
      local_Guests = JSON.parse(local_Guests)
      local_Rooms = JSON.parse(local_Rooms)
      let obj: bookingType = {
        guests: local_Guests.paxes,
        range: local_Guests.in_out,
        nights: local_Guests.nights,
        category: [local_Rooms.category_type],
        original_price: local_Rooms.original_price,
        fee: local_Rooms.total_price,
        room_id: local_Rooms.room_id,
        early_checkin: local_Guests.early_check,
        late_checkout: local_Guests.late_check

      }
      dispatch(getCategoriesForUser(obj))
      dispatch(setBookData(obj))
      dispatch(setLoading(true))
      dispatch(stepChange(2))
    }
    else if (local_Guests && !local_Rooms) {
      let local: any = localStorage.getItem("Check&Guests")
      local = JSON.parse(local)
      let obj: bookingType = {
        guests: local.paxes,
        range: local.in_out,
        nights: local.nights,
        category: [],
        original_price: 0,
        fee: 0,
        room_id: 0,
        early_checkin: local.early_check,
        late_checkout: local.late_check
      }
      dispatch(setBookData(obj))
      dispatch(getCategoriesForUser(obj))
      dispatch(setLoading(true))
      dispatch(stepChange(1))
    }
    else {
      dispatch(stepChange(0))
    }
  }, [inProgress, pre_Booking_state, pre_booking, dispatch])

  useEffect(() => {
    window.scroll(0, 0)
    if (inProgress.continue === true) {
      if (inProgress.continue) {
        localStorage.setItem("Check&Guests", pre_booking[0]?.guests_nights)
        if (pre_booking[0]?.acomodation_step === null) {
          localStorage.removeItem("Accomodation")
        } else {
          localStorage.setItem("Accomodation", pre_booking[0]?.acomodation_step)
        }
      }
    }
  }, [inProgress, pre_booking])


  const continuePreBooking = () => {
    if (localStorage.getItem("Check&Guests")) {
      dispatch(setGuests(supabase.auth.user()?.email, localStorage.getItem("Check&Guests")))
      if (localStorage.getItem("Accomodation")) {
        dispatch(setGuests(supabase.auth.user()?.email, undefined, localStorage.getItem("Accomodation")))
      }
    }
    setInProgress({ pending: false, continue: true, delete: false })
    setContinueBooking(false)
  }

  const startsAgain = () => {
    dispatch(delete_pre_booking(supabase.auth.user()?.email))
    setInProgress({ pending: false, continue: false, delete: true })
    localStorage.removeItem("Check&Guests")
    localStorage.removeItem("Accomodation")
    localStorage.removeItem("total_price")
    localStorage.removeItem("payWithBalance")
    dispatch(pre_booking_empty())
    setContinueBooking(false)

  }

  return (
    <>
      <Steps
        type="navigation"
        size="default"
        current={selectedStep}
        initial={0}
        onChange={s => dispatch(stepChange(s))}
        className="site-navigation-steps"
      >


        <Step status={0 < selectedStep ? "finish" : "process"} title="Guests" description='' disabled={0 !== selectedStep ? true : false} />
        <Step status={1 < selectedStep ? "finish" : "wait"} title="Accomodations" disabled={1 !== selectedStep ? true : false} />
        <Step status={2 < selectedStep ? "finish" : "wait"} title="Payment" disabled={2 !== selectedStep ? true : false} />
      </Steps>
      <Modal

        visible={continueBooking}
        footer={null}>
        <div className="modalToContinueBooking">
          <div>You had already started a booking, what would you like to do?</div>

          <div className="buttonsModalToContinueBooking">
            <Link to="/booking">
              <Button type="primary" style={{ height: "45px" }} onClick={continuePreBooking}>Continue booking</Button>
            </Link>
            <Button type="primary" onClick={startsAgain} style={{ height: "45px" }}> Clear </Button>
          </div>
        </div>
      </Modal>

      { selectedStep === 0 && continueBooking === false ?
        <>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            {window.scroll(0, 0)}
            <PreBooking type={0} />
            <GuestsForm />
          </div>
        </>
        :
        null}
      { selectedStep === 1 && continueBooking === false ?
        <>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
            {window.scroll(0, 0)}
            <PreBooking type={0} />
            <AccomodationsSelect />
          </div>
        </>
        :
        null}

      { selectedStep === 2 && continueBooking === false && supabase.auth.user() ?
        <div>
          {window.scroll(0, 0)}
          <PaxForm />
        </div>

        : selectedStep === 2 && continueBooking === false ?
          <div className="logInBookingSteps">
            Please,log in</div>
          : null
      }

    </>
  )
}