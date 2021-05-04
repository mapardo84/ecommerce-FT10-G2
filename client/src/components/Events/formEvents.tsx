import React, { useEffect, useState } from 'react'
import "./events.less";
import { Form, Input, InputNumber, Button, DatePicker, Select } from 'antd';
import { addRequest, getAllRequests } from '../../Admin/actions/adminEventsActions';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

export interface IRequests {
    id:number;
    name:string;
    last_name:string;
    company:string;
    email:string;
    telephone:string;
    startDate:string;
    finishDate:string;
    eventName:string;
    requestSalon:number;
    requestCatering:string;
    additionalServices:string;
    comments:string;
    type:string;
};

  
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */


export const FormEvents = () => {
   

      

     
      
      const dispatch = useDispatch();

      const onFinish = (values: IRequests) => {
        dispatch(addRequest(values))
      };

    
    
    return (
        <div className="descriptionBackground1">
            <br></br> <br></br> 
            <h2 className="subtitle2">REQUEST A QUOTE FOR YOUR EVENT</h2>
            <p className="description">
Please complete the fields in the following form. It will be a pleasure for us to contact you within the next 24  hours to discuss our proposal. Our contact telephone number is +5411 4123.4567</p>

<Form {...layout}  name="nest-messages" className="formEvents1" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name='name'label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='last_name' label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='company' label="Company" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='telephone' label="Telephone" rules={[{ required: true }]}>
      <Input />
      </Form.Item>
      <Form.Item name='email' label="Email" rules={[{ type: 'email',required:true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='startDate' label="Start Date" rules={[{ required: true }]}>
      <DatePicker />

      </Form.Item>
      <Form.Item name= 'finishDate' label="Finish Date" rules={[{ required: true }]}>
      <DatePicker />

      </Form.Item>
      <Form.Item name='eventName' label="Name of the Event" rules={[{ required: false }]}>
        <Input /> 
        
      </Form.Item>
      <Form.Item name= 'requestSalon' label="Request Salon Capacity" rules={[{ type: 'number', min: 0, max: 200 }]}>
        <InputNumber />
      </Form.Item>
        <Form.Item name= 'requestCatering' label="Requests for Catering">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name='additionalServices' label="Additional Services">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name= 'comments' label="Comments">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name= 'type'label="Type of Events" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="greatroom">Social</Select.Option>
            <Select.Option value="studio1">Business</Select.Option>
          </Select>
        </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <div className='buttonSubmitEvents'>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        </div>
      </Form.Item>
    </Form>
         
        </div>
    )
}

 