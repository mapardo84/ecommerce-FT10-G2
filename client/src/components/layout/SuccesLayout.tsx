import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import {FooterLayout} from '../footer/Footer'
import { FunctionComponent } from "react";
import { SuccessPayment } from "../MercadoPago/SuccessPayment";
import './SuccessLayout.less'


const { Content } = Layout;

export const SuccessLayout: FunctionComponent = () => {
  return (
    <>
      <Layout>
        <NavBar />
        <Content>
            <div className="success">
                <SuccessPayment />
            </div>
        </Content>
            <FooterLayout/>
      </Layout>
    </>
  );
};