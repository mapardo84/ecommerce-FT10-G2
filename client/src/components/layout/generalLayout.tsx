import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import {FooterLayout} from '../footer/Footer'
import { FunctionComponent } from "react";


const { Content } = Layout;

export const LayoutTemplate: FunctionComponent = () => {
  return (
    <>
      <Layout>
        <NavBar />
        <Content>
          {/* <Componente a renderizar> </Componente a renderizar> */}
        </Content>
        <FooterLayout/>
      </Layout>
    </>
  );
};