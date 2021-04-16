import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import { HomeSlides } from "../HomeSlides/HomeSlides";
import { supabase } from "../../SupaBase/conection";
import { getSession } from "../../helpers/logIn"
import { Row, Col, Button, Typography, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import "./ResetPasswordLayout.less"
import "./homeLayout.less";

const { Content } = Layout;

export const ResetPasswordLayout = (): JSX.Element => {

    const history = useHistory();
    const { token }: any = useParams();


    const changePassword = async () => {
        
        const { error, data } = await supabase.auth.api
            .updateUser(token, { password: "654321" })

        console.log(error)
        console.log(data)
        history.push("/home")
    }

    const onFinish = () => {

    }


    return (
        <>
            <Layout className="container">
                <NavBar />
                <Content style={{ minHeight: "100%" }}>
                    <div className="FormReset" >
                        <h1>Password Reset</h1>

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

                        </Form>


                        <p>{token}</p>
                        <Button onClick={changePassword}>CHANGE</Button>
                    </div>
                </Content>
                <FooterLayout />
            </Layout>
        </>
    );
};

export default ResetPasswordLayout;
