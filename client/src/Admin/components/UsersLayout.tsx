import { Layout } from "antd";
import { MenuLeft } from "../MenuLeft";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterAdmin } from "../FooterAdmin";
import { Users } from "./Users/Users";

export const UsersLayout = () => {


    const { Content } = Layout;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />

            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>

                    {/* aca va el componente */}
                    <Users />



                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}
