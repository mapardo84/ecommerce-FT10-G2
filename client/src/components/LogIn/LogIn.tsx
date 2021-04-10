import React from 'react'
import { Form, Button, Input } from 'antd'
import { classicLogIn } from '../../helpers/logIn'

interface logIn{
    email:string
    password:string
}

export const LogIn = () => {
    
const onFinish=(values:logIn)=>{
    classicLogIn(values.email,values.password)
}

    return (
        <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}>
            <Form.Item
                name="email"
                label="Insert e-mail"
                rules={[{ required: true, message: "Please insert your e-mail!" }, { type: "email", message: "The input is not valid e-mail!" }]}
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: "Please insert password" },
                    {
                        validator: async (_, password) => {
                            if (!password || password.length < 6) {
                                return Promise.reject(new Error('At least 6 characters'));
                            }
                        },
                    },]}
            >
                <Input.Password></Input.Password>
            </Form.Item>
            <Button type="primary" htmlType="submit">Log In</Button>
        </Form>
    )
}
