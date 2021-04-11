import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Cascader, Select, DatePicker, Checkbox, Button, Switch } from 'antd';
const { Option } = Select;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
  {
    value: 'argentina',
    label: 'Argentina',
  },
  {
    value: 'unitedStates',
    label: 'United States',
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
  }
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export function RegistrationForm () {
const [form] = Form.useForm();

const [input, setInput] = useState({
    name: '',
    lastName: '',
    birthDate: '',  //requisito +18 y caracteres
    dni: '',  // requisito caracteres
    phone: '',   //que cumpla requisitos de caracteres etc
    email: '', 
    country: '',  //que solo pueda ingresar paises existentes con select
    titular: true,
    })

const onFinish = (values) => {
    console.log('Received values of form: ', values);
    
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
    <Select
        style={{
        width: 70,
        }}
    >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="54">+54</Option>
        <Option value="1">+1</Option>
    </Select>
    </Form.Item>
);

return (
    <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
            residence: ['United States'],
            prefix: '1'
        }}
        scrollToFirstError
    >

    <Form.Item
        name="name"
        label="Name"
        rules={[
        {
            required: true,
            message: 'Please input your name!',
            whitespace: true,
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        name="lastname"
        label="Last Name"
        rules={[
        {
            required: true,
            message: 'Please input your last name!',
            whitespace: true,
        },
        ]}
    >
        <Input />
    </Form.Item>
    
    <Form.Item 
        name= "birthDate"
        label="Birth Date"
        rules={[
        {
            type: 'string',
            required: true,
            message: 'Please select your birth date!',
        },
        ]}
    >
        <DatePicker />
        </Form.Item>

        <Form.Item
        name="dni"
        label="DNI"
        rules={[
        {
            required: true,
            message: 'Please input your identification!',
            whitespace: true,
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        name="country"
        label="Country"
        rules={[
        {
            type: 'array',
            required: true,
            message: 'Please select your country!',
        },
        ]}
    >
        <Cascader options={residences} />
    </Form.Item>

    <Form.Item
        name="address"
        label="Address"
        rules={[
        {
            required: true,
            message: 'Please input your address!',
            whitespace: true,
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
        {
            required: true,
            message: 'Please input your phone number!',
        },
        ]}
    >
        <Input
        addonBefore={prefixSelector}
        style={{
            width: '100%',
        }}
        />
    </Form.Item>


    <Form.Item 
        name= 'titular'
        label= 'Titular'
    >
        <Switch
        defaultChecked = {true}
        checked = {true}
        />
    </Form.Item>

    <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
        {
            validator: (_, value) =>
            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
        },
        ]}
        {...tailFormItemLayout}
    >
        <Checkbox>
        I have read the <a href="https://memegenerator.net/img/instances/64451727/i-believe-we-have-an-agreement.jpg">agreement</a>  {/* hacer modal con foto*/}
        </Checkbox>
    </Form.Item>

    <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
        Confirm
        </Button>
    </Form.Item>

    </Form>
);
};