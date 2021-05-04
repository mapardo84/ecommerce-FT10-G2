import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import MyBookings from "../myBookings/MyBookings";
import "./MyBookingsLayout.less"
import Chatbot from "../chatbot/Chatbot";

const { Content } = Layout;

export const MyBookingsLayout = () => {
    return (
        <>
            <Layout className="myBookingLayout">
                <NavBar />
                <Content>
                    <div className="contentBooking">
                        <MyBookings />
                    </div>
                </Content>
                <Chatbot />
                <FooterLayout />
            </Layout>
        </>
    );
};