import React, { useState } from 'react';
import { Modal, Button,Form,Input } from 'antd';
import { classicLogIn } from '../../helpers/logIn';

interface logIn{
    email:string
    password:string
}

export const Rodrigo = () => {
  const [visible, setVisible] = useState(false);

  const onFinish=(values:logIn)=>{
    classicLogIn(values.email,values.password)
}

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
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
      </Modal>
    </>
  );
};