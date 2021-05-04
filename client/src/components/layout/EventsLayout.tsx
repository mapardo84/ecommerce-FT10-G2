import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { Event } from "../Events/events";
import Chatbot from "../chatbot/Chatbot";

const { Content } = Layout;

export const EventLayout: FunctionComponent = () => {

  return (
    <>
      <Layout style={{ overflowX: "hidden" }}>
        <NavBar />
        <Content >
          <Event/>
        </Content>
        <Chatbot />
        <FooterLayout />
      </Layout>
    </>
  );
};
