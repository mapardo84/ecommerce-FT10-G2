import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import back from "./img/aboutUs.jpg"
import "./AboutUsLayout.less"
import AboutUs from "../AboutUs/AboutUs";

const { Content } = Layout;

export const AboutUsLayout: FunctionComponent = () => {
    return (
        <>
            <Layout className="AboutUsLayoutClass">
                <NavBar />
                <img className="imageAboutUsBg" src={back} alt="Img not found" />
                <Content>
                    <div className="aboutUsContent">
                        <AboutUs />
                    </div>
                </Content>
                <FooterLayout />
            </Layout>
        </>
    );
};