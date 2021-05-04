import { useParams } from "react-router-dom";
import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import { supabase } from "../../SupaBase/conection";
import ReCAPTCHA from "react-google-recaptcha";
import { errorMsgcaptcha } from "../../helpers/logIn"
import { Form, Input, Button, message, Divider } from "antd";
import { useHistory } from "react-router-dom";
import "./ResetPasswordLayout.less"
import password from './img/password.jpg'

const { Content } = Layout;


interface IPassword {
    password: any;
    repeatPsw: string;
}

export const ResetPasswordLayout = (): JSX.Element => {

    const history = useHistory();
    const { token }: any = useParams();


    let captchaData = {
        isVerified: false,
    }

    //captcha handler
    function onChange(value: any) {
        console.log("Captcha value:", value);
        if (value) {
            captchaData.isVerified = true
        } else {
            captchaData.isVerified = false
        }
    }


    const onFinish = async (value: IPassword) => {

        var pass = value.password

        if (captchaData.isVerified) {
            const { error, data } = await supabase.auth.api
                .updateUser(token, { password: pass })
            console.log(data)

            !error && message.success({
                content: "Password changed successfully",
            });

            history.push("/home")
        } else {
            errorMsgcaptcha()
        }
    }

    const cancelChange = () => {
        history.push("/home")
    }




    return (
        

            <div className="containerMap1"> 
                    
            
            <Layout className="resetLayout">
                <NavBar />
                <div className="">  
                    <img className="resetPasswordImg" src={password} alt="Img not found" />
                    <div className="passwordTittle">
                        RESET PASSWORD
                    </div>
                </div>
              
                    <div className="FormReset" >
                        <h1 className="resetTitle">Enter a new password</h1>
                        <Divider className="dividerRegister"></Divider>


                        <Form name="basic" initialValues={{ remember: true }} layout="vertical" onFinish={onFinish}>
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
                            <Button type="primary" className="sendPassword" htmlType="submit">SEND</Button>
                            <Button type="primary" className="sendPassword" onClick={cancelChange}>CANCEL</Button>

                        </Form>
                        <div className="captcha2">
                            <ReCAPTCHA
                                sitekey="6LcZXqsaAAAAAN4pWJ2LNrXd68tnxzwHvPclIjex"
                                onChange={onChange} />
                        </div>
                    </div>
               
                <FooterLayout />
            </Layout>
            </div>
        
    );
};

export default ResetPasswordLayout;
