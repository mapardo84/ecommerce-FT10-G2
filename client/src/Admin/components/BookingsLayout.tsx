import { Layout } from "antd";
import { MenuLeft } from "../MenuLeft";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterAdmin } from "../FooterAdmin";
import { Bookings } from "./Bookings/Bookings";

export const BookingsLayout = () => {

    const { Content } = Layout;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />

            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>

                    <Bookings/>
                    
                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}
