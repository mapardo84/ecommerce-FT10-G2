import { Form, Input, Button, Divider } from "antd";
import { sendRegister } from "../../helpers/register";
import "./Register.less";

export interface IRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  DNI: string;
}

export const Register = (): JSX.Element => {
  const onFinish = (values: IRegister) => {
    sendRegister(values);
    console.log(values);
  };

  return (
    <div className="register_Container">
      <h1 className="titleRgister">Sign Up</h1>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
      <Divider orientation="center" className="dividerRegister">Personal information</Divider>

        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please, put your first name!" }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}

        >
          <Input placeholder="First Name"></Input>
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: "Please, insert your last name!" }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}>
          <Input placeholder="Last Name"></Input>
        </Form.Item>

        <Form.Item
          name="DNI"
          rules={[
            { required: true, message: "Please insert your identity code!" },
          ]}
        >
          <Input placeholder="D.N.I / identity code"></Input>
        </Form.Item>

        <Divider orientation="center" className="dividerRegister">Access information</Divider>


        <Form.Item
          name="email"
          // label="Email"
          rules={[
            { required: true, message: "Please insert your e-mail!" },
            { type: "email", message: "The input is not valid e-mail!" },
          ]}
        >
          <Input placeholder="Email"></Input>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please insert password" },
            {
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error("At least 6 characters"));
                }
              },
            },
          ]}
        >
          <Input.Password placeholder="Password"></Input.Password>
        </Form.Item>
        <Form.Item
          name="repeatPsw"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Repeat Password"></Input.Password>
        </Form.Item>
        <p className="footerRegister">By clicking Sign Up, you agree to our Terms and Data Policy</p>
        <Button className="buttonLogin1" style={{marginBottom:"7px"}} type="primary" htmlType="submit" >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
