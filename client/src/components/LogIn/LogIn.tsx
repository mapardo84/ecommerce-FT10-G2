import { Form, Button, Input } from "antd";
import { classicLogIn,googleLogIn,faceLogIn } from "../../helpers/logIn";
import "./LogIn.less";
import { UserOutlined, LockOutlined, GoogleOutlined,FacebookOutlined } from "@ant-design/icons";
import {supabase} from '../../SupaBase/conection'



interface logIn {
  email: string;
  password: string;
}

export interface IGoogleAndFaceRegister {
  id: string,
  email: string;
  user_metadata: any;
  full_name: string;
}

const logInGoogle = async () => {
   getSession()
  await googleLogIn()
}

const logInFace = async () => {
  getSession()
 await faceLogIn()
}


const getSession = async () => {

  const user: any = supabase.auth.user()


  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', user.email)

  console.log(data)
  console.log(error)

  if (data?.length == 0) {
    console.log("USUARIO NUEVO REGISTRADO")
    await supabase.from("users").insert([
      {
        uuid: user.id,
        email: user.email,
        first_name: user.user_metadata.full_name,
        last_name: user.user_metadata.full_name,
      },
    ]);
  }else{
    console.log("USUARIO YA EXISTE")
  }

}

export const LogIn = () => {
  const onFinish = (values: logIn) => {
    classicLogIn(values.email, values.password);

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
      {/* <GoogleLogin
    clientId="982352923244-qrc2mn9clmfdkmidai537evf8s97920c.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
  
  

      {/* <div className="icons">
        <GoogleOutlined style={{ marginTop: "-9.5%", fontSize: "40px" }} />
      ,
      </div> */}
      <GoogleOutlined  style={{fontSize: "40px" }} onClick={() => logInGoogle()}></GoogleOutlined>
  <FacebookOutlined style={{ fontSize: "40px" }}  onClick={() => logInFace()}></FacebookOutlined>
    </Form>
  );
};

export default LogIn;
