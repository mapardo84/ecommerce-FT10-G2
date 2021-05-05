import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from "../footer/Footer";
import { FunctionComponent } from "react";
import { FormEvents } from "../Events/formEvents";
import imgEventsNavbar from './img/eventsBgForm.jpg'



const { Content } = Layout;

export const FormEventsLayout: FunctionComponent = () => {

  return (
    <>
      <Layout className="accomodationLayout">
        <NavBar />
        <img className="ImgEventsNavbar" src={imgEventsNavbar} alt="Img not found" />
        <div className="EventsFormNavbar1">
          APPOINTMENT
                    </div>
        <Content style={{ overflowX: "hidden" }}>
          <FormEvents />
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};
