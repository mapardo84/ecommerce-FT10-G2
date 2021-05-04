import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import MyBookings from "../myBookings/MyBookings";
import MyProfile from "../myProfile/MyProfile";
import "./MyProfileLayout.less"
import back from "./img/prof1.jpg"
import Chatbot from "../chatbot/Chatbot";

const { Content } = Layout;

export const MyProfileLayout = () => {
    return (
        <>
            <Layout className="profileLayout">
                <NavBar />
                <Content className="contentMyProfile">
                    <img className="imageProfileBg" src={back} alt="Img not found" />
                    <div className="profilebgTitle">MY PROFILE</div>
                    <MyProfile />
                </Content>
                <Chatbot />
                <FooterLayout />
            </Layout>
        </>
    );
};