import { Layout } from "antd";


import { MenuLeft } from "../MenuLeft";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterAdmin } from "../FooterAdmin";
import { Inicio } from "../components/Inicio";

export const Test = () => {


    const { Content } = Layout;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />

            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>

                    {/* aca va el componente */}
                    <Inicio />



                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}
