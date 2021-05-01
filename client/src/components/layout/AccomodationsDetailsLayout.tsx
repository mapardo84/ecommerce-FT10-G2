import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import Details from "../categories/Details/Details";
import "./AccomodationDetails.less"


const { Content } = Layout;

export const AccomodationDetailsLayout: FunctionComponent = () => {
  return (
    <>
      <Layout className="accomodationDetailsbg">
        <NavBar />
        <Content>
         <Details />
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};