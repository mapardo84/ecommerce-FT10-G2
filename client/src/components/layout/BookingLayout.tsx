import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { StepsBooking } from "../booking/StepsBooking";
import '../layout/BookingLayout.less'
import Chatbot from "../chatbot/Chatbot";


const { Content } = Layout;

export const BookingLayout: FunctionComponent = () => {
  return (
    <>
      <Layout className="bookingStepBg" style={{ overflowX: "hidden" }}>
        <NavBar />
        <Content className='sticky'>
          <div className="stepsBackground"></div>
          <StepsBooking />
        </Content>
        <Chatbot />
        <FooterLayout />
      </Layout>
    </>
  );
};