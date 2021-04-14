import '../guestsForm/GuestsForm.less';
import '../../Calendar/MyCalendar.less';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { Space, DatePicker } from 'antd';
import {
  Form,
  InputNumber,
  Button
} from 'antd';
import { getBookData, stepChange } from '../../../actions/Booking/bookingAction';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export const GuestsForm = () => {
  let nights:number;
  const dispatch = useDispatch();
  
  const [ date,setDate ] = useState<string[]>([]);

  const [ pax, setPax ] = useState<any>({
    adults:0,
    children:0
  });

  function handleChangePaxsAdults ( inputs:number ) {
    setPax({...pax,adults:inputs});
  }

  function handleChangePaxsChildren ( inputs:number ) {
    setPax({...pax,children:inputs});
  }

  function handleChangeDates (a:any,b:any,c:any){
    let checkin= new Date(b[0]).getTime();
    let checkout= new Date(b[1]).getTime();
    setDate(b)
    nights= (checkout-checkin)/(1000*60*60*24);
  }

  function handleClickRooms(e:any){
    e.preventDefault();
    dispatch(getBookData(pax, date, nights));
    dispatch(stepChange(1));
  } 

  const onFinish = (values: string) => {
    console.log('Received values of form: ', values);
  };

  const { RangePicker } = DatePicker

  return (
    <div className='conteiner'>

      <h1 className='adultsandchildren'> Guests </h1>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          'input-number-adults': 0,
          'input-number-children': 0,
        }}
      >
        <div className='inputs'>

          <Form.Item className='input'>
            <Form.Item  label="Adults" name="input-number-adults"  >
              <InputNumber name="adults" onChange={handleChangePaxsAdults} min={1} max={6} />
            </Form.Item>
          </Form.Item>

          <Form.Item className='input' >
            <Form.Item label="Children" name="input-number-children" >
              <InputNumber name="children" onChange={handleChangePaxsChildren} min={0} max={6} />
            </Form.Item>
          </Form.Item>
        </div>

        <div className='backgroundPage'>
      <Space direction="vertical" size={12}>
        <div className='Calendar'>
          <RangePicker onCalendarChange={handleChangeDates} className='backgroundPageA' open={true} />
        </div>
      </Space>
    </div>
        <div className='btn'>
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <div className="buttons_Guests">
              <Link to='/home'>
                <Button style={{marginTop:"400px"}} >Cancel</Button>
              </Link>
              <Button disabled={!( date[0] && date[1] && pax.adults)} style={{marginTop:"400px"}} onClick={handleClickRooms} type="primary">
                Next
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};