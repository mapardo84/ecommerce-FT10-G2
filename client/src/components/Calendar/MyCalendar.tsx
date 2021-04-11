import 'antd/dist/antd.css';
import { Space, DatePicker } from 'antd';
import 'antd/dist/antd.less'
import './MyCalendar.less'
import { Button } from 'antd';
// import { useDispatch } from 'react-redux';



export function MyCalendar() {

//   const dispatch = useDispatch

//   const handleClick = (event:any) => {
//    dispatch(event.target.id)
// }

  const { RangePicker } = DatePicker
  
  return (
      <div>
        <p>Lorem ipsum, 
          dolor sit amet consectetur adipisicing elit. 
          Quod a laboriosam possimus iste! Exercitationem, 
          sapiente officia distinctio libero iure nesciunt placeat, 
          perferendis voluptatibus quaerat beatae voluptates assumenda, 
          explicabo laborum corporis?</p>

    <div className='backgroundPage'>
        <Space direction="vertical" size={12}>
          <div className='Calendar'>
          <RangePicker className='backgroundPage' open={true} />
          </div>
        </Space>
         <div className='fuckBtn'>
        <Button  className='buttonBabe' type="primary">Next</Button>
        </div>
    </div>
    </div>

  )
}


