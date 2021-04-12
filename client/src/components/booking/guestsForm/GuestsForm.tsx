import React from 'react';
import 'antd/dist/antd.css';
import '../guestsForm/GuestsForm.less'
import {
  Form,
  InputNumber,
  Button
} from 'antd';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


export const GuestsForm = () => {
  const onFinish = (values: string) => {
    console.log('Received values of form: ', values);
  };

  return (
      <div className = 'conteiner'>

      <h1 className= 'adultsandchildren'> Guests </h1>
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'input-number-adults': 1,
        'input-number-children': 0,
      }}
    >
        <div className = 'inputs'>

      <Form.Item className='input'>
        <Form.Item label="Adults" name="input-number-adults"  >
          <InputNumber min={1} max={6} />
        </Form.Item>
      </Form.Item>

      <Form.Item className='input' >
        <Form.Item label="Children" name="input-number-children" >
          <InputNumber min={0} max={6} />
        </Form.Item>
      </Form.Item>
        </div>

        <div className='btn'>
      <Form.Item
        wrapperCol={{
            span: 12,
            offset: 6,
        }}
        >

        <Button style={{marginLeft:'30px'}} type="primary" htmlType="submit">
          UPGRADE GUESTS
        </Button>
      </Form.Item>
          </div>
    </Form>
    </div>
  );
};