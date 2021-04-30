import { Layout } from "antd";
import { MenuLeft } from "../MenuLeft";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterAdmin } from "../FooterAdmin";

export const HallsLayout = () => {
    const { Content } = Layout;
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />
            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>
                    <h1>Hola</h1>
                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}