import React from 'react'
import "./events.less";
import { Form, Input, InputNumber, Button, DatePicker, Select } from 'antd';


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
    const onFinish = (values: any) => {
        console.log(values);
      };
    
    return (
        <div className="descriptionBackground">
            <br></br> <br></br> 
            <h1 className="titleHotel">Quotes</h1>
            <h2 className="subtitle2">REQUEST A QUOTE FOR YOUR EVENT</h2>
            <p className="description">
Please complete the fields in the following form. It will be a pleasure for us to contact you within the next 24  hours to discuss our proposal. Our contact telephone number is +5411 4123.4567</p>

<Form {...layout} name="nest-messages" className="formEvents" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'last_name']} label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'company']} label="Company" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email',required:true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'telephone']} label="Telephone" rules={[{ required: true }]}>
      <Input />
      </Form.Item>
      <Form.Item name={['user', 'startDate']} label="Start Date" rules={[{ required: true }]}>
      <DatePicker />

      </Form.Item>
      <Form.Item name={['user', 'finishDate']} label="Finish Date" rules={[{ required: true }]}>
      <DatePicker />

      </Form.Item>
      <Form.Item name={['user', 'nameEvent']} label="Name of the Event" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'requestSalon']}label="Select" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="greatroom">Great Room</Select.Option>
            <Select.Option value="studio1">Studio 1</Select.Option>
            <Select.Option value="studio2">Studio 2</Select.Option>
            <Select.Option value="foyer3a">Foyer 3A</Select.Option>
            <Select.Option value="foyer3b">Foyer 3B</Select.Option>
            <Select.Option value="lounge">Lounge</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'requestCatering']} label="Requests for Catering">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'additionalServices']} label="Additional Services">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'comments']} label="Comments">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'type']}label="Type of Events" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="greatroom">Social</Select.Option>
            <Select.Option value="studio1">Business</Select.Option>
          </Select>
        </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
        </div>
    )
}

 