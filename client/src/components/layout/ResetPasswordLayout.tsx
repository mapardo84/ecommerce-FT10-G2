import { useParams } from "react-router-dom";
import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import { supabase } from "../../SupaBase/conection";
import ReCAPTCHA from "react-google-recaptcha";
import { errorMsgcaptcha } from "../../helpers/logIn"
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import "./ResetPasswordLayout.less"

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
<<<<<<< HEAD
=======
                console.log(data)
>>>>>>> origin/nico

            !error && message.success({
                content: "Password changed successfully",
            });

            history.push("/home")
        } else {
            errorMsgcaptcha()
        }
    }



    return (
        <>
            <Layout className="resetLayout">
                <NavBar />
                <Content>
                    <div className="FormReset" >
                        <h1 className="resetTitle">Password Reset</h1>

                        <Form name="basic" initialValues={{ remember: true }} layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                name="password"
                                label="Password"
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
                                <Input.Password></Input.Password>
                            </Form.Item>
                            <Form.Item
                                name="repeatPsw"
                                label="Repeat Password"
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
                                <Input.Password></Input.Password>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">SEND</Button>
                        </Form>
                            <div className="captcha2">
                                <ReCAPTCHA
                                    sitekey="6LcZXqsaAAAAAN4pWJ2LNrXd68tnxzwHvPclIjex"
                                    onChange={onChange} />
                            </div>

                    </div>
                </Content>
                <FooterLayout />
            </Layout>
        </>
    );
};

export default ResetPasswordLayout;
