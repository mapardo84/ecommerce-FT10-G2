import { DatePicker } from 'antd';
import './MyCalendar.less'
// import { useDispatch } from 'react-redux';



export function MyCalendar() {

  //   const dispatch = useDispatch

  //   const handleClick = (event:any) => {
  //    dispatch(event.target.id)
  // }

  const { RangePicker } = DatePicker

  return (

    <div className='backgroundPage'>
      <RangePicker className='backgroundPageA' open={true} />
    </div>

  )
}


