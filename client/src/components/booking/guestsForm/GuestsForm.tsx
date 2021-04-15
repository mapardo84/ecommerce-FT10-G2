import '../guestsForm/GuestsForm.less';
import '../../Calendar/MyCalendar.less';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Space, DatePicker } from 'antd';
import { setBookData, stepChange } from '../../../actions/Booking/bookingAction';
import { Form, InputNumber, Button } from 'antd';
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export interface bookingType {
  adults:number,
  children:number,
  range:string[],
  nights:number, 
  category:string[]
}

export const GuestsForm = () => {
  const currentBooking:bookingType = useSelector( (state:any) => state.bookings.booking );
  const dispatch = useDispatch();
  const [ booking, setBooking ] = useState<bookingType>({
    adults: 0,
    children: 0,
    range: [],
    nights: 0,
    category: []
  });

  const handleChangePaxsAdults = ( inputs:number ) => { setBooking({...booking, adults: inputs}) };
  const handleChangePaxsChildren = ( inputs:number ) => { setBooking({...booking, children: inputs}) };
  const handleChangeDates = (_a:any, dates:string[], _c:any) => {
    const checkin= new Date(dates[0]).getTime();
    const checkout= new Date(dates[1]).getTime();
    const nights= (checkout-checkin)/(1000*60*60*24);
    setBooking({ ...booking, range: dates, nights });
  }
  const handleClickRooms = (e:any) => {
    e.preventDefault();
    dispatch(setBookData(booking));
    dispatch(stepChange(1));
  } 

  const onFinish = (values: string) => {
    console.log('Received values of form: ', values);
  };

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
              <InputNumber name="adults" onChange={handleChangePaxsAdults} value={booking.adults} min={1} max={6} />
            </Form.Item>
          </Form.Item>

          <Form.Item className='input' >
            <Form.Item label="Children" name="input-number-children" >
              <InputNumber name="children" onChange={handleChangePaxsChildren} value={currentBooking.children} min={0} max={6} />
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
                <Button style={{marginTop:"400px"}} onClick={() => dispatch(setBookData({adults: 0, children: 0, range: [], nights: 0, category: []}))} >Cancel</Button>
              </Link>
              <Button disabled={!( booking.range[0] && booking.range[1] && booking.adults )} style={{marginTop:"400px"}} onClick={handleClickRooms} type="primary">
                Next
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};