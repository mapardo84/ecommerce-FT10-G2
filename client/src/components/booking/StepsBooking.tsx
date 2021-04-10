import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Steps } from 'antd';

const { Step } = Steps;

export function StepsBooking () {
  const [currentStep, setCurrentStep] = useState({
    current: 0
  })

  const onChange = (current: number) => {
    console.log('onChange:', current);
    setCurrentStep({ current });
  };

  // handleConfirm = e => {
  // }
    return (
      <>
        <Steps
          type="navigation"
          size="small"
          current= {currentStep.current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          <Step status="finish" title="User Info" />
          <Step status="finish" title="Dates Of Stay" />
          <Step status="process" title="Accomodations" />
          <Step status="wait" title="Payment" disabled />
        </Steps>
      </>
    );
  }