import { Form, Button, Input } from "antd";
import { classicLogIn, loginWith } from "../../helpers/logIn";
import "./LogIn.less";
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {errorMsgcaptcha} from "../../helpers/logIn"

interface logIn {
  email: string;
  password: string;
}

export const LogIn = () => {

  const history = useHistory();

  let captchaData = {
    isVerified: false,
  }

  
  function onChange(value: any) {
    console.log("Captcha value:", value);
    if (value) {
      captchaData.isVerified = true
      console.log(captchaData.isVerified)
    } else {
      captchaData.isVerified = false
      console.log(captchaData.isVerified)

    }
  }
  
  const onFinish = async (values: logIn) => {
    if(captchaData.isVerified){
      var a = await classicLogIn(values.email, values.password);
      a && history.push("/home");
      a && window.location.reload()
    }else{
      errorMsgcaptcha()
    }
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
      </Button><br/><br/>
<div className="captcha"><ReCAPTCHA
        sitekey="6LcZXqsaAAAAAN4pWJ2LNrXd68tnxzwHvPclIjex"
        onChange={onChange}
      /></div>
      

      <div className="loginCenter">Or login with</div>

      <div className="loginIconContainer">
        <GoogleOutlined style={{ fontSize: "40px",marginInline:"5x" }} onClick={() => loginWith("google")}></GoogleOutlined>
        <FacebookOutlined style={{ fontSize: "40px",marginInline:"5px" }} onClick={() => loginWith("facebook")}></FacebookOutlined>
      </div>
    </Form>
  );
};

export default LogIn;