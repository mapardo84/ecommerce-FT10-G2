import React from 'react';
import { Form, Input, Button } from 'antd';
import { sendRegister } from '../../helpers/register'
import './Register.less'

export interface Register {
    email: string
    firstName: string
    lastName: string
    password: string
    DNI: string
}

export const Register = () => {

    const onFinish = (values: Register) => {
        sendRegister(values)
        console.log(values)
    };

    return (
        <div className="register_Container">
            <div className="register_Title">Register</div>
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please, put your first name!" }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please, insert your last name!" }]} >
                <Input></Input>
            </Form.Item>
            <Form.Item
                name="DNI"
                label="D.N.I / identity code"
                rules={[{ required: true, message: "Please insert your identity code!" }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please insert your e-mail!" }, { type: "email", message: "The input is not valid e-mail!" }]}
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: "Please insert password" },
                    {validator: async (_, password) => {
                        if (!password || password.length < 6) {
                            return Promise.reject(new Error('At least 6 characters'));
                        }
                    },
                },]}
            >
                <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
                name="repeatPsw"
                label="Repeat Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password></Input.Password>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="register_Btn">Register</Button>

        </Form>
        </div>


    )
}