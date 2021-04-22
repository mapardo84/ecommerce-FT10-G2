import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import MyBookings from "../myBookings/MyBookings";
import MyProfile from "../myProfile/MyProfile";
import "./MyBookingsLayout.less"

const { Content } = Layout;

export const MyProfileLayout = () => {
    return (
        <>
            <Layout className="myProfileLayout">
                <NavBar />
                <Content style={{display:"flex", justifyContent:"center"}}>
                    <div className="contentBooking">
                        <MyProfile />
                    </div>
                </Content>
                <FooterLayout />
            </Layout>
        </>
    );
};