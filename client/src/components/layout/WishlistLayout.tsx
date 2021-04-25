import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import {FooterLayout} from '../footer/Footer'
import Wishlist from "../WishList/Wishlist";


const { Content } = Layout;

export const WishlistLayout = () => {
  return (
    <>
      <Layout>
        <NavBar />
        <Content>
          <Wishlist />
        </Content>
        <FooterLayout/>
      </Layout>
    </>
  );
};