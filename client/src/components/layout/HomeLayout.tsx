import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { Home } from "../home/Home";

const { Content } = Layout;

export const HomeLayoutTemplate: FunctionComponent = () => {
  return (
    <>
      <Layout>
        <NavBar />
        <Content>
          <Home></Home>
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};
