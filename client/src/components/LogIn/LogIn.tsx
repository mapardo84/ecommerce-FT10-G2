import { Form, Button, Input, Divider, Modal, message } from "antd";
import { classicLogIn, loginWith } from "../../helpers/logIn";
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { errorMsgcaptcha } from "../../helpers/logIn"
import { useState } from "react";
import { supabase } from "../../SupaBase/conection";
import { useDispatch } from "react-redux";
import { setModalState } from "../../actions/loginActions";
import "./LogIn.less";

interface log {
  email: string;
}
interface logIn {
  email: string;
  password: string;
}

//Login component
export const LogIn = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();

  let captchaData = {
    isVerified: false,
  }
  //captcha handler
  function onChange(value: any) {
    if (value) {
      captchaData.isVerified = true
    } else {
      captchaData.isVerified = false
    }
  }
  //login submithandler
  const onFinish = async (values: logIn) => {
    if (captchaData.isVerified) {
      var status = await classicLogIn(values.email, values.password);
      status && history.push("/home");
      status && dispatch(setModalState(1));
    } else {
      errorMsgcaptcha()
      dispatch(setModalState(0));
    }
  };

  //password reset handler
  const onFinishPassword = async (value: log) => {
    form.resetFields();
    supabase.auth.api.resetPasswordForEmail(value.email)
    message.success("Email sent");
    setvisible(false)
  };

  const [visible, setvisible] = useState(false)

  const handleCancel = () => {
    setvisible(!visible)
  }

  return (
    <>
      <Form
        className="containerLogin"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <h1 className="Login">Login</h1>
        <Divider className="dividerRegister"></Divider>
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
            allowClear={true}
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

        <Button className="buttonLogin1" type="primary" htmlType="submit">
          Log In
      </Button>
        <br />

        <div className="loginChangePass" onClick={handleCancel}>Forgot password?</div>

        <div className="captcha">
          <ReCAPTCHA
            sitekey="6LcZXqsaAAAAAN4pWJ2LNrXd68tnxzwHvPclIjex"
            onChange={onChange} />
        </div>

        <Divider style={{ fontSize: "13px" }}>Or login with</Divider>

        <div className="loginIconContainer">
          <GoogleOutlined style={{ fontSize: "40px", marginRight: "30x" }} onClick={() => loginWith("google")}></GoogleOutlined>
          <FacebookOutlined style={{ fontSize: "40px", marginLeft: "30px" }} onClick={() => loginWith("facebook")}></FacebookOutlined>
        </div>
      </Form>


      {/*Password reset modal */}
      <Modal visible={visible} width={450} onCancel={handleCancel} footer={null} destroyOnClose={true}>
        <Form className="container" name="basic" onFinish={onFinishPassword}>

          <h1 className="titleRgister">Password Reset</h1>
          <Divider className="dividerRegister"></Divider>

          <div className="resetText"> Please, enter the email address you used to register.
                    We will send you an email with a link to reset your password. </div>

          <Form.Item name="email" className="email" rules={[
            { required: true, message: "Please insert your e-mail!" },
            { type: "email", message: "The input is not valid e-mail!" },
          ]}>
            <Input
              // prefix={<UserOutlined style={{ color: "gray" }} />}
              size="large"
              placeholder="Email"
              allowClear={true}
            ></Input>
          </Form.Item>
          <Button htmlType="submit" type="primary">Send</Button>
          <Divider className="dividerRegister"></Divider>
          <p className="footerPasswordReset">If you still need help, contact HENRY HOTEL Support.</p>
        </Form>
      </Modal>

    </>


  );
};

export default LogIn;