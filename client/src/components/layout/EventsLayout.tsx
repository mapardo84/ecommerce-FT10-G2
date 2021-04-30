import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { Events } from "../Events/events";

const { Content } = Layout;

export const EventLayout: FunctionComponent = () => {

  return (
    <>
      <Layout>
        <NavBar />
        <Content style={{ overflowX: "hidden" }}>
          <Events />
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};
