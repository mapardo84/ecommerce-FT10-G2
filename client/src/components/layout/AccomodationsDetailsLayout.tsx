import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import Details from "../categories/Details/Details";


const { Content } = Layout;

export const AccomodationDetailsLayout: FunctionComponent = () => {
  return (
    <>
      <Layout style={{ overflowX: "hidden" }}>
        <NavBar />
        <Content>
         <Details />
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};