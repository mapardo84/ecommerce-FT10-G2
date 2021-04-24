import '../guestsForm/GuestsForm.less';
import '../../Calendar/MyCalendar.less';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Space, DatePicker, Switch } from 'antd';
import { setBookData, stepChange, getCategoriesForUser, setLoading} from '../../../actions/Booking/bookingAction';
import { Form, InputNumber, Button } from 'antd';
import moment from 'moment';
import { supabase } from '../../../SupaBase/conection';
import { setGuests } from '../../../actions/Booking/pre_booking_action';
import Checkbox from 'antd/lib/checkbox/Checkbox';
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
  guests:number
  range:string[]
  nights:number
  category:any
  fee:number
  room_id:number
  early_checkin:boolean
  late_checkout?:boolean
}

export const GuestsForm = () => {
  const dispatch = useDispatch();
  const [ booking, setBooking ] = useState<bookingType>({
    guests: 0,
    range: [],
    nights: 0,
    category: [],
    fee: 0,
    room_id: 0,
    early_checkin:false,
    late_checkout:false
  });
  const handleChangePaxs = ( inputs:number ) => { setBooking({...booking, guests: inputs}) };
  const handleChangeDates = (_a:any, dates:string[], _c:any) => {
    const checkin= new Date(dates[0]).getTime();
    const checkout= new Date(dates[1]).getTime();
    const nights= (checkout-checkin)/(1000*60*60*24);
    setBooking({ ...booking, range: dates, nights });
  }

  const disabledDate = ((current:any) => {
    return current && current < moment().subtract(1, 'd');
  });
  
  const handleClickRooms = async(e:any) => {
    e.preventDefault();
    dispatch(setBookData(booking));
    dispatch(getCategoriesForUser(booking));
    dispatch(setLoading(true));
    localStorage.setItem("Check&Guests",JSON.stringify({paxes:booking.guests,in_out:booking.range,nights:booking.nights,early_check:booking.early_checkin,late_check:booking.late_checkout}))    
    if(supabase.auth.user()){
      // dispatch(setGuests("hola","dale"))
      dispatch(setGuests(supabase.auth.user()?.email,JSON.stringify({paxes:booking.guests,in_out:booking.range,nights:booking.nights,early_check:booking.early_checkin,late_check:booking.late_checkout})))
    }
    dispatch(stepChange(1));
  } 

  const onFinish = (values: string) => {
    console.log('Received values of form: ', values);
  };

  const onCheckin=(early_checkin:boolean)=>{
    setBooking({...booking,early_checkin})
  }

  const onCheckout=async(late_checkout:boolean)=>{
    await setBooking({...booking,late_checkout})
  }
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
              <RangePicker disabledDate={disabledDate} onCalendarChange={handleChangeDates} className='backgroundPageA' open={true} />
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
                <Button style={{marginTop:"400px"}} onClick={() => dispatch(setBookData({guests: 0, range: [], nights: 0, category: [], fee: 0, room_id: 0,early_checkin:false,late_checkout:false}))} >Cancel</Button>
              </Link>
              
              <Button disabled={!( booking.range[0] && booking.range[1] && booking.guests )} style={{marginTop:"400px"}} onClick={handleClickRooms} type="primary">
                Next
              </Button>
              
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            <Form.Item
                        name='early_check'
                        label='Early Checkin'
                    >
                        <Switch
                            onChange={onCheckin}
                            defaultChecked={false}
                        /> 
                    </Form.Item>

                    <Form.Item
                        name='late_check'
                        label='Late Checkout'
                        
                    >
                        <Switch
                            onChange={onCheckout}
                            defaultChecked={false}
                        /> 
                    </Form.Item>
          </div>
           
          </Form.Item>
         
        </div>
      </Form>
    </div>
  );
};