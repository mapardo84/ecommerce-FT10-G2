import { Layout, BackTop } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import Accomodations from "../accomodations/Accomodations";
import "./AccomodationLayout.less"

const { Content } = Layout;

export const AccomodationLayout: FunctionComponent = () => {
  return (
    <>
      <Layout className="accomodationLayout">
        <NavBar />
        <Content>
          <Accomodations />
        </Content>
        <BackTop />
        <FooterLayout />
      </Layout>
    </>
  );
};