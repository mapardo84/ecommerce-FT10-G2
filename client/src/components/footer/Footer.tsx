import { Layout, Menu, Row, Col, Button } from "antd";
import "./footer.less";

const { Footer } = Layout;

export const FooterLayout = () => {
  return (
    <Layout className="layout">
      <Footer className="laclande" style={{ textAlign: "center" }}>
        <Row justify="center" align="bottom">
          <Col span={21}>
            <Menu className="laclande" theme="dark" mode="vertical">
              
              <div style={{marginTop:"-40px"}}>
                <Button type="text" >Contact us</Button>
              </div>
              <div style={{marginTop:"-10px", marginBottom:"-5px"}}>
                <Button type="text">Admin panel</Button>
              </div>
              <div style={{marginTop:"-10px", marginBottom:"-5px"}}>
                <Button type="text" >About us</Button>
              </div>
              
            </Menu>
          </Col>
          <Col span={3}>
            <Menu className="laclande" theme="dark" mode="vertical">
              <div>
                <Button type="text">adress</Button>
              </div>
              <div>
                <Button type="text">REDES LOGOS</Button>
              </div>
            </Menu>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};
