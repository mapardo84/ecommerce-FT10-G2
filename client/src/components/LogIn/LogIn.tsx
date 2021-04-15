import { Form, Button, Input } from "antd";
import { classicLogIn, googleLogIn, faceLogIn } from "../../helpers/logIn";
import "./LogIn.less";
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { supabase } from '../../SupaBase/conection'
import { useHistory } from "react-router-dom";

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
  await googleLogIn()
}

const logInFace = async () => {

  await faceLogIn()
}


export const getSession = async (session:any) => {
  



  
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', session.user?.email)

      
      if (session.user) {var name = (session.user.user_metadata.full_name).split(" ")}


    if (data?.length === 0) {
      console.log(data)
      console.log("USUARIO NUEVO REGISTRADO")
      await supabase.from("users").insert([
        {
          uuid: session.user?.id,
          email: session.user?.email,
          first_name: name[0],
          last_name: name[1]
        },
      ]);
    } else {
      console.log("USUARIO YA EXISTE")
    }
  
}

//MAIN COMPONENT_____________________
export const LogIn = () => {


  const history = useHistory();


  const onFinish = async (values: logIn) => {
    var a = await classicLogIn(values.email, values.password);
    a && history.push("/home");
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
      <div className="loginIconContainer">
        <GoogleOutlined style={{ fontSize: "40px" }} onClick={() => logInGoogle()}></GoogleOutlined>
        <FacebookOutlined style={{ fontSize: "40px" }} onClick={() => logInFace()}></FacebookOutlined>
      </div>
    </Form>
  );
};

export default LogIn;
