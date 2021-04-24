import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../booking/StepsBooking.less'
import { Button, Steps } from 'antd';
import { PaxForm } from './paxForm/PaxForm';
import { AccomodationsSelect } from './accomodationsSelect/AccomodationsSelect';
import { bookingType, GuestsForm } from './guestsForm/GuestsForm';
import { getCategoriesForUser, setBookData, setLoading, stepChange } from '../../actions/Booking/bookingAction';
import { supabase } from '../../SupaBase/conection';
import { Pre_booking } from '../Pre_booking/Pre_booking';
import { delete_pre_booking, get_pre, pre_booking_empty } from '../../actions/Booking/pre_booking_action';
import Modal from 'antd/lib/modal/Modal';
import { Link } from 'react-router-dom';

const { Step } = Steps;
export const StepsBooking: FunctionComponent = () => {
  const selectedStep:number = useSelector( (state:any) => state.bookings.step );
  const pre_Booking_state = useSelector( (state:any) => state.pre_booking );
  const {pre_booking}=pre_Booking_state
  const [continueBooking, setContinueBooking] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState({
    pending:true,
    delete:false,
    continue:false
  })
  const dispatch = useDispatch();
  
  interface Local_Guest{
    in_out:string[],
    nights:number,
    paxes:number
  }
  

  useEffect(() => {
    if(supabase.auth.session()){
      console.log(supabase.auth.session())
      dispatch(get_pre(supabase.auth.user()?.email))
      localStorage.removeItem("Check&Guest  s")
      localStorage.removeItem("Accomodation")
    }
  }, [])


  useEffect(() => {
    if(pre_booking.length>0 && inProgress.pending===true && pre_booking[0].guests_nights){
      setContinueBooking(true)
    }     
    let local_Guests:any=localStorage.getItem("Check&Guests")
    let local_Rooms:any=localStorage.getItem("Accomodation")
    
    if(local_Guests&&local_Rooms){
      local_Guests=JSON.parse(local_Guests)
      local_Rooms=JSON.parse(local_Rooms)
      let obj:bookingType={
        guests:local_Guests.paxes,
        range:local_Guests.in_out,
        nights:local_Guests.nights, 
        category:[local_Rooms.category_type],
        fee:local_Rooms.total_price,
        room_id:local_Rooms.room_id
      }
      dispatch(getCategoriesForUser(obj))
      dispatch(setBookData(obj))
      dispatch(setLoading(true))
      dispatch(stepChange(2))
    }
    else if(local_Guests && !local_Rooms){
      let local:any=localStorage.getItem("Check&Guests")
      local=JSON.parse(local)
      let obj:bookingType={
        guests:local.paxes,
        range:local.in_out,
        nights:local.nights, 
        category:[],
        fee:0,
        room_id:0,
      }
      dispatch(setBookData(obj))
      dispatch(getCategoriesForUser(obj))
      dispatch(setLoading(true))
      dispatch(stepChange(1))
    }
    else{
      dispatch(stepChange(0))
    }
  },[inProgress,pre_Booking_state])

  useEffect(()=>{
    if (inProgress.continue===true){
      if(inProgress.continue){
        console.log("entre")
        localStorage.setItem("Check&Guests",pre_booking[0].guests_nights)
        if(pre_booking[0].acomodation_step===null){
        localStorage.removeItem("Accomodation")
        }
      }else{
        localStorage.setItem("Accomodation",pre_booking[0].acomodation_step)
    }
  }
},[inProgress])


  


  const continuePreBooking=()=>{
    dispatch(get_pre(supabase.auth.user()?.email))
    setInProgress({pending:false,continue:true,delete:false})
    setContinueBooking(false)
  }

  const destroyPreBooking=()=>{
    dispatch(delete_pre_booking(supabase.auth.user()?.email))
    setInProgress({pending:false,continue:false,delete:true})
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
        onChange={ s => dispatch(stepChange(s)) }
        className="site-navigation-steps"
      >


        <Step status={0 < selectedStep ? "finish" : "process"} title="Guests" description='' disabled={0!==selectedStep?true:false} />
        <Step status={1 < selectedStep ? "finish" : "wait"} title="Accomodations" disabled={1 !== selectedStep? true:false} />
        <Step status={2 < selectedStep ? "finish" : "wait"} title="Payment" disabled={2 !== selectedStep? true:false} />
      </Steps>
      <Modal
      visible={continueBooking}
      footer={[
        <div style={{display:"flex",justifyContent:"center"}}>
          <Link to="/booking">
            <Button onClick={continuePreBooking}>Continue</Button>
          </Link>
        <Button onClick={destroyPreBooking}>Borrar</Button>
        </div>
      ]}>
        <div>Tenes algo pendiente brodi</div>
      </Modal>
      
      { selectedStep === 0 && continueBooking===false? 
        <> 
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
              <Pre_booking/>
              <GuestsForm />
          </div> 
        </>
          :
          null}
      { selectedStep === 1 && continueBooking===false ?
        <>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
            <Pre_booking/> 
            <AccomodationsSelect/>
          </div>
        </> 
        : 
      null}

      { selectedStep === 2 && continueBooking===false && supabase.auth.user()?
        <> 
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
            <Pre_booking/> 
            <PaxForm /> 
          </div>
        </> 
        : selectedStep===2 && continueBooking===false ?
          <div>Please,log in</div>
          :null}
    </>
  );
}