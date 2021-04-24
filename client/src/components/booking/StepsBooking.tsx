import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../booking/StepsBooking.less'
import { Steps } from 'antd';
import { PaxForm } from './paxForm/PaxForm';
import { AccomodationsSelect } from './accomodationsSelect/AccomodationsSelect';
import { GuestsForm } from '../booking/guestsForm/GuestsForm';
import { stepChange } from '../../actions/Booking/bookingAction';

const { Step } = Steps;

export const StepsBooking: FunctionComponent = () => {
  const selectedStep:number = useSelector( (state:any) => state.bookings.step );
  const dispatch = useDispatch();
  return (
    <>
      <Steps
        type="navigation"
        size="default"
        current={selectedStep}
        onChange={ s => dispatch(stepChange(s)) }
        className="site-navigation-steps"
      >
        <Step status={0 < selectedStep ? "finish" : "process"} title="Guests" description='' />
        <Step status={1 < selectedStep ? "finish" : "wait"} title="Accomodations" />
        <Step status={2 < selectedStep ? "finish" : "wait"} title="Payment" />
      </Steps>

      { selectedStep === 0 ? <GuestsForm /> : null}
      { selectedStep === 1 ? <AccomodationsSelect /> : null}
      { selectedStep === 2 ? <PaxForm /> : null}
    </>
  );
}