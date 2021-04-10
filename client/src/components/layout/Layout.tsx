import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";

const { Header, Footer, Content } = Layout;

export const LayoutTemplate: FunctionComponent = ({ children }) => {
  return (
    <>
      <Layout>
        <NavBar /> {/*NavBar*/}
        {children} {/*Home, Accomodations, Detail, Booking*/}
        <FooterLayout />
      </Layout>
    </>
  );
};



