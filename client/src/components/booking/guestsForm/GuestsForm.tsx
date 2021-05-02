import '../guestsForm/GuestsForm.less';
import '../../Calendar/MyCalendar.less';
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { DatePicker, Switch } from 'antd';
import { setBookData, stepChange, getCategoriesForUser, setLoading } from '../../../actions/Booking/bookingAction';
import { Form, InputNumber, Button } from 'antd';
import moment from 'moment';
import { supabase } from '../../../SupaBase/conection';
import { setGuests } from '../../../actions/Booking/pre_booking_action';
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
  original_price:number
  fee:number
  room_id:number
  early_checkin:boolean
  late_checkout:boolean
}

export const GuestsForm = () => {
  const dispatch = useDispatch();
  const [booking, setBooking] = useState<bookingType>({
    guests: 0,
    range: [],
    nights: 0,
    category: [],
    original_price:0,
    fee: 0,
    room_id: 0,
    early_checkin: false,
    late_checkout: false
  });
  const handleChangePaxs = ( inputs:number ) => { setBooking({...booking, guests: inputs}) };
  const handleChangeDates = (_a:any, dates:string[], _c:any) => {
    console.log(_a)
    const checkin= new Date(dates[0]).getTime();
    const checkout= new Date(dates[1]).getTime();
    const nights= ((checkout-checkin)/(1000*60*60*24))>0?(checkout-checkin)/(1000*60*60*24):1;
    setBooking({ ...booking, range: dates, nights });
  }

  const disabledDate = ((current:any) => {
    return current && current < moment().subtract(1, 'd');
  });

  const handleClickRooms = async (e:SyntheticEvent) => {
    e.preventDefault();
    dispatch(setBookData(booking));
    dispatch(getCategoriesForUser(booking));
    dispatch(setLoading(true));
    localStorage.setItem("Check&Guests", JSON.stringify({ paxes: booking.guests, in_out: booking.range, nights: booking.nights, early_check: booking.early_checkin, late_check: booking.late_checkout }))
    if (supabase.auth.user()) {
      dispatch(setGuests(supabase.auth.user()?.email, JSON.stringify({ paxes: booking.guests, in_out: booking.range, nights: booking.nights, early_check: booking.early_checkin, late_check: booking.late_checkout })))
    }
    dispatch(stepChange(1));
  }

  const onFinish = (values:string) => {
    console.log('Received values of form: ', values);
  };

  const onCheckin = (early_checkin:boolean) => {
    setBooking({ ...booking, early_checkin })
  }

  const onCheckout = async (late_checkout:boolean) => {
    await setBooking({ ...booking, late_checkout })
  }
  return (
    <div className='conteiner'>
      <div className="guestTitleBooking">BOOKING</div>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          'input-number-adults': 0,
          'input-number-children': 0,
        }}
      >
        <div className="guestEarlyBooking">
          <div >
            <Form.Item className='input'>
              <Form.Item name="input-number-guests"  >
                <InputNumber name="guests" placeholder="Guests" onChange={handleChangePaxs} value={booking.guests} min={1} max={6} />
              </Form.Item>
            </Form.Item>

          </div>

          <div>
            <Form.Item
              name='early_check'
              valuePropName='checked'
            >
              <Switch
                checkedChildren="Early Checkin" unCheckedChildren="Early Checkin"
                onChange={onCheckin}
                style={{ width: "120px" }}
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name='late_check'
              valuePropName='checked'
            >
              <Switch
                checkedChildren="Late Checkout" unCheckedChildren="Late Checkout"
                onChange={onCheckout}
                style={{ width: "120px" }}
              />
            </Form.Item>
          </div>
        </div>

        {/* CALENDAR - RANGE PICKER */}
        <div className='backgroundPage'>
          <div className='Calendar'>
            <RangePicker disabledDate={disabledDate} onCalendarChange={handleChangeDates} className='backgroundPageA' open={true} />
          </div>
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
                <Button onClick={() => dispatch(setBookData({guests: 0, range: [], nights: 0, category: [],original_price:0, fee: 0, room_id: 0,early_checkin:false,late_checkout:false}))} >Cancel</Button>
              </Link>

              <Button disabled={!(booking.range[0] && booking.range[1] && booking.guests)} onClick={handleClickRooms} type="primary">
                Next
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};