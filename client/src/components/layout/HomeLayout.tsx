import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import {FooterLayout} from '../Footer/Footer'
import { FunctionComponent } from "react";
import {Home} from '../Home/Home'


const { Content } = Layout;

export const HomeLayoutTemplate: FunctionComponent = () => {
  return (
    <>
      <Layout>
        <NavBar />
        <Content style={{fontSize:"500px"}}>
            <Home></Home>
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};
