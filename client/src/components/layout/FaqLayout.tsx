import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent, useEffect } from "react";
import { Faq } from "../Faq/Faq";

const { Content } = Layout;

export const FaqLayout: FunctionComponent = () => {

  return (
    <>
      <Layout>
        <NavBar />
        <Content style={{ minHeight: "100%" }}>
          <Faq />
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};
