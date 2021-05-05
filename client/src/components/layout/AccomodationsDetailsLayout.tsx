import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import Details from "../categories/Details/Details";
import "./AccomodationDetails.less"
import Chatbot from "../chatbot/Chatbot";


const { Content } = Layout;

export const AccomodationDetailsLayout: FunctionComponent = () => {
  return (
    <Layout style={{ overflowX: "hidden" }} className="accomodationDetailsbg">
      <NavBar />
      <Content>
        <Details />
      </Content>
      <FooterLayout />
      <Chatbot />
    </Layout>
  );
};