import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { Faq } from "../Faq/Faq";
import Chatbot from "../chatbot/Chatbot";
import faqImage from "./img/faqimg.jpg";
import "./FaqLayout.less"

const { Content } = Layout;

export const FaqLayout: FunctionComponent = () => {

  return (
    <>
      <Layout className="faqWall">
        <NavBar />
        <div>
          <img className="succesImgL" src={faqImage} alt="Img not found" />
        </div>
        <Content style={{ minHeight: "100%" }}>
          <Faq />
        </Content>
        <Chatbot />
        <FooterLayout />
      </Layout>
    </>
  );
};
