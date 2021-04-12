import React, { useState, FunctionComponent } from 'react';
import 'antd/dist/antd.css';
import { Steps } from 'antd';
import { PaxForm } from './paxForm/PaxForm';
import { AccomodationsSelect } from './accomodationsSelect/AccomodationsSelect';
import { MyCalendar } from '../Calendar/MyCalendar';
import '../booking/StepsBooking.less'
import { GuestsForm } from './guestsForm/GuestsForm';

const { Step } = Steps;

export const StepsBooking: FunctionComponent = () => {

  const [currentStep, setCurrentStep] = useState({
    current: 0
  })


  const onChange = (current: number) => {
    console.log('onChange:', current);
    setCurrentStep({ current });
  };


    return (
      <>
        <Steps
          type="navigation"
          size="default"
          current= {currentStep.current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          
          <Step status={0 < currentStep.current ? "finish" : "process"} title="Guests" description = '' />
          <Step status={1 < currentStep.current ? "finish" : "wait"} title="Dates Of Stay" />
          <Step status={2 < currentStep.current ? "finish" : "wait"} title="Accomodations" />
          <Step status={3 < currentStep.current ? "finish" : "wait"} title="Payment" />
        </Steps>

        { currentStep.current === 0? <GuestsForm/>: null}
        { currentStep.current === 1? <MyCalendar/>: null}
        { currentStep.current === 2? <AccomodationsSelect/>: null}
        { currentStep.current === 3? <PaxForm/>: null}
        
        
      </>
    );
  }