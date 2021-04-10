import { Layout, Row, Col, Button } from "antd";
import "./footer.less";

const { Footer } = Layout;

export const FooterLayout = () => {
  return (
    <Layout className="layout">
      <Footer className="laclande" style={{ textAlign: "center" }}>
        <Row justify="center" align="bottom">
          <Col span={21}>
            <Row>
              <Button className="info" type="text">Contact us</Button>
            </Row>
            <Row>
              <Button className="info" type="text">Admin panel</Button>
            </Row>
            <Row>
              <Button className="info" type="text">About us</Button>
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Button className="info" type="text">adress</Button>
            </Row>
            <Row>
              <Button className="info" type="text">REDES LOGOS</Button>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};
