import { Layout } from "antd";
import { MenuLeft } from "../MenuLeft";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterAdmin } from "../FooterAdmin";
import { Types } from '../components/Types/Types'

export const TypesLayout = () => {


    const { Content } = Layout;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />

            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>

                    {/* aca va el componente */}
                    <Types />



                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}
