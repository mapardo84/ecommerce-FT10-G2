import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import { FunctionComponent } from "react";
import { SuccessPayment } from "../MercadoPago/SuccessPayment";
import './SuccessLayout.less'
import successImg from "./img/bookingSuccess.jpg";

const { Content } = Layout;

export const SuccessLayout: FunctionComponent = () => {
  return (
    <>
      <Layout className="succesLayoutBg" style={{ minHeight: "100vh" }}>
        <NavBar />
        <div>
          <img className="succesImgL" src={successImg} alt="Img not found" />
        </div>
        <Content >
          <div className="success">
            <SuccessPayment />
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};