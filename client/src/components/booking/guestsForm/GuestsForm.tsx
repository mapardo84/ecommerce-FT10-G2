import '../guestsForm/GuestsForm.less';
import '../../Calendar/MyCalendar.less';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Space, DatePicker } from 'antd';
import { setBookData, stepChange, getCategoriesForUser} from '../../../actions/Booking/bookingAction';
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
  guests:number,
  range:string[],
  nights:number, 
  category:any,
  fee:number,
  room_id:number
}

export const GuestsForm = () => {
  const dispatch = useDispatch();
  const [ booking, setBooking ] = useState<bookingType>({
    guests: 0,
    range: [],
    nights: 0,
    category: [],
    fee: 0,
    room_id: 0
  });
  const handleChangePaxs = ( inputs:number ) => { setBooking({...booking, guests: inputs}) };
  const handleChangeDates = (_a:any, dates:string[], _c:any) => {
    const checkin= new Date(dates[0]).getTime();
    const checkout= new Date(dates[1]).getTime();
    const nights= (checkout-checkin)/(1000*60*60*24);
    setBooking({ ...booking, range: dates, nights });
  }

  
  const handleClickRooms = async(e:any) => {
    e.preventDefault();
    dispatch(setBookData(booking));
    dispatch(getCategoriesForUser(booking));
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
            <Form.Item  label="Guests" name="input-number-guests"  >
              <InputNumber name="guests" onChange={handleChangePaxs} value={booking.guests} min={1} max={6} />
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
                <Button style={{marginTop:"400px"}} onClick={() => dispatch(setBookData({guests: 0, range: [], nights: 0, category: [], fee: 0, room_id: 0}))} >Cancel</Button>
              </Link>
              <Button disabled={!( booking.range[0] && booking.range[1] && booking.guests )} style={{marginTop:"400px"}} onClick={handleClickRooms} type="primary">
                Next
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};