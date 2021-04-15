import { Form, Button, Input } from "antd";
import { classicLogIn, loginWith } from "../../helpers/logIn";
import "./LogIn.less";
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

interface logIn {
  email: string;
  password: string;
}

export const LogIn = () => {

  const history = useHistory();

  const onFinish = async (values: logIn) => {
    var a = await classicLogIn(values.email, values.password);
    a && history.push("/home");
    a && window.location.reload()
  };


  return (
    <Form
      className="container"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1 className="Login">LOGIN</h1>
      <Form.Item
        name="email"
        className="email"
        rules={[
          { required: true, message: "Please insert your e-mail!" },
          { type: "email", message: "The input is not valid e-mail!" },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "gray" }} />}
          size="large"
          placeholder="Email"
        ></Input>
      </Form.Item>
      <Form.Item
        className="password"
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
        <Input.Password
          prefix={<LockOutlined style={{ color: "gray" }} />}
          size="large"
          placeholder="Password"
        ></Input.Password>
      </Form.Item>
      <Button className="button" type="primary" htmlType="submit">
        Log In
      </Button>

      <div className="loginCenter">Or login with</div>
  
      <div className="loginIconContainer">
        <GoogleOutlined style={{ fontSize: "40px" }} onClick={() => loginWith("google")}></GoogleOutlined>
        <FacebookOutlined style={{ fontSize: "40px" }} onClick={() => loginWith("facebook")}></FacebookOutlined>
      </div>
    </Form>
  );
};

export default LogIn;
