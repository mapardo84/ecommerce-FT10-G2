import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { FormEvents } from "../Events/formEvents";

const { Content } = Layout;

export const FormEventsLayout: FunctionComponent = () => {

  return (
    <>
      <Layout>
        <NavBar />
        <Content style={{ overflowX: "hidden" }}>
          <FormEvents/>
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};
