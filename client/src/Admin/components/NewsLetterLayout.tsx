import { Layout } from "antd";
import { MenuLeft } from "./../MenuLeft";
import { HeaderAdmin } from "./../HeaderAdmin";
import { FooterAdmin } from "./../FooterAdmin";
import { NewsLetter } from "./NewsLetter/NewsLetter";



export const NewsLetterLayout = () => {


    const { Content } = Layout;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />

            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>

                    {/* aca va el componente */}
                    <NewsLetter />



                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}
