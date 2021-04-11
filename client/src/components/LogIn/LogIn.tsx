import React from 'react'
import { Form, Button, Input } from 'antd'
import { classicLogIn } from '../../helpers/logIn'
import "./LogIn.less"
import { UserOutlined,LockOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

interface logIn{
    email:string
    password:string
}

export const LogIn = () => {
    
const onFinish=(values:logIn)=>{
    classicLogIn(values.email,values.password)
}

    return (
        <Form className="container"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}>
            <h1 className="Login">LOGIN</h1>
            <Form.Item
                name="email"
                className="email"
                rules={[{ required: true, message: "Please insert your e-mail!" }, { type: "email", message: "The input is not valid e-mail!" }]}
            >
                <Input prefix={<UserOutlined style={{color:'gray'}} />} size="large" placeholder="Email"></Input>
            </Form.Item>
            <Form.Item
                className="password"
                name="password"
               
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
                <Input.Password prefix={<LockOutlined style={{color:'gray'}}/>} size="large" placeholder="Password"></Input.Password>
            </Form.Item>
            <Button className="button" type="primary" htmlType="submit">Log In</Button>

            <p style={{marginTop:"25px"}}>Or login with</p>
            <div className="icons">
                 <FacebookOutlined  style={{ fontSize: '40px' }}/>

           <GoogleOutlined style={{ fontSize: '40px' }}/>
            </div>
          
        </Form>
    )
}

export default LogIn;
