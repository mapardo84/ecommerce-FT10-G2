import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { Home } from "../home/Home";
import Accomodations from "../accomodations/Accomodations";

const { Content } = Layout;

export const HomeLayout: FunctionComponent = () => {
  return (
    <>
      <Layout>
        <NavBar />
        <Content>
          <Accomodations />
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};
