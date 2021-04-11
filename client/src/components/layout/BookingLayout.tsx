import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { StepsBooking } from "../booking/StepsBooking";


const { Content } = Layout;

export const BookingLayout: FunctionComponent = () => {
  return (
    <>
      <Layout>
        <NavBar />
        <Content>
          <StepsBooking></StepsBooking>
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};