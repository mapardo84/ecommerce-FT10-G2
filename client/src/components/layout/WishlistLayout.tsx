import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import {FooterLayout} from '../footer/Footer'
import Wishlist from "../WishList/Wishlist";
import "./WishlistLayout.less"
import Chatbot from "../chatbot/Chatbot";

const { Content } = Layout;

export const WishlistLayout = () => {
  return (
    <>
      <Layout className="WishlistLayoutBg">
        <NavBar />
        <Content>
          <Wishlist />
        </Content>
        <FooterLayout/>
        <Chatbot />
      </Layout>
    </>
  );
};