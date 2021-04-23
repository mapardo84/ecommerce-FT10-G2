import React from 'react';
//import 'antd/dist/antd.css';
import { Form, Input, Cascader, Select, DatePicker, Checkbox, Button, Switch } from 'antd';
import { sendPax } from '../../../actions/Booking/PaxFormActions';
import '../paxForm/PaxForm.less'
import { PaymentBooking } from '../paymentBooking/PaymentBooking';
import { stepChange } from '../../../actions/Booking/bookingAction';
import { useDispatch } from 'react-redux';
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

export interface PaxValues {
    first_name: string,
    last_name: string,
    uuid: string,
    birth_date: string,
    address: string,
    phone: string,
    country: String[],
    titular: boolean

}

export function PaxForm() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleClickBack = (e: any) => {
        e.preventDefault();
        dispatch(stepChange(1));
    }
    const onFinish = (values: PaxValues) => {
        console.log('Received values of form: ', values);
        sendPax(values)
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
        <div className='paxForm_container'>
            <Button onClick={handleClickBack}>Go back</Button>
            <div className='form'>
                <div className='paxForm_TitleGuest'>
                    <h3>Guest Information</h3>
                </div>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        country: ['United States'],
                        prefix: '1',
                        remember: true
                    }}
                    scrollToFirstError
                    className='form'
                >


                    <Form.Item
                        name="first_name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="birth_date"
                        label="Birth Date"
                        rules={[
                            {
                                // type: 'string',
                                required: true,
                                message: 'Please select your birth date!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="uuid"
                        label="DNI"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your identification!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input className='paxForm_input' />
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
                        <Cascader options={residences} className='paxForm_input' />
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
                        <Input className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                type: "string",
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
                            className='paxForm_input'
                        />
                    </Form.Item>


                    <Form.Item
                        name='titular'
                        label='Titular'
                    >
                        <Switch
                            defaultChecked={true}
                            checked={true}
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
                            CONFIRM BOOKING
                </Button>
                    </Form.Item>

                </Form>
            </div>

            <div>
                <PaymentBooking />
            </div>
        </div>
    );
};